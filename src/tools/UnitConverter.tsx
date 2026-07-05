import { useState, useCallback } from 'react';
import { ArrowLeft, ArrowLeftRight } from 'lucide-react';
import { UNIT_CONVERSION_DATA, performUnitConversion } from '@/data/units';

export function UnitConverterSuite({ initialTool: _initialTool }: { initialTool?: string }) {
  const [activeType, setActiveType] = useState<string | null>(null);

  if (activeType) {
    const category = UNIT_CONVERSION_DATA[activeType];
    return <UnitConverter type={activeType} category={category} onBack={() => setActiveType(null)} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {Object.entries(UNIT_CONVERSION_DATA).map(([key, cat]) => (
        <button key={key} onClick={() => setActiveType(key)} className="tool-card-premium text-center">
          <span className="text-3xl mb-2 block">{cat.icon}</span>
          <span className="text-foreground font-semibold text-sm">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

function UnitConverter({ type, category, onBack }: { type: string; category: typeof UNIT_CONVERSION_DATA[string]; onBack: () => void }) {
  const [fromValue, setFromValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(category.baseUnitKey);
  const [toUnit, setToUnit] = useState(category.units.find(u => u.key !== category.baseUnitKey)?.key || category.baseUnitKey);

  const result = performUnitConversion(parseFloat(fromValue), fromUnit, toUnit, type);
  const displayResult = isNaN(result) ? 'Error' : isNaN(parseFloat(fromValue)) ? 'Invalid Input' : result.toFixed(category.precision || 2);

  const swap = useCallback(() => { setFromUnit(toUnit); setToUnit(fromUnit); }, [fromUnit, toUnit]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Converters
      </button>
      <h3 className="text-xl font-bold text-foreground">{category.label} Converter</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-muted-foreground text-xs font-medium mb-1.5">From Value</label>
          <input type="number" value={fromValue} onChange={e => setFromValue(e.target.value)} step="any" className="premium-input w-full text-lg" />
        </div>
        <div>
          <label className="block text-muted-foreground text-xs font-medium mb-1.5">From Unit</label>
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="premium-input w-full">
            {category.units.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={swap} className="btn-secondary-premium text-xs">
          <ArrowLeftRight className="w-4 h-4" /> Swap Units
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-muted-foreground text-xs font-medium mb-1.5">To Unit</label>
          <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="premium-input w-full">
            {category.units.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </div>
        <div className="p-4 bg-secondary/40 border border-border/50 rounded-xl">
          <div className="text-muted-foreground text-xs mb-1">Result</div>
          <div className="text-3xl font-extrabold text-foreground tabular-nums">{displayResult}</div>
        </div>
      </div>
    </div>
  );
}
