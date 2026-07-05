import { useState, useCallback } from 'react';
import { Copy, Check, Type } from 'lucide-react';

export function TextCaseConverter({ initialTool: _initialTool }: { initialTool?: string }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = useCallback((text: string, caseType: string) => {
    switch (caseType) {
      case 'uppercase': return text.toUpperCase();
      case 'lowercase': return text.toLowerCase();
      case 'titlecase': return text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      case 'sentencecase': {
        if (!text) return '';
        return text.split(/(?<=[.?!])\s+/).map(s => {
          const t = s.trim();
          if (!t) return '';
          return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
        }).join(' ');
      }
      case 'alternatingcase': return text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
      case 'reversecase': return text.split('').reverse().join('');
      default: return text;
    }
  }, []);

  const handleConvert = useCallback((caseType: string) => {
    setOutput(convert(input, caseType));
  }, [input, convert]);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [output]);

  const buttons = [
    { label: 'UPPER CASE', type: 'uppercase' },
    { label: 'lower case', type: 'lowercase' },
    { label: 'Title Case', type: 'titlecase' },
    { label: 'Sentence case', type: 'sentencecase' },
    { label: 'AlTeRnAtInG cAsE', type: 'alternatingcase' },
    { label: 'esac esreveR', type: 'reversecase' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
          <Type className="w-5 h-5 text-pink-400" />
        </div>
        <p className="text-sm text-muted-foreground">Convert your text into various case formats.</p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your text..."
        className="premium-input w-full min-h-[160px] resize-y"
        aria-label="Input text"
      />

      <div className="flex flex-wrap gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => handleConvert(btn.type)}
            className="btn-premium text-xs"
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <textarea
          value={output}
          readOnly
          placeholder="Output will appear here..."
          className="premium-input w-full min-h-[160px] resize-y bg-secondary/30"
          aria-label="Output text"
        />
        {output && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 btn-secondary-premium text-xs py-1.5 px-3"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  );
}
