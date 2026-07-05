import { useRef, useCallback } from 'react';
import { categories, type Category } from '@/data/categories';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  filter: string;
  onSelect: (category: Category) => void;
}

export function CategoryGrid({ filter, onSelect }: CategoryGridProps) {
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const filtered = categories.filter((cat) => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return (
      cat.name.toLowerCase().includes(f) ||
      cat.description.toLowerCase().includes(f) ||
      cat.shortName.toLowerCase().includes(f)
    );
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">
        <span className="text-gradient">Explore Tool Categories</span>
      </h2>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No tools match your search.</p>
          <p className="text-sm mt-1">Try a different keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="category-card-premium text-left group"
                onClick={() => onSelect(cat)}
                onMouseMove={(e) => handleMouseMove(e, i)}
                aria-label={`Open ${cat.shortName}`}
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {cat.shortName}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Explore Tools</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </main>
  );
}
