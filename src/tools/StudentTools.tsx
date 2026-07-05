import { useState, useEffect, useRef } from 'react';
import { Copy, Check, BookOpen, Timer, Hash, Quote } from 'lucide-react';

const gradeMap: Record<string, number> = { 'A+': 4.0, A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0, 'C-': 1.7, 'D+': 1.3, D: 1.0, F: 0.0 };
const grades = Object.keys(gradeMap);

function GpaCalculator() {
  const [rows, setRows] = useState([{ id: 1, name: 'Mathematics', grade: 'A', credits: 3 }, { id: 2, name: 'English', grade: 'B+', credits: 3 }, { id: 3, name: 'Physics', grade: 'A-', credits: 4 }]);
  const [nextId, setNextId] = useState(4);

  const updateRow = (id: number, field: string, value: string | number) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addRow = () => { setRows(prev => [...prev, { id: nextId, name: '', grade: 'A', credits: 3 }]); setNextId(n => n + 1); };
  const removeRow = (id: number) => setRows(prev => prev.filter(r => r.id !== id));

  const { totalCredits, totalPoints } = rows.reduce((acc, r) => {
    const c = parseFloat(String(r.credits)) || 0;
    const g = gradeMap[r.grade] || 0;
    return { totalCredits: acc.totalCredits + c, totalPoints: acc.totalPoints + g * c };
  }, { totalCredits: 0, totalPoints: 0 });

  const finalGpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <p className="text-sm text-muted-foreground">Add subjects with grade points and credit hours to calculate GPA.</p>
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-2 items-center text-muted-foreground text-[10px] font-semibold uppercase tracking-wider pb-1 border-b border-border/30">
          <div className="col-span-5">Subject</div><div className="col-span-3 text-center">Grade</div><div className="col-span-2 text-center">Credits</div><div className="col-span-2"></div>
        </div>
        {rows.map(row => (
          <div key={row.id} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-5"><input type="text" value={row.name} onChange={e => updateRow(row.id, 'name', e.target.value)} className="premium-input w-full py-2 text-xs" placeholder="Subject" /></div>
            <div className="col-span-3"><select value={row.grade} onChange={e => updateRow(row.id, 'grade', e.target.value)} className="premium-input w-full py-2 text-xs">{grades.map(g => <option key={g} value={g}>{g}</option>)}</select></div>
            <div className="col-span-2"><input type="number" value={row.credits} onChange={e => updateRow(row.id, 'credits', e.target.value)} className="premium-input w-full py-2 text-xs" min="0" step="0.5" /></div>
            <div className="col-span-2"><button onClick={() => removeRow(row.id)} className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs transition-colors">✕</button></div>
          </div>
        ))}
      </div>
      <button onClick={addRow} className="btn-premium text-xs">+ Add Subject</button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-secondary/30 rounded-xl border border-border/40">
        <div><span className="text-muted-foreground text-xs">Total Credits</span><div className="text-2xl font-bold text-foreground">{totalCredits.toFixed(1)}</div></div>
        <div><span className="text-muted-foreground text-xs">Grade Points</span><div className="text-2xl font-bold text-foreground">{totalPoints.toFixed(2)}</div></div>
        <div><span className="text-muted-foreground text-xs">GPA</span><div className="text-3xl font-bold text-emerald-400">{finalGpa.toFixed(2)}</div></div>
        <div><span className="text-muted-foreground text-xs">CGPA</span><div className="text-3xl font-bold text-primary">{finalGpa.toFixed(2)}</div></div>
      </div>
    </div>
  );
}

function PomodoroTimer() {
  const [workTime] = useState(25 * 60);
  const [breakTime] = useState(5 * 60);
  const [current, setCurrent] = useState(workTime);
  const [isWork, setIsWork] = useState(true);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, []);

  const start = () => {
    if (running && !paused) return;
    if (paused) { setPaused(false); setRunning(true); intervalRef.current = setInterval(tick, 1000); return; }
    setRunning(true); setPaused(false); intervalRef.current = setInterval(tick, 1000);
  };

  const tick = () => {
    setCurrent(prev => {
      if (prev > 1) return prev - 1;
      // Switch
      setIsWork(w => {
        if (w) { setSessions(s => s + 1); return false; }
        return true;
      });
      return isWork ? breakTime : workTime;
    });
  };

  const pause = () => { if (running && !paused) { if (intervalRef.current) clearInterval(intervalRef.current); setPaused(true); setRunning(false); } };
  const reset = () => { if (intervalRef.current) clearInterval(intervalRef.current); setRunning(false); setPaused(false); setIsWork(true); setCurrent(workTime); setSessions(0); };

  const circumference = 2 * Math.PI * 52;
  const total = isWork ? workTime : breakTime;
  const progress = (current / total) * circumference;
  const mins = Math.floor(current / 60);
  const secs = current % 60;

  return (
    <div className="space-y-6 flex flex-col items-center">
      <p className="text-sm text-muted-foreground">25 min work / 5 min break with visual countdown.</p>
      <div className="relative w-56 h-56 sm:w-64 sm:h-64">
        <svg className="timer-ring-circle w-full h-full" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--surface-3))" strokeWidth="6" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - progress} style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl sm:text-5xl font-bold text-foreground tabular-nums">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
          <span className="text-xs text-muted-foreground mt-1">{isWork ? 'Work' : 'Break'}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={start} className="btn-premium text-xs bg-emerald-600 hover:bg-emerald-700">▶ Start</button>
        <button onClick={pause} className="btn-secondary-premium text-xs text-amber-400">⏸ Pause</button>
        <button onClick={reset} className="btn-secondary-premium text-xs">↺ Reset</button>
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>Work: <span className="text-foreground">25:00</span></span>
        <span>Break: <span className="text-foreground">5:00</span></span>
        <span>Sessions: <span className="text-foreground">{sessions}</span></span>
      </div>
    </div>
  );
}

function WordCounter() {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).filter(w => w.length > 0) : [];
  const chars = text.length;
  const sentences = text.trim() ? text.match(/[^.!?]+[.!?]+/g) || [text] : [];
  const readingMin = Math.ceil(words.length / 200);

  let readability = '--';
  if (words.length > 0 && sentences.length > 0) {
    const syllables = words.reduce((c, w) => c + Math.max(1, (w.toLowerCase().match(/[aeiouy]/g) || []).length), 0);
    readability = (206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (syllables / words.length)).toFixed(1);
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <p className="text-sm text-muted-foreground">Analyze word count, readability, and reading time.</p>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text..." className="premium-input w-full min-h-[160px] resize-y" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{ l: 'Words', v: words.length }, { l: 'Characters', v: chars }, { l: 'Sentences', v: sentences.length }, { l: 'Reading Time', v: `${readingMin} min` }].map(s => (
          <div key={s.l} className="p-4 bg-secondary/30 border border-border/40 rounded-lg text-center"><span className="text-muted-foreground text-xs">{s.l}</span><div className="text-2xl font-bold text-foreground">{s.v}</div></div>
        ))}
      </div>
      <div className="p-4 bg-secondary/30 border border-border/40 rounded-lg"><span className="text-muted-foreground text-xs">Flesch-Kincaid Score:</span><div className="text-xl font-bold text-primary">{readability}</div></div>
    </div>
  );
}

function CitationGenerator() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [publisher, setPublisher] = useState('');
  const [style, setStyle] = useState<'harvard' | 'apa' | 'mla'>('harvard');
  const [copied, setCopied] = useState(false);

  const av = author.trim() || 'Author, A.';
  const tv = title.trim() || 'Title of the Book';
  const yv = year.trim() || '2026';
  const pv = publisher.trim() || 'Publisher';

  let citation = '';
  if (style === 'harvard') citation = `${av} (${yv}) _${tv}_. ${pv}.`;
  else if (style === 'apa') citation = `${av} (${yv}). _${tv}_. ${pv}.`;
  else citation = `${av}. _${tv}_. ${pv}, ${yv}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(citation).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <p className="text-sm text-muted-foreground">Generate citations in Harvard, APA, or MLA format.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-muted-foreground text-xs mb-1">Author</label><input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Smith, J." className="premium-input w-full" /></div>
        <div><label className="block text-muted-foreground text-xs mb-1">Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="The Art of Writing" className="premium-input w-full" /></div>
        <div><label className="block text-muted-foreground text-xs mb-1">Year</label><input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="2023" className="premium-input w-full" /></div>
        <div><label className="block text-muted-foreground text-xs mb-1">Publisher</label><input type="text" value={publisher} onChange={e => setPublisher(e.target.value)} placeholder="Oxford Press" className="premium-input w-full" /></div>
      </div>
      <div className="flex gap-2">
        {(['harvard', 'apa', 'mla'] as const).map(s => (
          <button key={s} onClick={() => setStyle(s)} className={`btn-premium text-xs capitalize ${style === s ? '' : 'btn-secondary-premium'}`}>{s}</button>
        ))}
      </div>
      <div className="bg-secondary/40 border border-border/50 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap">{citation}</div>
      <button onClick={handleCopy} className="btn-premium text-xs">
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy Citation'}
      </button>
    </div>
  );
}

const subTools = [
  { id: 'gpa', name: 'GPA Calculator', icon: BookOpen, desc: 'Calculate GPA with dynamic rows', render: GpaCalculator },
  { id: 'pomodoro', name: 'Pomodoro Timer', icon: Timer, desc: '25 min work / 5 min break', render: PomodoroTimer },
  { id: 'wordcounter', name: 'Word Counter', icon: Hash, desc: 'Word count, readability, reading time', render: WordCounter },
  { id: 'citation', name: 'Citation Generator', icon: Quote, desc: 'Harvard, APA, or MLA citations', render: CitationGenerator },
];

const searchToStudentToolMap: Record<string, string> = {
  'gpa-calc': 'gpa', 'pomodoro': 'pomodoro', 'word-count': 'wordcounter', 'citation': 'citation',
};

export function StudentToolsSuite({ initialTool }: { initialTool?: string }) {
  const [activeTool, setActiveTool] = useState<string | null>(
    initialTool && searchToStudentToolMap[initialTool] ? searchToStudentToolMap[initialTool] : null
  );

  const tool = subTools.find(t => t.id === activeTool);
  const ToolComponent = tool?.render;

  if (activeTool && ToolComponent) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <button onClick={() => setActiveTool(null)} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors">
          ← Back to Student Tools
        </button>
        <h3 className="text-xl font-bold text-foreground">{tool.name}</h3>
        <ToolComponent />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
      {subTools.map(t => (
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
