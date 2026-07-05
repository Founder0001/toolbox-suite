import { Search, Sparkles, Command, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { searchTools } from '@/data/categories';

interface HeroProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  resultCount: number;
  onToolSelect?: (toolId: string) => void;
}

export function Hero({ searchValue, onSearchChange, resultCount, onToolSelect }: HeroProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchResults = searchValue.length >= 2 ? searchTools(searchValue).slice(0, 12) : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      {/* Mesh gradient background */}
      <div className="mesh-gradient absolute inset-0" aria-hidden="true" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(128,128,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border/60 text-xs font-medium text-muted-foreground mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            100% Client-Side &middot; Free Forever &middot; No Signup
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 animate-slide-up">
            <span className="text-gradient-brand">
              100+ Professional Tools
            </span>
            <br />
            <span className="text-foreground">
              for Everything
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            PDF suite, medical calculators, unit converters, image utilities,
            <span className="text-foreground font-medium"> AI prompt studio</span>, and more.
          </p>

          {/* Search with Dropdown */}
          <div ref={dropdownRef} className="relative max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowDropdown(e.target.value.length >= 2);
              }}
              onFocus={() => searchValue.length >= 2 && setShowDropdown(true)}
              placeholder="Search any tool, alias, or keyword..."
              className="premium-input w-full pl-10 pr-20 py-3.5 text-base"
              aria-label="Search tools"
              role="searchbox"
            />
            {/* Keyboard shortcut hint */}
            {!searchValue && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary/60 px-1.5 py-0.5 rounded border border-border/30">
                <Command className="w-2.5 h-2.5" />K
              </div>
            )}
            {/* Clear button */}
            {searchValue && (
              <button
                onClick={() => { onSearchChange(''); setShowDropdown(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Search Dropdown Results */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/60 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="py-2">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">
                    Individual Tools
                  </div>
                  {searchResults.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        if (onToolSelect) onToolSelect(tool.id);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2.5 hover:bg-secondary/60 transition-colors flex items-start gap-3"
                    >
                      <div className="mt-0.5 w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Search className="w-3 h-3 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{tool.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{tool.description}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">{tool.category}</span>
                          {tool.aliases && tool.aliases.slice(0, 2).map(a => (
                            <span key={a} className="text-[9px] text-muted-foreground/50">{a}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showDropdown && searchValue.length >= 2 && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/60 rounded-xl shadow-xl z-50 p-4 text-center">
                <p className="text-sm text-muted-foreground">No tools found for &quot;{searchValue}&quot;</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Try a different keyword or alias</p>
              </div>
            )}

            {/* Category result count */}
            {searchValue && (
              <div className="mt-2 text-xs text-muted-foreground text-center">
                {resultCount} categor{resultCount === 1 ? 'y' : 'ies'} match
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
}
