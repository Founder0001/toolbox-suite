import { useState } from 'react';
import {
  Copy, Check, UserCircle,
  Bookmark, BookmarkPlus, Search, Download, Upload, Sparkles,
  LayoutTemplate, MessageSquare, Save, Trash2, ChevronRight,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// ─── Types ───
interface PromptTemplate {
  id: string;
  title: string;
  category: string;
  tags: string[];
  views: string;
  prompt: string;
  variables: string[];
}

interface Favorite {
  id: string;
  title: string;
  prompt: string;
  savedAt: string;
}

// ─── Template Library ───
const templateLibrary: PromptTemplate[] = [
  // Trending
  { id: '1', title: 'Viral Twitter Thread', category: 'Social Media', tags: ['twitter', 'viral', 'social'], views: '12.4K', prompt: 'Write a viral Twitter thread about {{TOPIC}}. Start with a hook, include 5-7 tweets with key insights, and end with a call to action. Make it engaging and shareable.', variables: ['TOPIC'] },
  { id: '2', title: 'TikTok Script', category: 'Short Form Video', tags: ['tiktok', 'video', 'script'], views: '8.7K', prompt: 'Create a 60-second TikTok script for {{TOPIC}}. Include a hook in the first 3 seconds, main content, and a trend-based ending with hashtags.', variables: ['TOPIC'] },
  { id: '3', title: 'LinkedIn Growth Post', category: 'Professional', tags: ['linkedin', 'professional', 'growth'], views: '6.2K', prompt: 'Write a LinkedIn post that will go viral about {{TOPIC}}. Include a personal story, 3 key takeaways, and a question to drive engagement.', variables: ['TOPIC'] },
  { id: '4', title: 'YouTube Shorts Script', category: 'Video Content', tags: ['youtube', 'shorts', 'video'], views: '5.9K', prompt: 'Create a 15-second YouTube Shorts script about {{TOPIC}}. Fast-paced, engaging, with a clear call to action.', variables: ['TOPIC'] },
  // Classic
  { id: '5', title: 'Expert Persona Prompt', category: 'AI Assistant', tags: ['persona', 'expert', 'chatgpt'], views: '15.1K', prompt: 'Act as a {{PERSONA}} with expertise in {{FIELD}}. Your task is to provide detailed, actionable advice on {{TOPIC}}. Be specific, use examples, and challenge my assumptions.', variables: ['PERSONA', 'FIELD', 'TOPIC'] },
  { id: '6', title: 'AIDA Copywriting', category: 'Marketing', tags: ['copywriting', 'aida', 'marketing'], views: '9.8K', prompt: 'Generate persuasive copy for {{PRODUCT}} targeting {{AUDIENCE}}. Use the AIDA framework (Attention, Interest, Desire, Action) with emotional triggers.', variables: ['PRODUCT', 'AUDIENCE'] },
  { id: '7', title: 'Research Paper Structure', category: 'Academic', tags: ['academic', 'research', 'paper'], views: '7.3K', prompt: 'Help me structure a research paper on {{TOPIC}}. Include abstract, introduction, methodology, results, discussion, and conclusion sections with key points for each.', variables: ['TOPIC'] },
  { id: '8', title: 'Code Documentation', category: 'Development', tags: ['code', 'docs', 'developer'], views: '6.8K', prompt: 'Write comprehensive documentation for {{PROJECT}}. Include API reference, setup guide, usage examples, and troubleshooting section.', variables: ['PROJECT'] },
  // Creative
  { id: '9', title: 'Midjourney Prompt', category: 'AI Art', tags: ['midjourney', 'ai art', 'image'], views: '11.2K', prompt: '/imagine prompt: {{SUBJECT}}, {{STYLE}}, {{LIGHTING}}, cinematic, hyperdetailed, 8k, photorealistic --ar 16:9 --v 6.0', variables: ['SUBJECT', 'STYLE', 'LIGHTING'] },
  { id: '10', title: 'Short Story Writer', category: 'Creative Writing', tags: ['story', 'creative', 'writing'], views: '5.4K', prompt: 'Write a short story about {{TOPIC}} with a {{GENRE}} twist. Include a compelling protagonist, conflict, and a satisfying resolution in 1000 words.', variables: ['TOPIC', 'GENRE'] },
  { id: '11', title: 'Brand Identity Builder', category: 'Branding', tags: ['brand', 'identity', 'logo'], views: '4.9K', prompt: 'Create a complete brand identity for {{BRAND}} including mission statement, brand voice, visual style guide, and tagline ideas.', variables: ['BRAND'] },
  { id: '12', title: 'Interview Questions', category: 'Career', tags: ['interview', 'career', 'hr'], views: '4.2K', prompt: 'Generate {{NUMBER}} interview questions for {{ROLE}} position. Include behavioral, technical, and situational questions with evaluation criteria.', variables: ['NUMBER', 'ROLE'] },
  // Added premium templates
  { id: '13', title: 'Email Sequence', category: 'Marketing', tags: ['email', 'sequence', 'marketing'], views: '3.8K', prompt: 'Write a 5-email sequence for {{PRODUCT}} targeting {{AUDIENCE}}. Each email should build on the previous, moving from awareness to conversion.', variables: ['PRODUCT', 'AUDIENCE'] },
  { id: '14', title: 'Lesson Plan Generator', category: 'Education', tags: ['education', 'lesson', 'teacher'], views: '3.2K', prompt: 'Create a detailed lesson plan on {{TOPIC}} for {{GRADE_LEVEL}} students. Include learning objectives, materials, activities, and assessment methods.', variables: ['TOPIC', 'GRADE_LEVEL'] },
  { id: '15', title: 'SQL Query Builder', category: 'Development', tags: ['sql', 'database', 'developer'], views: '4.5K', prompt: 'Write an optimized SQL query to {{TASK}}. Include comments explaining each step, and suggest indexes for better performance.', variables: ['TASK'] },
  { id: '16', title: 'Product Review', category: 'Content', tags: ['review', 'product', 'blog'], views: '2.9K', prompt: 'Write a comprehensive review of {{PRODUCT}}. Include pros, cons, pricing, alternatives, and a final verdict. Be honest and balanced.', variables: ['PRODUCT'] },
  { id: '17', title: 'Podcast Script', category: 'Audio', tags: ['podcast', 'audio', 'script'], views: '2.5K', prompt: 'Write a podcast episode script about {{TOPIC}}. Include intro, guest introduction, 3 discussion points, and outro with call to action.', variables: ['TOPIC'] },
  { id: '18', title: 'API Design Doc', category: 'Development', tags: ['api', 'design', 'backend'], views: '3.6K', prompt: 'Design a REST API for {{RESOURCE}}. Include endpoints, request/response schemas, error codes, and authentication requirements.', variables: ['RESOURCE'] },
];

// ─── Role Templates ───
const roleTemplates = [
  { id: 'r1', title: 'Senior Developer', role: 'You are a senior software developer with 10+ years of experience. You write clean, maintainable code and provide best practices.', tags: ['developer', 'coding', 'senior'] },
  { id: 'r2', title: 'UX Designer', role: 'You are a UX designer who focuses on user-centered design. You provide wireframe suggestions, usability insights, and design system recommendations.', tags: ['design', 'ux', 'ui'] },
  { id: 'r3', title: 'Data Scientist', role: 'You are a data scientist specializing in machine learning and statistical analysis. You explain complex concepts simply and suggest appropriate algorithms.', tags: ['data', 'ml', 'ai'] },
  { id: 'r4', title: 'Marketing Strategist', role: 'You are a marketing strategist with expertise in growth hacking, content marketing, and brand positioning.', tags: ['marketing', 'growth', 'strategy'] },
  { id: 'r5', title: 'Medical Consultant', role: 'You are a medical professional providing educational information. Always include disclaimers that this is not medical advice.', tags: ['medical', 'health', 'education'] },
  { id: 'r6', title: 'Financial Advisor', role: 'You are a financial advisor helping with budgeting, investing, and financial planning. Include risk disclaimers.', tags: ['finance', 'investing', 'money'] },
  { id: 'r7', title: 'Creative Writer', role: 'You are a creative writer who crafts compelling narratives. You excel at character development, plot twists, and vivid descriptions.', tags: ['writing', 'creative', 'story'] },
  { id: 'r8', title: 'SEO Expert', role: 'You are an SEO specialist who helps optimize content for search engines. You provide keyword suggestions, meta tags, and content structure advice.', tags: ['seo', 'content', 'marketing'] },
];

const categories = ['All', 'Social Media', 'Marketing', 'Development', 'Creative Writing', 'AI Art', 'Academic', 'Professional', 'Branding', 'Career', 'Education', 'Content', 'Audio'];

// ─── Storage Helpers ───
function loadFavorites(): Favorite[] {
  try { return JSON.parse(localStorage.getItem('prompt_favorites') || '[]'); } catch { return []; }
}
function saveFavorites(favs: Favorite[]) {
  localStorage.setItem('prompt_favorites', JSON.stringify(favs));
}

// ─── Prompt Builder Component ───
function PromptBuilder({ onUse }: { onUse: (prompt: string) => void }) {
  const [variables, setVariables] = useState<{ key: string; value: string }[]>([
    { key: 'TOPIC', value: '' },
    { key: 'AUDIENCE', value: '' },
  ]);
  const [template, setTemplate] = useState('Write a comprehensive guide about {{TOPIC}} for {{AUDIENCE}}. Include key points, examples, and actionable takeaways.');

  const addVariable = () => setVariables([...variables, { key: '', value: '' }]);
  const removeVariable = (i: number) => setVariables(variables.filter((_, idx) => idx !== i));
  const updateVar = (i: number, field: 'key' | 'value', val: string) => {
    const v = [...variables];
    v[i][field] = val;
    setVariables(v);
  };

  const compiled = variables.reduce((acc, v) => {
    if (!v.key) return acc;
    return acc.replace(new RegExp(`\\{\\{${v.key}\\}\\}`, 'g'), v.value || `{{${v.key}}}`);
  }, template);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-muted-foreground text-xs font-medium mb-2 block">Prompt Template</label>
        <textarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="premium-input w-full min-h-[100px] resize-y font-mono text-xs"
          placeholder="Enter your prompt template using {{VARIABLE}} syntax..."
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-muted-foreground text-xs font-medium">Variables</label>
          <button onClick={addVariable} className="text-xs text-primary hover:underline">+ Add Variable</button>
        </div>
        {variables.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              placeholder="VAR_NAME"
              value={v.key}
              onChange={(e) => updateVar(i, 'key', e.target.value)}
              className="premium-input text-xs flex-1"
            />
            <input
              placeholder="Value"
              value={v.value}
              onChange={(e) => updateVar(i, 'value', e.target.value)}
              className="premium-input text-xs flex-[2]"
            />
            <button onClick={() => removeVariable(i)} className="text-muted-foreground hover:text-destructive p-1">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {template && (
        <div className="p-4 bg-secondary/30 border border-border/40 rounded-lg">
          <label className="text-muted-foreground text-[10px] uppercase tracking-wider mb-2 block">Compiled Prompt</label>
          <p className="text-sm text-foreground whitespace-pre-wrap font-mono text-xs leading-relaxed">{compiled}</p>
        </div>
      )}

      <button onClick={() => onUse(compiled)} className="btn-premium text-xs">
        <ChevronRight className="w-3 h-3" /> Use in Studio
      </button>
    </div>
  );
}

// ─── Role Generator Component ───
function RoleGenerator({ onUse }: { onUse: (prompt: string) => void }) {
  const [selectedRole, setSelectedRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [context, setContext] = useState('');

  const generateRole = () => {
    const role = selectedRole || customRole;
    if (!role) return;
    const prompt = `${role}${context ? ` The specific context is: ${context}` : ''}`;
    onUse(prompt);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-muted-foreground text-xs font-medium mb-2 block">Select a Role</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {roleTemplates.map((r) => (
            <button
              key={r.id}
              onClick={() => { setSelectedRole(r.role); setCustomRole(''); }}
              className={`text-left p-3 rounded-lg border transition-all text-xs ${
                selectedRole === r.role
                  ? 'border-primary/50 bg-primary/10'
                  : 'border-border/40 bg-secondary/30 hover:bg-secondary/50'
              }`}
            >
              <div className="font-semibold text-foreground text-xs mb-1">{r.title}</div>
              <div className="text-muted-foreground text-[10px] line-clamp-2">{r.role}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/40" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <div>
        <label className="text-muted-foreground text-xs font-medium mb-2 block">Custom Role</label>
        <input
          placeholder="E.g., You are a blockchain security auditor..."
          value={customRole}
          onChange={(e) => { setCustomRole(e.target.value); setSelectedRole(''); }}
          className="premium-input w-full text-xs"
        />
      </div>

      <div>
        <label className="text-muted-foreground text-xs font-medium mb-2 block">Additional Context (optional)</label>
        <textarea
          placeholder="Add specific instructions or context..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="premium-input w-full min-h-[60px] resize-y text-xs"
        />
      </div>

      <button onClick={generateRole} className="btn-premium text-xs">
        <UserCircle className="w-3 h-3" /> Generate Role Prompt
      </button>
    </div>
  );
}

// ─── Prompt Optimizer Component ───
function PromptOptimizer({ onUse }: { onUse: (prompt: string) => void }) {
  const [input, setInput] = useState('');
  const [optimized, setOptimized] = useState('');

  const optimize = () => {
    if (!input.trim()) return;
    // Apply optimization rules
    let result = input;
    // Add specificity if missing
    if (!result.includes('{{') && !result.includes('[')) {
      result = result + '\n\nPlease be specific, use examples where appropriate, and structure your response with clear headings.';
    }
    // Add role framing if missing
    if (!result.toLowerCase().startsWith('act as') && !result.toLowerCase().startsWith('you are')) {
      result = 'Act as an expert in this domain. ' + result;
    }
    // Add output format request
    if (!result.includes('format') && !result.includes('structure')) {
      result += '\n\nFormat your response with clear sections and bullet points where appropriate.';
    }
    setOptimized(result);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-muted-foreground text-xs font-medium mb-2 block">Your Prompt</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your prompt here to optimize it..."
          className="premium-input w-full min-h-[100px] resize-y text-xs"
        />
      </div>
      <button onClick={optimize} className="btn-premium text-xs">
        <Sparkles className="w-3 h-3" /> Optimize Prompt
      </button>
      {optimized && (
        <div className="space-y-2 animate-fade-in">
          <label className="text-muted-foreground text-[10px] uppercase tracking-wider block">Optimized</label>
          <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
            <p className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed">{optimized}</p>
          </div>
          <button onClick={() => onUse(optimized)} className="btn-secondary-premium text-xs">
            Use Optimized Version
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Prompt Studio ───
export function PromptStudio({ initialTool: _initialTool }: { initialTool?: string }) {
  const [activeTab, setActiveTab] = useState<'templates' | 'builder' | 'roles' | 'optimizer' | 'favorites'>('templates');
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>(loadFavorites);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [favDialogOpen, setFavDialogOpen] = useState(false);
  const [favTitle, setFavTitle] = useState('');

  const handleCopy = () => {
    if (!selectedPrompt) return;
    navigator.clipboard.writeText(selectedPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFavorite = () => {
    if (!selectedPrompt) return;
    setFavTitle('');
    setFavDialogOpen(true);
  };

  const confirmFavorite = () => {
    if (!selectedPrompt) return;
    const newFav: Favorite = {
      id: Date.now().toString(),
      title: favTitle || 'Untitled Prompt',
      prompt: selectedPrompt,
      savedAt: new Date().toISOString(),
    };
    const updated = [...favorites, newFav];
    setFavorites(updated);
    saveFavorites(updated);
    setFavDialogOpen(false);
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    saveFavorites(updated);
  };

  const loadIntoStudio = (prompt: string) => {
    setSelectedPrompt(prompt);
    setActiveTab('templates');
  };

  const exportFavorites = () => {
    const data = JSON.stringify(favorites, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-favorites-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFavorites = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string);
        if (Array.isArray(imported)) {
          const merged = [...favorites, ...imported.filter((i: Favorite) => !favorites.some(f => f.prompt === i.prompt))];
          setFavorites(merged);
          saveFavorites(merged);
        }
      } catch { /* ignore invalid */ }
    };
    reader.readAsText(file);
  };

  // Filter templates
  const filteredTemplates = templateLibrary.filter(t => {
    const matchesSearch = !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const tabs = [
    { key: 'templates' as const, label: 'Templates', icon: LayoutTemplate },
    { key: 'builder' as const, label: 'Builder', icon: MessageSquare },
    { key: 'roles' as const, label: 'Roles', icon: UserCircle },
    { key: 'optimizer' as const, label: 'Optimizer', icon: Sparkles },
    { key: 'favorites' as const, label: 'Favorites', icon: Bookmark },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-border/50 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.key === 'favorites' && favorites.length > 0 && (
                <span className="ml-1 text-[10px] bg-primary/20 text-primary-foreground px-1.5 py-0.5 rounded-full">{favorites.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  placeholder="Search prompts by title, content, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="premium-input w-full pl-10 text-xs"
                />
              </div>
              <div className="flex gap-1 flex-wrap">
                {categories.slice(0, 6).map(c => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    className={`px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-all ${
                      categoryFilter === c
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedPrompt(t.prompt)}
                  className={`tool-card-premium text-left transition-all ${selectedPrompt === t.prompt ? 'border-primary/50 ring-1 ring-primary/20 bg-primary/5' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h4 className="text-sm font-semibold text-foreground line-clamp-1">{t.title}</h4>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap shrink-0">
                      {t.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                    {t.prompt.substring(0, 120)}{t.prompt.length > 120 ? '...' : ''}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {t.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] text-muted-foreground/60 bg-secondary/50 px-1.5 py-0.5 rounded">#{tag}</span>
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground/50 flex items-center gap-1">
                      <EyeIcon /> {t.views}
                    </span>
                  </div>
                  {t.variables.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {t.variables.map(v => (
                        <span key={v} className="text-[9px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded font-mono">{`{{${v}}}`}</span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No prompts match your search.
              </div>
            )}
          </div>
        )}

        {/* Builder Tab */}
        {activeTab === 'builder' && <PromptBuilder onUse={loadIntoStudio} />}

        {/* Roles Tab */}
        {activeTab === 'roles' && <RoleGenerator onUse={loadIntoStudio} />}

        {/* Optimizer Tab */}
        {activeTab === 'optimizer' && <PromptOptimizer onUse={loadIntoStudio} />}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <button onClick={exportFavorites} className="btn-secondary-premium text-xs">
                <Download className="w-3 h-3" /> Export
              </button>
              <label className="btn-secondary-premium text-xs cursor-pointer">
                <Upload className="w-3 h-3" /> Import
                <input type="file" accept=".json" onChange={importFavorites} className="hidden" />
              </label>
            </div>
            {favorites.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                <Bookmark className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No favorites yet. Save prompts from the Templates tab.
              </div>
            ) : (
              <div className="space-y-2">
                {favorites.map(f => (
                  <div key={f.id} className="flex items-start gap-3 p-3 bg-secondary/30 border border-border/40 rounded-lg">
                    <button onClick={() => setSelectedPrompt(f.prompt)} className="flex-1 text-left">
                      <div className="text-xs font-medium text-foreground mb-1">{f.title}</div>
                      <div className="text-[10px] text-muted-foreground line-clamp-2">{f.prompt}</div>
                    </button>
                    <button onClick={() => removeFavorite(f.id)} className="text-muted-foreground hover:text-destructive p-1 shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Output Area */}
        <div className="space-y-3 pt-4 border-t border-border/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Prompt Studio</span>
            <div className="flex gap-2">
              {selectedPrompt && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={handleFavorite} className="btn-secondary-premium text-xs">
                        <BookmarkPlus className="w-3.5 h-3.5" /> Save
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Save to Favorites</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={handleCopy} className="btn-premium text-xs">
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Copy to clipboard</TooltipContent>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
          <textarea
            value={selectedPrompt}
            onChange={(e) => setSelectedPrompt(e.target.value)}
            placeholder="Select a template, build a prompt, or type your own..."
            className="premium-input w-full min-h-[140px] resize-y font-mono text-xs leading-relaxed"
            aria-label="Prompt editor"
          />
        </div>

        {/* Save Favorite Dialog */}
        <Dialog open={favDialogOpen} onOpenChange={setFavDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-sm">Save to Favorites</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 pt-2">
              <input
                placeholder="Enter a name for this prompt..."
                value={favTitle}
                onChange={(e) => setFavTitle(e.target.value)}
                className="premium-input w-full text-xs"
                autoFocus
              />
              <button onClick={confirmFavorite} className="btn-premium text-xs w-full">
                <Save className="w-3.5 h-3.5" /> Save Favorite
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// For backward compatibility
export function PromptViralTool() {
  return <PromptStudio />;
}
