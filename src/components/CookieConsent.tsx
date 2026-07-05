import { useState, useEffect, useCallback, memo } from 'react';
import { Cookie, X, Check, Settings } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
}

const STORAGE_KEY = 'toolbox-cookie-consent';

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  functional: false,
};

function loadPreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null && 'necessary' in parsed) {
      return { ...defaultPreferences, ...parsed, necessary: true };
    }
    return null;
  } catch {
    return null;
  }
}

function savePreferences(prefs: CookiePreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // localStorage may be unavailable (private mode); fail silently
  }
}

interface CookieConsentProps {
  onNavigate: (page: 'privacy' | 'cookie') => void;
}

export const CookieConsent = memo(function CookieConsent({ onNavigate }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const stored = loadPreferences();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const all: CookiePreferences = { necessary: true, analytics: true, functional: true };
    savePreferences(all);
    setPrefs(all);
    setVisible(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    const minimal: CookiePreferences = { necessary: true, analytics: false, functional: false };
    savePreferences(minimal);
    setPrefs(minimal);
    setVisible(false);
  }, []);

  const handleSaveCustom = useCallback(() => {
    const toSave: CookiePreferences = { ...prefs, necessary: true };
    savePreferences(toSave);
    setPrefs(toSave);
    setVisible(false);
    setShowCustomize(false);
  }, [prefs]);

  const toggleCustomize = useCallback(() => setShowCustomize(v => !v), []);
  const closeCustomize = useCallback(() => setShowCustomize(false), []);

  const setFunctional = useCallback((v: boolean) => {
    setPrefs(p => ({ ...p, functional: v }));
  }, []);
  const setAnalytics = useCallback((v: boolean) => {
    setPrefs(p => ({ ...p, analytics: v }));
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-2xl">
          {!showCustomize ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">We value your privacy</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                    Necessary cookies are required for the site to function. You can choose which optional cookies to enable.
                    Read our{' '}
                    <button onClick={() => onNavigate('privacy')} className="text-primary hover:underline font-medium">Privacy Policy</button>
                    {' '}and{' '}
                    <button onClick={() => onNavigate('cookie')} className="text-primary hover:underline font-medium">Cookie Policy</button>.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <button onClick={handleRejectAll} className="btn-secondary-premium text-xs whitespace-nowrap">
                  Reject
                </button>
                <button onClick={toggleCustomize} className="btn-secondary-premium text-xs whitespace-nowrap">
                  <Settings className="w-3.5 h-3.5" />
                  Customize
                </button>
                <button onClick={handleAcceptAll} className="btn-premium text-xs whitespace-nowrap">
                  <Check className="w-3.5 h-3.5" />
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Customize Cookie Preferences</h3>
                <button
                  onClick={closeCustomize}
                  className="w-8 h-8 rounded-lg hover:bg-secondary/60 flex items-center justify-center text-muted-foreground"
                  aria-label="Close customization"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 mb-4">
                <CookieToggle
                  label="Necessary Cookies"
                  description="Required for the website to function. Cannot be disabled."
                  checked={true}
                  disabled={true}
                />
                <CookieToggle
                  label="Functional Cookies"
                  description="Enable enhanced functionality like theme preference and tool settings."
                  checked={prefs.functional}
                  onChange={setFunctional}
                />
                <CookieToggle
                  label="Analytics Cookies"
                  description="Help us understand how visitors interact with the site so we can improve it."
                  checked={prefs.analytics}
                  onChange={setAnalytics}
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <button onClick={handleRejectAll} className="btn-secondary-premium text-xs">Reject All</button>
                <button onClick={handleSaveCustom} className="btn-premium text-xs">
                  <Check className="w-3.5 h-3.5" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

function CookieToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const handleToggle = useCallback(() => {
    if (!disabled && onChange) onChange(!checked);
  }, [disabled, onChange, checked]);

  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-secondary/30 border border-border/40 rounded-lg">
      <div className="flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
          checked ? 'bg-primary' : 'bg-muted-foreground/30'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
        aria-label={`Toggle ${label}`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
