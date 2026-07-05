import { useState } from 'react';
import { Braces, KeyRound, Regex, ArrowLeftRight, BookOpen } from 'lucide-react';

type LangTab = 'all' | 'json' | 'jwt' | 'regex' | 'base64' | 'languages';

const langTabs: { key: LangTab; label: string; icon: React.ElementType }[] = [
  { key: 'all', label: 'All Tools', icon: BookOpen },
  { key: 'json', label: 'JSON', icon: Braces },
  { key: 'jwt', label: 'JWT', icon: KeyRound },
  { key: 'regex', label: 'Regex', icon: Regex },
  { key: 'base64', label: 'Base64', icon: ArrowLeftRight },
  { key: 'languages', label: 'Languages', icon: BookOpen },
];

const languageData = [
  { name: 'JavaScript', icon: '📋', desc: 'The language of the web.', details: 'Created in 10 days. Supports OOP, functional, and event-driven paradigms. Used by 98% of websites.' },
  { name: 'Python', icon: '🐍', desc: 'Simple, readable, versatile.', details: 'Guido van Rossum, 1991. Emphasizes readability with whitespace. Used at Google, NASA, Instagram.' },
  { name: 'Java', icon: '☕', desc: 'Write once, run anywhere.', details: 'Sun Microsystems, 1995. OOP, JVM-based, garbage-collected. Powers Android and enterprise.' },
  { name: 'C++', icon: '⚙️', desc: 'High-performance systems.', details: 'Bjarne Stroustrup, 1985. Extends C with OOP. Gaming, real-time, performance-critical apps.' },
  { name: 'Go', icon: '🐹', desc: 'Fast, concurrent, simple.', details: 'Google, 2009. Designed for concurrency. Used by Uber, Docker, Kubernetes.' },
  { name: 'Rust', icon: '🦀', desc: 'Memory-safe systems.', details: 'Mozilla, 2010. Memory safety without GC. Firefox, Discord, Dropbox.' },
  { name: 'TypeScript', icon: '📘', desc: 'Typed JavaScript.', details: 'Microsoft, 2012. Superset of JS with static types. Angular, React codebases.' },
  { name: 'Swift', icon: '📱', desc: 'Apple ecosystem.', details: 'Apple, 2014. Replaces Objective-C. iOS, macOS, watchOS, tvOS.' },
  { name: 'Kotlin', icon: '📲', desc: 'Modern, Java-compatible.', details: 'JetBrains, 2011. Interoperable with Java. Android development.' },
  { name: 'Ruby', icon: '💎', desc: 'Beautiful, expressive.', details: 'Yukihiro Matsumoto, 1995. Programmer happiness. GitHub, Shopify, Airbnb.' },
  { name: 'PHP', icon: '🐘', desc: 'Server-side scripting.', details: 'Rasmus Lerdorf, 1994. Powers 77% of websites. WordPress, Facebook.' },
  { name: 'C#', icon: '🎯', desc: 'Modern, type-safe.', details: 'Microsoft, 2000. OOP, component-oriented. Unity, web, enterprise.' },
];

function JsonTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('Enter JSON and click a button.');

  const handleAction = (action: string) => {
    if (action === 'clear') { setInput(''); setOutput('Enter JSON and click a button.'); return; }
    try {
      const obj = JSON.parse(input);
      if (action === 'format') setOutput(JSON.stringify(obj, null, 2));
      else if (action === 'minify') setOutput(JSON.stringify(obj));
      else if (action === 'validate') setOutput('Valid JSON');
    } catch (e: any) { setOutput(`Error: ${e.message}`); }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-primary text-xs font-semibold uppercase tracking-wider">JSON Validator & Formatter</h4>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "test"}' className="premium-input w-full min-h-[120px] resize-y font-mono text-xs" />
      <div className="flex flex-wrap gap-2">
        {[{ a: 'format', l: 'Format' }, { a: 'minify', l: 'Minify' }, { a: 'validate', l: 'Validate' }, { a: 'clear', l: 'Clear' }].map(b => (
          <button key={b.a} onClick={() => handleAction(b.a)} className={`text-xs font-medium py-1.5 px-3 rounded transition-colors ${b.a === 'validate' ? 'btn-premium' : b.a === 'clear' ? 'btn-secondary-premium text-red-400' : 'btn-secondary-premium'}`}>{b.l}</button>
        ))}
      </div>
      <pre className="bg-secondary/40 border border-border/50 rounded-lg p-3 min-h-[80px] text-xs font-mono whitespace-pre-wrap overflow-auto">{output}</pre>
    </div>
  );
}

function JwtTool() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('--');
  const [payload, setPayload] = useState('--');
  const [sig, setSig] = useState('--');

  const decode = () => {
    const token = input.trim();
    if (!token) { setHeader('Enter a token.'); setPayload('--'); setSig('--'); return; }
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      setHeader(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
      setSig(parts[2]);
    } catch (e: any) { setHeader('Error: ' + e.message); setPayload('--'); setSig('--'); }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-primary text-xs font-semibold uppercase tracking-wider">JWT Debugger (100% Local)</h4>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="eyJhbGci..." className="premium-input w-full min-h-[80px] resize-y font-mono text-xs" />
      <button onClick={decode} className="btn-premium text-xs">Decode JWT</button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ t: 'Header', v: header }, { t: 'Payload', v: payload }, { t: 'Signature', v: sig }].map(s => (
          <div key={s.t} className="p-3 bg-secondary/40 border border-border/50 rounded-lg"><h5 className="text-primary text-[10px] uppercase font-semibold mb-1">{s.t}</h5><pre className="text-[10px] font-mono text-muted-foreground whitespace-pre-wrap">{s.v}</pre></div>
        ))}
      </div>
    </div>
  );
}

function RegexTool() {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState('--');
  const [explain, setExplain] = useState('--');

  const testRegex = () => {
    try { const re = new RegExp(pattern, 'g'); const m = text.match(re); setMatches(m ? `Found ${m.length} matches:\n${m.map((x, i) => `${i + 1}: ${x}`).join('\n')}` : 'No matches found.'); }
    catch (e: any) { setMatches(`Error: ${e.message}`); }
  };

  const explainRegex = () => {
    if (!pattern) { setExplain('Enter a pattern.'); return; }
    const map: Record<string, string> = { '\\d': 'digit (0-9)', '\\w': 'word char', '\\s': 'whitespace', '\\b': 'word boundary', '^': 'start of string', '$': 'end of string', '.': 'any char', '*': '0+ times', '+': '1+ times', '?': '0-1 time', '|': 'OR' };
    let p = pattern;
    Object.entries(map).forEach(([k, v]) => { p = p.replace(new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), v); });
    setExplain(`Pattern: ${pattern}\n\n${p}`);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-primary text-xs font-semibold uppercase tracking-wider">Regex Tester & Explainer</h4>
      <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="\\b\\w+\\b" className="premium-input w-full font-mono text-xs" />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Test string..." className="premium-input w-full min-h-[80px] resize-y font-mono text-xs" />
      <div className="flex gap-2">
        {[{ l: 'Test', fn: testRegex }, { l: 'Explain', fn: explainRegex }, { l: 'Clear', fn: () => { setPattern(''); setText(''); setMatches('--'); setExplain('--'); } }].map(b => (
          <button key={b.l} onClick={b.fn} className={b.l === 'Clear' ? 'btn-secondary-premium text-xs text-red-400' : 'btn-premium text-xs'}>{b.l}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-secondary/40 border border-border/50 rounded-lg"><h5 className="text-primary text-[10px] uppercase font-semibold mb-1">Matches</h5><pre className="text-[10px] font-mono text-muted-foreground whitespace-pre-wrap">{matches}</pre></div>
        <div className="p-3 bg-secondary/40 border border-border/50 rounded-lg"><h5 className="text-primary text-[10px] uppercase font-semibold mb-1">Explanation</h5><pre className="text-[10px] font-mono text-muted-foreground whitespace-pre-wrap">{explain}</pre></div>
      </div>
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('Enter text and click a button.');

  const handleAction = (action: string) => {
    if (action === 'clear') { setInput(''); setOutput('Enter text and click a button.'); return; }
    try {
      if (action === 'encode') setOutput(btoa(input));
      else if (action === 'decode') setOutput(atob(input));
      else if (action === 'urlencode') setOutput(encodeURIComponent(input));
      else if (action === 'urldecode') setOutput(decodeURIComponent(input));
    } catch (e: any) { setOutput(`Error: ${e.message}`); }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-primary text-xs font-semibold uppercase tracking-wider">Base64 & URL Encoder/Decoder</h4>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." className="premium-input w-full min-h-[80px] resize-y font-mono text-xs" />
      <div className="flex flex-wrap gap-2">
        {[{ a: 'encode', l: 'Base64 Encode' }, { a: 'decode', l: 'Base64 Decode' }, { a: 'urlencode', l: 'URL Encode' }, { a: 'urldecode', l: 'URL Decode' }, { a: 'clear', l: 'Clear' }].map(b => (
          <button key={b.a} onClick={() => handleAction(b.a)} className={b.a === 'clear' ? 'btn-secondary-premium text-xs text-red-400' : 'btn-secondary-premium text-xs'}>{b.l}</button>
        ))}
      </div>
      <pre className="bg-secondary/40 border border-border/50 rounded-lg p-3 min-h-[60px] text-xs font-mono whitespace-pre-wrap">{output}</pre>
    </div>
  );
}

function LanguagesTool() {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    setFlipped(prev => { const n = new Set(prev); if (n.has(name)) n.delete(name); else n.add(name); return n; });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-primary text-xs font-semibold uppercase tracking-wider">Programming Languages - Flashcards</h4>
      <p className="text-muted-foreground text-xs">Click any card to flip and learn key facts.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {languageData.map(lang => (
          <div key={lang.name} className="flashcard-3d cursor-pointer" onClick={() => toggle(lang.name)}>
            <div className={`flashcard-inner relative h-[140px] ${flipped.has(lang.name) ? 'flipped' : ''}`}>
              <div className="flashcard-front absolute inset-0 bg-secondary/60 border border-border/50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-3xl mb-2">{lang.icon}</span>
                <span className="text-foreground font-semibold text-sm">{lang.name}</span>
                <p className="text-muted-foreground text-[10px] mt-1">{lang.desc}</p>
              </div>
              <div className="flashcard-back absolute inset-0 bg-secondary/80 border border-primary/30 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-foreground font-semibold text-sm mb-1">{lang.name}</span>
                <p className="text-muted-foreground text-[10px]">{lang.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CodeUtilitiesTool({ initialTool: _initialTool }: { initialTool?: string }) {
  const [activeTab, setActiveTab] = useState<LangTab>('all');

  const subTools = [
    { key: 'json', title: 'JSON Tools', desc: 'Validate, format, minify JSON' },
    { key: 'jwt', title: 'JWT Debugger', desc: 'Decode JSON Web Tokens' },
    { key: 'regex', title: 'Regex Tester', desc: 'Test and explain regex' },
    { key: 'base64', title: 'Base64 & URL Tools', desc: 'Encode/decode strings' },
    { key: 'languages', title: 'Language Flashcards', desc: 'Interactive flashcards' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-2 border-b border-border/50 pb-3">
        {langTabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t.key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'}`}>
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subTools.map(st => (
            <button key={st.key} onClick={() => setActiveTab(st.key as LangTab)} className="tool-card-premium text-left">
              <h4 className="text-primary text-sm font-semibold">{st.title}</h4>
              <p className="text-muted-foreground text-xs mt-1">{st.desc}</p>
              <span className="text-primary text-xs font-medium mt-2 inline-block">Launch &rarr;</span>
            </button>
          ))}
        </div>
      )}
      {activeTab === 'json' && <JsonTool />}
      {activeTab === 'jwt' && <JwtTool />}
      {activeTab === 'regex' && <RegexTool />}
      {activeTab === 'base64' && <Base64Tool />}
      {activeTab === 'languages' && <LanguagesTool />}
    </div>
  );
}
