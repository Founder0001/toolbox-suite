import { Shield, Mail, FileText, HelpCircle, Cookie } from 'lucide-react';
import { memo, useCallback } from 'react';

interface FooterProps {
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookie') => void;
}

export const Footer = memo(function Footer({ onNavigate }: FooterProps) {
  const links = [
    { id: 'about' as const, label: 'About Us', icon: HelpCircle },
    { id: 'contact' as const, label: 'Contact Us', icon: Mail },
    { id: 'privacy' as const, label: 'Privacy Policy', icon: Shield },
    { id: 'cookie' as const, label: 'Cookie Policy', icon: Cookie },
    { id: 'terms' as const, label: 'Terms', icon: FileText },
  ];

  const handleNavigate = useCallback((page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookie') => {
    onNavigate(page);
  }, [onNavigate]);

  return (
    <footer className="border-t border-border/40 bg-surface-1/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-border/50">
              <img
                src="/images/logo.png"
                alt=""
                className="w-full h-full object-cover opacity-80"
                width={32}
                height={32}
                loading="lazy"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ToolBox. All rights reserved.
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground/60">
            ToolBox Suite operates 100% client-side. No data leaves your browser. Free forever.
          </p>
        </div>
      </div>
    </footer>
  );
});
