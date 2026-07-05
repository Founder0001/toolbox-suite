import { useState, useEffect, useCallback, memo } from 'react';
import { Lightbulb, ThumbsUp, Send, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Suggestion {
  id: string;
  tool_name: string;
  category: string;
  description: string;
  votes: number;
  created_at: string;
}

const categories = ['General', 'PDF Tools', 'Image Tools', 'Student Tools', 'Medical Tools', 'Code Tools', 'SEO Tools', 'Text Tools', 'Unit Converters', 'AI Prompts', 'Other'];

export const SuggestionBox = memo(function SuggestionBox() {
  const [toolName, setToolName] = useState('');
  const [category, setCategory] = useState('General');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState('');

  const loadSuggestions = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tool_suggestions')
        .select('id, tool_name, category, description, votes, created_at')
        .order('votes', { ascending: false })
        .limit(10);
      if (error) throw error;
      setSuggestions(data || []);
    } catch (e: any) {
      setError('Could not load suggestions. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSuggestions();
    try {
      const stored = localStorage.getItem('toolbox-voted-suggestions');
      if (stored) setVotedIds(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }
  }, [loadSuggestions]);

  const handleSubmit = useCallback(async () => {
    if (!toolName.trim() || !description.trim()) {
      setError('Please enter a tool name and description.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const { error } = await supabase
        .from('tool_suggestions')
        .insert({
          tool_name: toolName.trim(),
          category,
          description: description.trim(),
          email: email.trim() || null,
        });
      if (error) throw error;
      setSubmitted(true);
      setToolName('');
      setDescription('');
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
      loadSuggestions();
    } catch (e: any) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [toolName, description, category, email, loadSuggestions]);

  const handleVote = useCallback(async (id: string) => {
    if (votedIds.has(id)) return;
    const suggestion = suggestions.find(s => s.id === id);
    if (!suggestion) return;

    // Optimistic update
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s));
    const newVoted = new Set(votedIds);
    newVoted.add(id);
    setVotedIds(newVoted);
    try {
      localStorage.setItem('toolbox-voted-suggestions', JSON.stringify([...newVoted]));
    } catch { /* ignore */ }

    try {
      const { error } = await supabase
        .from('tool_suggestions')
        .update({ votes: suggestion.votes + 1 })
        .eq('id', id);
      if (error) throw error;
    } catch {
      // Revert on failure
      setSuggestions(prev => prev.map(s => s.id === id ? { ...s, votes: s.votes - 1 } : s));
      const reverted = new Set(votedIds);
      reverted.delete(id);
      setVotedIds(reverted);
    }
  }, [votedIds, suggestions]);

  // Handlers for input changes (memoized)
  const onToolNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setToolName(e.target.value), []);
  const onCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value), []);
  const onDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value), []);
  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 mb-4">
            <Lightbulb className="w-7 h-7 text-amber-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="text-gradient">Suggest a Tool</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Want a tool that's not here? Let us know what you need! Vote on suggestions from others and help us prioritize what to build next.
          </p>
        </div>

        {/* Submit Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-muted-foreground text-xs mb-1">Tool Name *</label>
            <input
              type="text"
              placeholder="e.g. PDF to Excel Converter"
              value={toolName}
              onChange={onToolNameChange}
              className="premium-input w-full"
              maxLength={100}
            />
          </div>
          <div>
            <label className="block text-muted-foreground text-xs mb-1">Category</label>
            <select value={category} onChange={onCategoryChange} className="premium-input w-full">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-muted-foreground text-xs mb-1">Description *</label>
            <textarea
              placeholder="Describe what the tool should do..."
              value={description}
              onChange={onDescriptionChange}
              className="premium-input w-full min-h-[80px] resize-y"
              maxLength={500}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-muted-foreground text-xs mb-1">Email (optional — for updates)</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={onEmailChange}
              className="premium-input w-full"
              maxLength={200}
            />
          </div>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 dark:text-red-300 text-xs">{error}</div>}

        {submitted && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-600 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Thank you! Your suggestion has been submitted. We'll review it soon.
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-premium text-xs w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {submitting ? 'Submitting...' : 'Submit Suggestion'}
        </button>

        {/* Community Suggestions */}
        <div className="mt-8 pt-6 border-t border-border/40">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Community Suggestions
          </h3>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <p>No suggestions yet. Be the first to suggest a tool!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((s) => (
                <div key={s.id} className="flex items-start gap-3 p-4 bg-secondary/30 border border-border/40 rounded-xl hover:border-border/60 transition-colors">
                  <button
                    onClick={() => handleVote(s.id)}
                    disabled={votedIds.has(s.id)}
                    className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-all ${
                      votedIds.has(s.id)
                        ? 'bg-primary/20 text-primary cursor-default'
                        : 'bg-secondary/60 text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer'
                    }`}
                    aria-label="Upvote"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-xs font-bold mt-0.5">{s.votes}</span>
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground">{s.tool_name}</span>
                      <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">{s.category}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.description}</p>
                    <p className="text-[10px] text-muted-foreground/50 mt-1">
                      {new Date(s.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
