import { useState, useCallback } from 'react';
import { ArrowLeft, Tag, Eye, BarChart3, Link2, Globe } from 'lucide-react';

type SeoTool = 'meta' | 'ogpreview' | 'keywords' | 'slug' | 'sitemap';

const seoTools = [
  { id: 'meta' as SeoTool, name: 'Meta Tag Generator', icon: Tag, desc: 'Generate SEO-optimized meta tags' },
  { id: 'ogpreview' as SeoTool, name: 'OG Preview', icon: Eye, desc: 'Preview social media sharing' },
  { id: 'keywords' as SeoTool, name: 'Keyword Density', icon: BarChart3, desc: 'Analyze keyword frequency' },
  { id: 'slug' as SeoTool, name: 'Slug Generator', icon: Link2, desc: 'SEO-friendly URL slugs' },
  { id: 'sitemap' as SeoTool, name: 'Sitemap Generator', icon: Globe, desc: 'Generate XML sitemaps' },
];

function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [siteName, setSiteName] = useState('');
  const [output, setOutput] = useState('Generated meta tags will appear here...');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const t = title || 'Page Title';
    const u = url || 'https://example.com';
    const d = desc || 'Page description';
    const k = keywords || '';
    const a = author || '';
    const i = image || '';
    const s = siteName || '';
    const tags = `<!-- Primary Meta Tags -->\n<title>${t}</title>\n<meta name="title" content="${t}">\n<meta name="description" content="${d}">\n${k ? `<meta name="keywords" content="${k}">\n` : ''}${a ? `<meta name="author" content="${a}">\n` : ''}<link rel="canonical" href="${u}">\n<meta name="robots" content="index, follow">\n\n<!-- Open Graph -->\n<meta property="og:type" content="website">\n<meta property="og:url" content="${u}">\n<meta property="og:title" content="${t}">\n<meta property="og:description" content="${d}">\n${i ? `<meta property="og:image" content="${i}">\n` : ''}${s ? `<meta property="og:site_name" content="${s}">\n` : ''}\n<!-- Twitter -->\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:url" content="${u}">\n<meta name="twitter:title" content="${t}">\n<meta name="twitter:description" content="${d}">\n${i ? `<meta name="twitter:image" content="${i}">` : ''}`;
    setOutput(tags);
  }, [title, url, desc, keywords, author, image, siteName]);

  const handleCopy = () => { navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  const descLen = desc.length;

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-muted-foreground text-xs mb-1">Page Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="ToolBox" className="premium-input w-full" /></div>
        <div><label className="block text-muted-foreground text-xs mb-1">Page URL</label><input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="premium-input w-full" /></div>
        <div className="md:col-span-2"><label className="block text-muted-foreground text-xs mb-1">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Brief description..." className="premium-input w-full resize-y" /><span className={`text-[10px] ${descLen >= 150 && descLen <= 160 ? 'text-emerald-400' : descLen > 160 ? 'text-amber-400' : 'text-muted-foreground'}`}>{descLen} chars {descLen >= 150 && descLen <= 160 ? '✓' : descLen > 160 ? '⚠ Too long' : ''}</span></div>
        <div><label className="block text-muted-foreground text-xs mb-1">Keywords</label><input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="free, tools, pdf" className="premium-input w-full" /></div>
        <div><label className="block text-muted-foreground text-xs mb-1">Author</label><input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="ToolBox Team" className="premium-input w-full" /></div>
        <div><label className="block text-muted-foreground text-xs mb-1">OG Image URL</label><input type="url" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." className="premium-input w-full" /></div>
        <div><label className="block text-muted-foreground text-xs mb-1">Site Name</label><input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="ToolBox" className="premium-input w-full" /></div>
      </div>
      <div className="flex gap-2">
        <button onClick={generate} className="btn-premium text-xs">Generate Tags</button>
        <button onClick={handleCopy} className="btn-secondary-premium text-xs">{copied ? 'Copied!' : 'Copy'}</button>
      </div>
      <pre className="bg-secondary/40 border border-border/50 rounded-lg p-4 text-xs font-mono whitespace-pre-wrap overflow-auto max-h-96">{output}</pre>
    </div>
  );
}

function OgPreview() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const domain = (url || 'example.com').replace(/^https?:\/\//, '');

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-muted-foreground text-xs mb-1">Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Page Title" className="premium-input w-full" /></div>
        <div><label className="block text-muted-foreground text-xs mb-1">URL</label><input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="premium-input w-full" /></div>
        <div className="md:col-span-2"><label className="block text-muted-foreground text-xs mb-1">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Description..." className="premium-input w-full resize-y" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h5 className="text-muted-foreground text-xs font-semibold mb-2">Twitter/X Preview</h5>
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <div className="h-32 bg-secondary flex items-center justify-center text-muted-foreground text-xs">OG Image</div>
            <div className="p-3 bg-card"><div className="text-foreground font-semibold text-sm">{title || 'Page Title'}</div><div className="text-muted-foreground text-xs mt-0.5">{desc || 'Description...'}</div><div className="text-primary text-[10px] mt-1">{domain}</div></div>
          </div>
        </div>
        <div>
          <h5 className="text-muted-foreground text-xs font-semibold mb-2">Facebook/LinkedIn Preview</h5>
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <div className="h-32 bg-secondary flex items-center justify-center text-muted-foreground text-xs">OG Image</div>
            <div className="p-3 bg-card"><div className="text-primary text-[10px] uppercase">{domain}</div><div className="text-foreground font-semibold text-sm mt-1">{title || 'Page Title'}</div><div className="text-muted-foreground text-xs mt-0.5">{desc || 'Description...'}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeywordDensity() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<string | null>(null);
  const [stats, setStats] = useState<{ words: number; sentences: number; paragraphs: number; avg: string } | null>(null);

  const stopWords = new Set(['the','a','an','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','must','shall','can','need','to','of','in','for','on','with','at','by','from','as','into','through','during','before','after','above','below','between','under','and','but','or','yet','so','if','because','although','though','while','where','when','that','which','who','whom','whose','what','this','these','those','i','me','my','we','our','you','your','he','him','his','she','her','it','its','they','them','their']);

  const analyze = useCallback(() => {
    const t = text.toLowerCase();
    if (!t.trim()) { setResults(null); setStats(null); return; }
    const words = t.match(/\b[a-z]+\b/g) || [];
    const total = words.length;
    const freq: Record<string, number> = {};
    words.forEach(w => { if (!stopWords.has(w) && w.length > 2) freq[w] = (freq[w] || 0) + 1; });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20);
    let html = '<table class="w-full text-xs"><thead><tr class="text-muted-foreground border-b border-border/40"><th class="text-left py-1">Keyword</th><th class="text-right py-1">Count</th><th class="text-right py-1">Density</th></tr></thead><tbody>';
    sorted.forEach(([w, c]) => { const densityNum = (c / total) * 100; const density = densityNum.toFixed(2); const color = densityNum > 3 ? 'text-red-400' : densityNum > 1.5 ? 'text-amber-400' : 'text-emerald-400'; html += `<tr class="border-b border-border/20"><td class="py-1 text-foreground">${w}</td><td class="text-right text-muted-foreground">${c}</td><td class="text-right ${color}">${density}%</td></tr>`; });
    html += '</tbody></table>';
    setResults(html);
    const sentences = t.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = t.split('\n\n').filter(p => p.trim().length > 0);
    setStats({ words: total, sentences: sentences.length, paragraphs: paragraphs.length, avg: (total / sentences.length).toFixed(1) });
  }, [text]);

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Paste content..." className="premium-input w-full resize-y" />
      <div className="flex gap-2">
        <button onClick={analyze} className="btn-premium text-xs">Analyze</button>
        <button onClick={() => { setText(''); setResults(null); setStats(null); }} className="btn-secondary-premium text-xs">Clear</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h5 className="text-muted-foreground text-xs font-semibold mb-2">Keyword Frequency</h5>
          <div className="bg-secondary/40 border border-border/50 rounded-lg p-3 max-h-64 overflow-auto text-xs" dangerouslySetInnerHTML={{ __html: results || 'Results will appear here...' }} />
        </div>
        <div>
          <h5 className="text-muted-foreground text-xs font-semibold mb-2">Content Stats</h5>
          {stats && (
            <div className="grid grid-cols-2 gap-3">
              {[{ l: 'Words', v: stats.words }, { l: 'Sentences', v: stats.sentences }, { l: 'Paragraphs', v: stats.paragraphs }, { l: 'Avg/Sentence', v: `${stats.avg}w` }].map(s => (
                <div key={s.l} className="p-3 bg-secondary/30 border border-border/40 rounded-lg text-center"><div className="text-muted-foreground text-[10px]">{s.l}</div><div className="text-xl font-bold text-foreground">{s.v}</div></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SlugGenerator() {
  const [input, setInput] = useState('');
  const standard = input.trim() ? input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
  const short = standard.split('-').slice(0, 5).join('-');
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '/');

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div><label className="block text-muted-foreground text-xs mb-1">Enter Title</label><input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="How to Build a Website" className="premium-input w-full" /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-secondary/30 border border-border/40 rounded-lg"><div className="text-muted-foreground text-xs mb-1">Standard</div><div className="text-lg font-bold text-emerald-400 break-all">{standard || '--'}</div></div>
        <div className="p-4 bg-secondary/30 border border-border/40 rounded-lg"><div className="text-muted-foreground text-xs mb-1">Short</div><div className="text-lg font-bold text-primary break-all">{short || '--'}</div></div>
        <div className="p-4 bg-secondary/30 border border-border/40 rounded-lg"><div className="text-muted-foreground text-xs mb-1">With Date</div><div className="text-lg font-bold text-amber-400 break-all">{standard ? `${date}/${standard}` : '--'}</div></div>
      </div>
      {standard && <button onClick={() => navigator.clipboard.writeText(standard)} className="btn-secondary-premium text-xs">Copy Standard</button>}
    </div>
  );
}

function SitemapGenerator() {
  const [urls, setUrls] = useState('');
  const [output, setOutput] = useState('XML sitemap will appear here...');

  const generate = useCallback(() => {
    const lines = urls.split('\n').map(u => u.trim()).filter(Boolean);
    if (!lines.length) { setOutput('Enter at least one URL.'); return; }
    const today = new Date().toISOString().slice(0, 10);
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    lines.forEach(u => { xml += `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`; });
    xml += '</urlset>';
    setOutput(xml);
  }, [urls]);

  const download = () => {
    if (!output || output.startsWith('Enter')) return;
    const blob = new Blob([output], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'sitemap.xml'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <textarea value={urls} onChange={e => setUrls(e.target.value)} rows={6} placeholder="https://example.com/\nhttps://example.com/about" className="premium-input w-full resize-y font-mono text-xs" />
      <div className="flex gap-2 flex-wrap">
        <button onClick={generate} className="btn-premium text-xs">Generate XML</button>
        <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary-premium text-xs">Copy</button>
        <button onClick={download} className="btn-secondary-premium text-xs">Download</button>
      </div>
      <pre className="bg-secondary/40 border border-border/50 rounded-lg p-4 text-xs font-mono whitespace-pre-wrap overflow-auto max-h-96">{output}</pre>
    </div>
  );
}

const searchToSeoToolMap: Record<string, SeoTool> = {
  'seo-meta': 'meta', 'seo-og': 'ogpreview', 'seo-keyword': 'keywords',
  'seo-slug': 'slug', 'seo-sitemap': 'sitemap',
};

export function SeoToolsSuite({ initialTool }: { initialTool?: string }) {
  const [activeTool, setActiveTool] = useState<SeoTool | null>(
    initialTool && searchToSeoToolMap[initialTool] ? searchToSeoToolMap[initialTool] : null
  );

  const renderTool = () => {
    switch (activeTool) {
      case 'meta': return <MetaTagGenerator />;
      case 'ogpreview': return <OgPreview />;
      case 'keywords': return <KeywordDensity />;
      case 'slug': return <SlugGenerator />;
      case 'sitemap': return <SitemapGenerator />;
      default: return null;
    }
  };

  if (activeTool) {
    const tool = seoTools.find(t => t.id === activeTool);
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <button onClick={() => setActiveTool(null)} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to SEO Tools
        </button>
        <h3 className="text-xl font-bold text-foreground">{tool?.name}</h3>
        {renderTool()}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {seoTools.map(t => (
        <button key={t.id} onClick={() => setActiveTool(t.id)} className="tool-card-premium text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <t.icon className="w-6 h-6 text-primary" />
          </div>
          <div className="text-foreground font-semibold text-sm">{t.name}</div>
          <div className="text-muted-foreground text-xs mt-1">{t.desc}</div>
        </button>
      ))}
    </div>
  );
}
