import { ArrowLeft, Wrench, Sun, Moon, FileText } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onBack?: () => void;
  showBack?: boolean;
  badge?: string;
  onArticles?: () => void;
}

export function Navbar({ onBack, showBack, badge, onArticles }: NavbarProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') setTheme('light');
    else if (resolvedTheme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const themeIcon = resolvedTheme === 'dark'
    ? <Sun className="w-4 h-4" />
    : <Moon className="w-4 h-4" />;

  return (
    <nav className="glass-navbar sticky top-0 z-50 w-full" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onBack}
            type="button"
            className="flex items-center gap-3 group"
            aria-label="Go to dashboard"
          >
            <div className="relative w-9 h-9 rounded-lg overflow-hidden ring-1 ring-border/50 group-hover:ring-primary/40 transition-all">
              <img
                src="/images/logo.webp"
                alt="ToolBox Suite logo"
                className="w-full h-full object-cover"
                loading="eager"
                width={36}
                height={36}
                fetchPriority="high"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-foreground">
                ToolBox
              </span>
              {badge && (
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-secondary text-muted-foreground border border-border/50">
                  {badge}
                </span>
              )}
            </div>
          </button>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                type="button"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
                title={`${resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode`}
              >
                {themeIcon}
              </button>
            )}

            {showBack && (
              <button
                onClick={onBack}
                className="btn-secondary-premium text-sm ml-2"
                aria-label="Back to dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            {!showBack && (
              <>
                {onArticles && (
                  <button
                    onClick={onArticles}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
                    aria-label="Browse articles and guides"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Articles</span>
                  </button>
                )}
                <div className="hidden sm:flex items-center gap-2 text-muted-foreground ml-2">
                  <Wrench className="w-4 h-4" />
                  <span className="text-xs font-medium">100+ Professional Tools</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
