import { useState } from 'react';
import { Share2, Copy, Check, Twitter, Facebook, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';

export function ShareSection() {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://toolbox-suite.app';
  const shareText = 'Check out ToolBox Suite — 100+ free online tools for PDF, images, students, developers, and more! No signup, 100% private, works in your browser.';
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = [
    { name: 'Twitter/X', icon: Twitter, url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, color: 'hover:bg-sky-500/20 hover:text-sky-400' },
    { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: 'hover:bg-blue-500/20 hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, color: 'hover:bg-blue-600/20 hover:text-blue-500' },
    { name: 'WhatsApp', icon: MessageCircle, url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`, color: 'hover:bg-emerald-500/20 hover:text-emerald-400' },
    { name: 'Telegram', icon: Send, url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, color: 'hover:bg-cyan-500/20 hover:text-cyan-400' },
    { name: 'Email', icon: Mail, url: `mailto:?subject=Check%20out%20ToolBox%20Suite&body=${encodedText}%20${encodedUrl}`, color: 'hover:bg-amber-500/20 hover:text-amber-400' },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'ToolBox Suite', text: shareText, url: shareUrl });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch { /* user cancelled */ }
    } else {
      handleCopy();
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-card rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Share2 className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="text-gradient">Share with Friends & Family</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            Found these tools useful? Share ToolBox Suite with your friends, family, and colleagues.
            It's 100% free, private, and works right in the browser — no signup needed!
          </p>

          {/* Social Share Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {shareLinks.map(link => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${link.name}`}
                  className={`w-11 h-11 rounded-xl bg-secondary/40 border border-border/40 flex items-center justify-center text-muted-foreground transition-all duration-200 hover:scale-110 ${link.color}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Copy Link & Native Share */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleCopy}
              className="btn-secondary-premium text-xs flex items-center gap-2 min-w-[160px] justify-center"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Link Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleNativeShare}
              className="btn-premium text-xs flex items-center gap-2 min-w-[160px] justify-center"
            >
              <Share2 className="w-4 h-4" />
              {shared ? 'Shared!' : 'Share Now'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
