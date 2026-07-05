import { useState, useCallback } from 'react';
import { Heart, Droplets, FlaskConical, Pill } from 'lucide-react';

type TabKey = 'cardiology' | 'nephrology' | 'biochemistry' | 'pharmacology';

const tabConfig: { key: TabKey; label: string; icon: React.ElementType; color: string }[] = [
  { key: 'cardiology', label: 'Cardiology & Vitals', icon: Heart, color: 'text-rose-400' },
  { key: 'nephrology', label: 'Nephrology & Fluids', icon: Droplets, color: 'text-blue-400' },
  { key: 'biochemistry', label: 'Biochemistry', icon: FlaskConical, color: 'text-emerald-400' },
  { key: 'pharmacology', label: 'Pharmacology', icon: Pill, color: 'text-violet-400' },
];

function CalcCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-5 rounded-xl">
      <h4 className="text-foreground font-bold text-sm mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h4>
      {children}
    </div>
  );
}

function Inp({ id, label, type, placeholder, min, max, step }: { id: string; label: string; type: string; placeholder: string; min?: string; max?: string; step?: string }) {
  return (
    <div>
      <label className="block text-muted-foreground text-xs font-medium mb-1">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="premium-input w-full"
      />
    </div>
  );
}

function ResultBox({ id, label }: { id: string; label: string }) {
  return (
    <div className="mt-4 p-3 bg-secondary/40 border border-border/50 rounded-xl">
      <div className="text-muted-foreground text-xs mb-1">{label}</div>
      <div id={id} className="text-2xl font-extrabold text-foreground">--</div>
    </div>
  );
}

function CardiologyTab() {
  const [mapResult, setMapResult] = useState('');
  const [mapInterp, setMapInterp] = useState('');
  const [mapColor, setMapColor] = useState('');
  const [qtcResult, setQtcResult] = useState('');
  const [qtcInterp, setQtcInterp] = useState('');
  const [qtcColor, setQtcColor] = useState('');

  const calcMAP = useCallback(() => {
    const sbp = parseFloat((document.getElementById('mapSBP') as HTMLInputElement)?.value);
    const dbp = parseFloat((document.getElementById('mapDBP') as HTMLInputElement)?.value);
    if (isNaN(sbp) || isNaN(dbp) || sbp <= 0 || dbp <= 0) { setMapResult('Invalid input'); setMapInterp(''); return; }
    if (dbp >= sbp) { setMapResult('Error: SBP > DBP required'); setMapInterp(''); return; }
    const map = (sbp + 2 * dbp) / 3;
    setMapResult(map.toFixed(1) + ' mmHg');
    if (map < 60) { setMapInterp('Critically Low — Inadequate organ perfusion. Immediate intervention required.'); setMapColor('text-red-400'); }
    else if (map < 70) { setMapInterp('Low Perfusion — Monitor closely. Risk of organ ischemia.'); setMapColor('text-amber-400'); }
    else if (map <= 100) { setMapInterp('Normal — Adequate perfusion pressure.'); setMapColor('text-emerald-400'); }
    else if (map <= 110) { setMapInterp('Elevated — Borderline hypertensive state.'); setMapColor('text-yellow-400'); }
    else { setMapInterp('Hypertensive Emergency — MAP >110 mmHg.'); setMapColor('text-red-400'); }
  }, []);

  const calcQTc = useCallback(() => {
    const qt = parseFloat((document.getElementById('qtcQT') as HTMLInputElement)?.value);
    const rr = parseFloat((document.getElementById('qtcRR') as HTMLInputElement)?.value);
    if (isNaN(qt) || isNaN(rr) || qt <= 0 || rr <= 0) { setQtcResult('Invalid input'); setQtcInterp(''); return; }
    const qtc = qt / Math.sqrt(rr / 1000);
    setQtcResult(qtc.toFixed(1) + ' ms');
    if (qtc < 350) { setQtcInterp('Short QTc — Possible short QT syndrome.'); setQtcColor('text-yellow-400'); }
    else if (qtc <= 450) { setQtcInterp('Normal QTc — Within acceptable range.'); setQtcColor('text-emerald-400'); }
    else if (qtc <= 500) { setQtcInterp('Borderline Prolonged — Risk of Torsades de Pointes. Review medications.'); setQtcColor('text-amber-400'); }
    else { setQtcInterp('Prolonged QTc (>500 ms) — High risk of life-threatening arrhythmia. Urgent review.'); setQtcColor('text-red-400'); }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <CalcCard title="Mean Arterial Pressure (MAP)" icon="🩺">
        <div className="grid grid-cols-2 gap-3">
          <Inp id="mapSBP" label="Systolic BP (mmHg)" type="number" placeholder="e.g. 120" />
          <Inp id="mapDBP" label="Diastolic BP (mmHg)" type="number" placeholder="e.g. 80" />
        </div>
        <button onClick={calcMAP} className="btn-premium w-full mt-3 text-xs">Calculate MAP</button>
        <ResultBox id="" label="MAP = [SBP + 2 x DBP] / 3" />
        <div className="mt-2 text-sm font-medium text-muted-foreground">{mapResult && <span className="text-foreground font-bold text-lg">{mapResult}</span>}</div>
        {mapInterp && <div className={`text-sm font-medium mt-1 ${mapColor}`}>{mapInterp}</div>}
        <div className="mt-3 p-3 bg-secondary/30 rounded-lg text-[10px] text-muted-foreground leading-relaxed">
          <strong className="text-foreground/70">Reference:</strong> Normal MAP: 70-100 mmHg | Low perfusion: {'<'}60 mmHg | Hypertensive: {'>'}110 mmHg
        </div>
      </CalcCard>

      <CalcCard title="QTc Interval (Bazett's)" icon="❤️">
        <div className="grid grid-cols-2 gap-3">
          <Inp id="qtcQT" label="QT Interval (ms)" type="number" placeholder="e.g. 400" />
          <Inp id="qtcRR" label="RR Interval (ms)" type="number" placeholder="e.g. 800" />
        </div>
        <p className="text-muted-foreground text-[10px] mt-2">Formula: QTc = QT / sqrt(RR in seconds)</p>
        <button onClick={calcQTc} className="btn-premium w-full mt-3 text-xs">Calculate QTc</button>
        <div className="mt-2 text-sm font-medium text-muted-foreground">{qtcResult && <span className="text-foreground font-bold text-lg">{qtcResult}</span>}</div>
        {qtcInterp && <div className={`text-sm font-medium mt-1 ${qtcColor}`}>{qtcInterp}</div>}
        <div className="mt-3 p-3 bg-secondary/30 rounded-lg text-[10px] text-muted-foreground leading-relaxed">
          <strong className="text-foreground/70">Reference:</strong> Normal: {'<'}450 ms (M), {'<'}460 ms (F) | Borderline: 450-500 ms | Prolonged: {'>'}500 ms
        </div>
      </CalcCard>
    </div>
  );
}

function NephrologyTab() {
  const [gfrResult, setGfrResult] = useState('');
  const [ckdStage, setCkdStage] = useState('');
  const [ckdClass, setCkdClass] = useState('');
  const [fluidResults, setFluidResults] = useState<{ hourly: string; h8: string; h24: string } | null>(null);

  const calcGFR = useCallback(() => {
    const creat = parseFloat((document.getElementById('gfrCreat') as HTMLInputElement)?.value);
    const age = parseFloat((document.getElementById('gfrAge') as HTMLInputElement)?.value);
    const gender = (document.getElementById('gfrGender') as HTMLSelectElement)?.value;
    if (isNaN(creat) || isNaN(age) || creat <= 0 || age <= 0) { setGfrResult('Invalid input'); setCkdStage(''); return; }
    const kappa = gender === 'female' ? 0.7 : 0.9;
    const alpha = gender === 'female' ? -0.241 : -0.302;
    const cK = creat / kappa;
    const egfr = 142 * Math.pow(Math.min(cK, 1), alpha) * Math.pow(Math.max(cK, 1), -1.200) * Math.pow(0.9938, age) * (gender === 'female' ? 1.012 : 1);
    setGfrResult(egfr.toFixed(1) + ' mL/min/1.73m²');
    if (egfr >= 90) { setCkdStage('CKD G1 - Normal or High'); setCkdClass('bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'); }
    else if (egfr >= 60) { setCkdStage('CKD G2 - Mildly Decreased'); setCkdClass('bg-green-500/20 text-green-300 border border-green-500/30'); }
    else if (egfr >= 45) { setCkdStage('CKD G3a - Mild-Moderate'); setCkdClass('bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'); }
    else if (egfr >= 30) { setCkdStage('CKD G3b - Moderate-Severe'); setCkdClass('bg-amber-500/20 text-amber-300 border border-amber-500/30'); }
    else if (egfr >= 15) { setCkdStage('CKD G4 - Severely Decreased'); setCkdClass('bg-orange-500/20 text-orange-300 border border-orange-500/30'); }
    else { setCkdStage('CKD G5 - Kidney Failure. Dialysis evaluation needed.'); setCkdClass('bg-red-500/20 text-red-300 border border-red-500/30'); }
  }, []);

  const calcFluid = useCallback(() => {
    const w = parseFloat((document.getElementById('fluidWeight') as HTMLInputElement)?.value);
    if (isNaN(w) || w <= 0) { setFluidResults(null); return; }
    let rate = 0;
    if (w <= 10) rate = 4 * w;
    else if (w <= 20) rate = 40 + 2 * (w - 10);
    else rate = 60 + 1 * (w - 20);
    setFluidResults({ hourly: rate.toFixed(1) + ' mL/hr', h8: (rate * 8).toFixed(0) + ' mL', h24: (rate * 24).toFixed(0) + ' mL' });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <CalcCard title="eGFR / CKD-EPI Calculator" icon="🧪">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Inp id="gfrCreat" label="Serum Creatinine (mg/dL)" type="number" placeholder="e.g. 1.2" min="0.1" step="0.01" />
          <Inp id="gfrAge" label="Age (years)" type="number" placeholder="e.g. 45" min="18" max="120" />
          <div className="sm:col-span-2">
            <label className="block text-muted-foreground text-xs font-medium mb-1">Gender</label>
            <select id="gfrGender" className="premium-input w-full">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <button onClick={calcGFR} className="btn-premium w-full mt-3 text-xs">Calculate eGFR</button>
        <div className="mt-2 text-lg font-bold text-foreground">{gfrResult}</div>
        {ckdStage && <div className={`mt-2 px-3 py-2 rounded-lg text-sm font-semibold ${ckdClass}`}>{ckdStage}</div>}
      </CalcCard>

      <CalcCard title="Maintenance Fluid (Holliday-Segar)" icon="💧">
        <Inp id="fluidWeight" label="Patient Weight (kg)" type="number" placeholder="e.g. 30" min="1" max="300" />
        <p className="text-muted-foreground text-[10px] mt-2">4-2-1 Rule: 4ml/kg/hr (1st 10kg) + 2ml/kg/hr (next 10kg) + 1ml/kg/hr (remaining)</p>
        <button onClick={calcFluid} className="btn-premium w-full mt-3 text-xs">Calculate Fluid Rate</button>
        {fluidResults && (
          <div className="mt-4 space-y-2">
            <div className="p-3 bg-secondary/40 border border-border/50 rounded-xl">
              <div className="text-muted-foreground text-xs">Hourly Rate</div>
              <div className="text-2xl font-extrabold text-foreground">{fluidResults.hourly}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-secondary/30 border border-border/40 rounded-lg text-center">
                <div className="text-muted-foreground text-xs">Per 8 hrs</div>
                <div className="text-lg font-bold text-blue-400">{fluidResults.h8}</div>
              </div>
              <div className="p-3 bg-secondary/30 border border-border/40 rounded-lg text-center">
                <div className="text-muted-foreground text-xs">Per 24 hrs</div>
                <div className="text-lg font-bold text-blue-400">{fluidResults.h24}</div>
              </div>
            </div>
          </div>
        )}
      </CalcCard>
    </div>
  );
}

function BiochemistryTab() {
  const [agResult, setAgResult] = useState('');
  const [agInterp, setAgInterp] = useState('');
  const [agColor, setAgColor] = useState('');
  const [winters, setWinters] = useState('');
  const [labParam, setLabParam] = useState('creatinine');
  const [labValue, setLabValue] = useState('');
  const [labUnit, setLabUnit] = useState<'us' | 'si'>('us');

  const labParams: Record<string, { name: string; us: { label: string; min: number; max: number }; si: { label: string; min: number; max: number }; factor: number }> = {
    creatinine: { name: 'Serum Creatinine', us: { label: 'mg/dL', min: 0.6, max: 1.2 }, si: { label: 'μmol/L', min: 53, max: 106 }, factor: 88.4 },
    bun: { name: 'BUN', us: { label: 'mg/dL', min: 7, max: 20 }, si: { label: 'mmol/L', min: 2.5, max: 7.1 }, factor: 0.357 },
    bilirubin: { name: 'Total Bilirubin', us: { label: 'mg/dL', min: 0.1, max: 1.2 }, si: { label: 'μmol/L', min: 1.7, max: 20.5 }, factor: 17.1 },
    glucose: { name: 'Glucose', us: { label: 'mg/dL', min: 70, max: 100 }, si: { label: 'mmol/L', min: 3.9, max: 5.6 }, factor: 0.0555 },
    hemoglobin: { name: 'Hemoglobin', us: { label: 'g/dL', min: 12, max: 17 }, si: { label: 'g/L', min: 120, max: 170 }, factor: 10 },
  };

  const calcAG = useCallback(() => {
    const na = parseFloat((document.getElementById('agNa') as HTMLInputElement)?.value);
    const cl = parseFloat((document.getElementById('agCl') as HTMLInputElement)?.value);
    const hco3 = parseFloat((document.getElementById('agHCO3') as HTMLInputElement)?.value);
    if (isNaN(na) || isNaN(cl) || isNaN(hco3)) { setAgResult('Invalid input'); setAgInterp(''); setWinters(''); return; }
    const ag = na - (cl + hco3);
    setAgResult(ag.toFixed(1) + ' mEq/L');
    if (ag < 8) { setAgInterp('Low Anion Gap (<8) — Consider hypoalbuminaemia.'); setAgColor('text-blue-400'); setWinters(''); }
    else if (ag <= 12) { setAgInterp('Normal Anion Gap (8-12)'); setAgColor('text-emerald-400'); setWinters(''); }
    else { setAgInterp('High Anion Gap (>12) — Metabolic acidosis. Consider MUDPILES.'); setAgColor('text-red-400');
      const pco2 = 1.5 * hco3 + 8;
      setWinters(`Expected PCO2: ${(pco2 - 2).toFixed(1)} – ${(pco2 + 2).toFixed(1)} mmHg`);
    }
  }, []);

  const param = labParams[labParam];
  const val = parseFloat(labValue);
  let converted: number | null = null;
  let targetUnit = '';
  if (!isNaN(val) && val >= 0) {
    if (labUnit === 'us') { converted = val * param.factor; targetUnit = param.si.label; }
    else { converted = val / param.factor; targetUnit = param.us.label; }
  }
  const limits = param[labUnit];
  let status = 'Enter a value';
  let statusClass = 'bg-secondary text-muted-foreground border border-border/50';
  if (!isNaN(val) && val > 0) {
    if (val < limits.min) { status = 'Low'; statusClass = 'bg-amber-500/20 text-amber-400 border border-amber-500/30'; }
    else if (val > limits.max) { status = 'High'; statusClass = 'bg-red-500/20 text-red-400 border border-red-500/30'; }
    else { status = 'Normal'; statusClass = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'; }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <CalcCard title="Anion Gap + Winter's Formula" icon="🧪">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Inp id="agNa" label="Sodium (mEq/L)" type="number" placeholder="e.g. 140" min="100" max="180" />
          <Inp id="agCl" label="Chloride (mEq/L)" type="number" placeholder="e.g. 100" min="50" max="150" />
          <Inp id="agHCO3" label="Bicarbonate (mEq/L)" type="number" placeholder="e.g. 24" min="1" max="50" />
        </div>
        <button onClick={calcAG} className="btn-premium w-full mt-3 text-xs">Calculate Anion Gap</button>
        <div className="mt-2 text-lg font-bold text-foreground">{agResult}</div>
        {agInterp && <div className={`text-sm font-medium mt-1 ${agColor}`}>{agInterp}</div>}
        {winters && <div className="mt-2 p-3 bg-secondary/30 border border-border/40 rounded-lg text-xs text-muted-foreground"><span className="text-primary font-semibold">Winter&apos;s Formula:</span> {winters}</div>}
      </CalcCard>

      <CalcCard title="Lab Value Unit Converter" icon="🔬">
        <div className="mb-3">
          <label className="block text-muted-foreground text-xs font-medium mb-1">Select Parameter</label>
          <select value={labParam} onChange={(e) => setLabParam(e.target.value)} className="premium-input w-full">
            <option value="creatinine">Serum Creatinine</option>
            <option value="bun">Blood Urea Nitrogen (BUN)</option>
            <option value="bilirubin">Total Bilirubin</option>
            <option value="glucose">Glucose</option>
            <option value="hemoglobin">Hemoglobin</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-muted-foreground text-xs font-medium mb-1">Input Unit</label>
            <select value={labUnit} onChange={(e) => setLabUnit(e.target.value as 'us' | 'si')} className="premium-input w-full">
              <option value="us">{param.us.label} (Standard)</option>
              <option value="si">{param.si.label} (SI)</option>
            </select>
          </div>
          <div>
            <label className="block text-muted-foreground text-xs font-medium mb-1">Enter Value</label>
            <input type="number" value={labValue} onChange={(e) => setLabValue(e.target.value)} step="any" min="0" className="premium-input w-full" />
          </div>
        </div>
        <div className="mt-3 p-3 bg-secondary/40 border border-border/50 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-xs">Converted</span>
            <span className="text-primary text-xs font-semibold">{targetUnit || '--'}</span>
          </div>
          <div className="text-2xl font-extrabold text-foreground">{converted !== null ? converted.toFixed(2) : '--'}</div>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusClass}`}>{status}</div>
          <span className="text-xs text-muted-foreground">Normal: {limits.min} - {limits.max} {limits.label}</span>
        </div>
      </CalcCard>
    </div>
  );
}

function PharmacologyTab() {
  const [pdResults, setPdResults] = useState<{ totalDose: string; volume: string; dailyDose: string; dailyVolume: string } | null>(null);

  const calcDose = useCallback(() => {
    const w = parseFloat((document.getElementById('pdWeight') as HTMLInputElement)?.value);
    const d = parseFloat((document.getElementById('pdDose') as HTMLInputElement)?.value);
    const c = parseFloat((document.getElementById('pdConc') as HTMLInputElement)?.value);
    const f = parseFloat((document.getElementById('pdFreq') as HTMLInputElement)?.value);
    if ([w, d, c, f].some(v => isNaN(v) || v <= 0)) { setPdResults(null); return; }
    const totalDose = w * d;
    const volume = totalDose / c;
    setPdResults({
      totalDose: totalDose.toFixed(2) + ' mg',
      volume: volume.toFixed(2) + ' mL',
      dailyDose: (totalDose * f).toFixed(2) + ' mg/day',
      dailyVolume: (volume * f).toFixed(2) + ' mL/day',
    });
  }, []);

  const drugRef = [
    { drug: 'Amoxicillin', dose: '25-50 mg/kg/day', freq: 'q8h or q12h', route: 'PO' },
    { drug: 'Ibuprofen', dose: '5-10 mg/kg/dose', freq: 'q6-8h (max 40 mg/kg/day)', route: 'PO' },
    { drug: 'Paracetamol', dose: '10-15 mg/kg/dose', freq: 'q4-6h (max 5 doses/24h)', route: 'PO/IV' },
    { drug: 'Ceftriaxone', dose: '50-100 mg/kg/day', freq: 'Once daily or q12h', route: 'IV/IM' },
    { drug: 'Metronidazole', dose: '7.5 mg/kg/dose', freq: 'q8h', route: 'PO/IV' },
    { drug: 'Salbutamol', dose: '0.15 mg/kg/dose (min 2.5 mg)', freq: 'q20 min x 3', route: 'Neb' },
    { drug: 'Dexamethasone', dose: '0.15-0.6 mg/kg/dose', freq: 'Single dose (croup)', route: 'PO/IM/IV' },
    { drug: 'Ondansetron', dose: '0.15 mg/kg/dose (max 4 mg)', freq: 'q6-8h PRN', route: 'PO/IV' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <CalcCard title="Pediatric Weight-Based Dosage" icon="💊">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Inp id="pdWeight" label="Weight (kg)" type="number" placeholder="e.g. 15" min="0.5" max="150" step="0.1" />
          <Inp id="pdDose" label="Dose (mg/kg)" type="number" placeholder="e.g. 10" min="0.01" step="0.01" />
          <Inp id="pdConc" label="Concentration (mg/mL)" type="number" placeholder="e.g. 5" min="0.01" step="0.01" />
          <Inp id="pdFreq" label="Doses per Day" type="number" placeholder="e.g. 3" min="1" max="24" />
        </div>
        <button onClick={calcDose} className="btn-premium w-full mt-3 text-xs">Calculate Dose</button>
        {pdResults && (
          <div className="mt-4 space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-secondary/40 border border-border/50 rounded-xl"><div className="text-muted-foreground text-xs">Dose/Admin</div><div className="text-xl font-extrabold text-foreground">{pdResults.totalDose}</div></div>
              <div className="p-3 bg-secondary/40 border border-border/50 rounded-xl"><div className="text-muted-foreground text-xs">Volume/Admin</div><div className="text-xl font-extrabold text-emerald-400">{pdResults.volume}</div></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-secondary/30 border border-border/40 rounded-lg"><div className="text-muted-foreground text-xs">Daily Dose</div><div className="text-lg font-bold text-primary">{pdResults.dailyDose}</div></div>
              <div className="p-3 bg-secondary/30 border border-border/40 rounded-lg"><div className="text-muted-foreground text-xs">Daily Volume</div><div className="text-lg font-bold text-primary">{pdResults.dailyVolume}</div></div>
            </div>
          </div>
        )}
        <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[10px] text-amber-300">
          Always verify dosing against current clinical guidelines. For educational reference only.
        </div>
      </CalcCard>

      <CalcCard title="Pediatric Drug Reference" icon="📋">
        <p className="text-muted-foreground text-xs mb-3">Quick-reference dosing for frequently used pediatric medications.</p>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {drugRef.map((d, i) => (
            <div key={i} className="p-2.5 bg-secondary/30 border border-border/40 rounded-lg">
              <div className="flex justify-between items-start">
                <span className="text-foreground text-xs font-semibold">{d.drug}</span>
                <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary rounded-full">{d.route}</span>
              </div>
              <div className="text-emerald-400 text-xs mt-0.5">{d.dose}</div>
              <div className="text-muted-foreground text-xs">{d.freq}</div>
            </div>
          ))}
        </div>
      </CalcCard>
    </div>
  );
}

export function MedicalToolsSuite({ initialTool: _initialTool }: { initialTool?: string }) {
  const [activeTab, setActiveTab] = useState<TabKey>('cardiology');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {tabConfig.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.key ? '' : tab.color}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'cardiology' && <CardiologyTab />}
      {activeTab === 'nephrology' && <NephrologyTab />}
      {activeTab === 'biochemistry' && <BiochemistryTab />}
      {activeTab === 'pharmacology' && <PharmacologyTab />}
    </div>
  );
}
