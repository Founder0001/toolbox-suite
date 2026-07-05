import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  articles, articleCategories, getArticlesByCategory,
  type Article, type ArticleSection
} from '@/data/articles';

interface ArticlesPageProps {
  onBack: () => void;
}

export function ArticlesPage({ onBack }: ArticlesPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedArticle]);

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  const featured = articles.filter(a => a.featured);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </button>
          <div className="flex-1" />
          <h1 className="text-lg font-bold">
            <span className="text-gradient">Articles & Guides</span>
          </h1>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Insights, Guides & <span className="text-gradient">Knowledge</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          In-depth articles on productivity, technology, health, and digital life.
          Learn the skills every student and professional should know.
        </p>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Featured Articles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map(article => (
            <ArticleCard key={article.id} article={article} onClick={() => setSelectedArticle(article)} featured />
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {articleCategories.map(cat => {
        const catArticles = getArticlesByCategory(cat.id);
        if (catArticles.length === 0) return null;
        const Icon = cat.icon;
        return (
          <section key={cat.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {catArticles.map(article => (
                <ArticleCard key={article.id} article={article} onClick={() => setSelectedArticle(article)} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="h-12" />
    </div>
  );
}

function ArticleCard({ article, onClick, featured }: { article: Article; onClick: () => void; featured?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`text-left group ${featured ? 'md:col-span-1' : ''}`}
    >
      <div className="glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="text-[10px] font-medium text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
            {article.title}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime} min read
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function ArticleDetail({ article, onBack }: { article: Article; onBack: () => void }) {
  return (
    <article className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 max-h-[400px] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block text-[10px] font-medium text-white bg-primary/80 px-2.5 py-1 rounded mb-3">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-white/70">
              <span>{article.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-medium">
          {article.excerpt}
        </p>

        {article.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-border/40">
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="text-[10px] text-muted-foreground bg-secondary/40 px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Back to Articles */}
        <div className="mt-8 text-center">
          <button onClick={onBack} className="btn-secondary-premium text-xs inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </button>
        </div>
      </div>
    </article>
  );
}

function SectionRenderer({ section }: { section: ArticleSection }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
        {section.heading}
      </h2>

      {section.paragraphs.map((p, i) => (
        <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
          {p}
        </p>
      ))}

      {section.bullets && (
        <ul className="space-y-2 mb-4">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {section.chart && <ChartRenderer chart={section.chart} />}

      {section.image && (
        <figure className="my-6">
          <img
            src={section.image.url}
            alt={section.image.alt}
            loading="lazy"
            className="w-full rounded-xl border border-border/40"
          />
          {section.image.caption && (
            <figcaption className="text-xs text-muted-foreground/60 mt-2 text-center italic">
              {section.image.caption}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  );
}

function ChartRenderer({ chart }: { chart: NonNullable<ArticleSection['chart']> }) {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

  return (
    <div className="my-6 p-5 glass-card rounded-xl">
      <h4 className="text-sm font-semibold text-foreground mb-4 text-center">{chart.title}</h4>
      <ResponsiveContainer width="100%" height={280}>
        {chart.type === 'bar' ? (
          <BarChart data={chart.data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'currentColor' }} className="text-muted-foreground" />
            <YAxis tick={{ fontSize: 10, fill: 'currentColor' }} className="text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chart.data.map((entry, i) => (
                <Cell key={i} fill={entry.color || colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        ) : chart.type === 'pie' ? (
          <PieChart>
            <Pie
              data={chart.data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={(entry: any) => `${entry.label}: ${entry.value}%`}
              labelLine={{ stroke: 'currentColor', strokeWidth: 0.5 }}
              style={{ fontSize: '10px' }}
            >
              {chart.data.map((entry, i) => (
                <Cell key={i} fill={entry.color || colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
          </PieChart>
        ) : (
          <LineChart data={chart.data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'currentColor' }} />
            <YAxis tick={{ fontSize: 10, fill: 'currentColor' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
