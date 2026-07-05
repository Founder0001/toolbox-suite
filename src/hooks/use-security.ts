import { useEffect, useRef, useState, useCallback } from 'react';

interface SecurityState {
  isDevtoolsOpen: boolean;
  rateLimited: boolean;
}

interface RateLimiter {
  (action: string, maxCalls: number, windowMs: number): boolean;
}

function detectDevtools(): boolean {
  const threshold = 160;
  const widthDiff = window.outerWidth - window.innerWidth;
  const heightDiff = window.outerHeight - window.innerHeight;
  return widthDiff > threshold || heightDiff > threshold;
}

function createRateLimiter(): RateLimiter {
  const calls = new Map<string, number[]>();
  return (action: string, maxCalls: number, windowMs: number): boolean => {
    const now = Date.now();
    const key = action;
    const timestamps = calls.get(key) || [];
    const valid = timestamps.filter(t => now - t < windowMs);
    if (valid.length >= maxCalls) {
      calls.set(key, valid);
      return false;
    }
    valid.push(now);
    calls.set(key, valid);
    return true;
  };
}

function generateFingerprint(): string {
  const components = [
    navigator.userAgent,
    navigator.language,
    navigator.languages?.join(',') || '',
    navigator.platform,
    navigator.hardwareConcurrency,
    navigator.maxTouchPoints,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    (navigator as any).deviceMemory || '',
  ];
  const str = components.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export function useSecurity() {
  const [state, setState] = useState<SecurityState>({
    isDevtoolsOpen: false,
    rateLimited: false,
  });
  const rateLimiterRef = useRef<RateLimiter>(createRateLimiter());
  const fingerprintRef = useRef<string>('');

  useEffect(() => {
    fingerprintRef.current = generateFingerprint();

    // Devtools detection (throttled, non-blocking)
    let lastCheck = 0;
    const checkDevtools = () => {
      const now = Date.now();
      if (now - lastCheck < 2000) return;
      lastCheck = now;
      const open = detectDevtools();
      setState(prev => prev.isDevtoolsOpen !== open ? { ...prev, isDevtoolsOpen: open } : prev);
    };
    const interval = setInterval(checkDevtools, 3000);

    // Disable right-click context menu (anti-scraping)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable common shortcuts (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'f12') { e.preventDefault(); return false; }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
        e.preventDefault(); return false;
      }
      if ((e.ctrlKey || e.metaKey) && key === 'u') { e.preventDefault(); return false; }
      if ((e.ctrlKey || e.metaKey) && key === 's') { e.preventDefault(); return false; }
    };

    // Disable drag (anti-image-scraping)
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      clearInterval(interval);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  const checkRate = useCallback((action: string, maxCalls: number, windowMs: number): boolean => {
    const allowed = rateLimiterRef.current(action, maxCalls, windowMs);
    if (!allowed) {
      setState(prev => ({ ...prev, rateLimited: true }));
      setTimeout(() => setState(prev => ({ ...prev, rateLimited: false })), windowMs);
    }
    return allowed;
  }, []);

  const getFingerprint = useCallback(() => fingerprintRef.current, []);

  return { ...state, checkRate, getFingerprint };
}

export { generateFingerprint };
