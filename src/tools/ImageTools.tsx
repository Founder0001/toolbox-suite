import { useState, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowLeftRight, ImageIcon, Crop, Palette, Sparkles, Eraser, Wand2, Download, Undo2, Loader2, Scissors } from 'lucide-react';

let currentImageCanvas: HTMLCanvasElement | null = null;
let currentImageFileName = 'image';

function loadImageToCanvas(file: File, callback: (canvas: HTMLCanvasElement, img: HTMLImageElement) => void) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d')!.drawImage(img, 0, 0);
      currentImageCanvas = canvas;
      currentImageFileName = file.name.replace(/\.[^/.]+$/, '');
      callback(canvas, img);
    };
    img.src = e.target!.result as string;
  };
  reader.readAsDataURL(file);
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string, mime = 'image/png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(mime);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

interface FileInputProps {
  accept: string;
  onChange: (file: File) => void;
  label: string;
}

function FileInput({ accept, onChange, label }: FileInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-muted-foreground text-xs font-medium mb-2">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange(f); }}
        className="block w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:brightness-110 cursor-pointer"
      />
    </div>
  );
}

function ImagePreview({ canvas }: { canvas: HTMLCanvasElement }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [w, setW] = useState(0);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setW(node.clientWidth);
  }, []);

  if (ref.current) {
    ref.current.width = canvas.width;
    ref.current.height = canvas.height;
    ref.current.getContext('2d')!.drawImage(canvas, 0, 0);
  }

  const scale = canvas.width > w && w > 0 ? w / canvas.width : 1;

  return (
    <div ref={containerRef} className="mt-4">
      <label className="block text-muted-foreground text-xs font-medium mb-2">Preview</label>
      <div className="bg-secondary/40 rounded-lg p-2 border border-border/40 overflow-auto max-h-96">
        <canvas
          ref={(el) => { if (el && !ref.current) { ref.current = el; el.width = canvas.width; el.height = canvas.height; el.getContext('2d')!.drawImage(canvas, 0, 0); } }}
          style={{ maxWidth: '100%', height: 'auto', transform: `scale(${scale})`, transformOrigin: 'top left' }}
        />
      </div>
    </div>
  );
}

type ImageToolId = 'converter' | 'resizer' | 'colorpicker' | 'cropper' | 'filters' | 'bgremover';

const imageTools = [
  { id: 'converter' as ImageToolId, name: 'Image Converter', icon: ArrowLeftRight, desc: 'JPG, PNG, WebP format conversion' },
  { id: 'resizer' as ImageToolId, name: 'Image Resizer', icon: ImageIcon, desc: 'Resize dimensions and quality' },
  { id: 'colorpicker' as ImageToolId, name: 'Color Picker', icon: Palette, desc: 'Extract hex codes from images' },
  { id: 'cropper' as ImageToolId, name: 'Aspect Ratio Cropper', icon: Crop, desc: '1:1, 16:9, 4:3, custom ratios' },
  { id: 'filters' as ImageToolId, name: 'Image Filters', icon: Sparkles, desc: 'Brightness, Contrast, Saturation, Blur' },
  { id: 'bgremover' as ImageToolId, name: 'Background Remover', icon: Wand2, desc: 'AI-powered background removal' },
];

/* ─── Image Converter ─── */
function ImageConverter() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Upload an image and convert it to another format.</p>
      <FileInput accept="image/*" label="Upload Image" onChange={(f) => loadImageToCanvas(f, (c) => setCanvas(c))} />
      {canvas && <ImagePreview canvas={canvas} />}
      {canvas && (
        <div className="flex gap-2 flex-wrap">
          {['PNG', 'JPG', 'WebP'].map(fmt => (
            <button key={fmt} onClick={() => downloadCanvas(currentImageCanvas!, `${currentImageFileName}.${fmt.toLowerCase()}`, fmt === 'JPG' ? 'image/jpeg' : `image/${fmt.toLowerCase()}`)} className="btn-premium text-xs">
              <Download className="w-3 h-3" /> {fmt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Image Resizer ─── */
function ImageResizer() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [w, setW] = useState('');
  const [h, setH] = useState('');
  const [q, setQ] = useState('0.92');

  const resize = () => {
    if (!currentImageCanvas) return;
    const nw = parseInt(w) || currentImageCanvas.width;
    const nh = parseInt(h) || currentImageCanvas.height;
    const c = document.createElement('canvas');
    c.width = nw;
    c.height = nh;
    c.getContext('2d')!.drawImage(currentImageCanvas, 0, 0, nw, nh);
    downloadCanvas(c, `${currentImageFileName}_resized.jpg`, 'image/jpeg');
  };

  const compress = () => {
    if (!currentImageCanvas) return;
    downloadCanvas(currentImageCanvas, `${currentImageFileName}_compressed.jpg`, 'image/jpeg');
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Upload an image, set dimensions and quality.</p>
      <FileInput accept="image/*" label="Upload Image" onChange={(f) => loadImageToCanvas(f, (c) => { setCanvas(c); setW(String(c.width)); setH(String(c.height)); })} />
      {canvas && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-muted-foreground text-xs">Width (px)</label><input type="number" value={w} onChange={e => setW(e.target.value)} className="premium-input w-full text-xs" /></div>
            <div><label className="text-muted-foreground text-xs">Height (px)</label><input type="number" value={h} onChange={e => setH(e.target.value)} className="premium-input w-full text-xs" /></div>
            <div><label className="text-muted-foreground text-xs">Quality (0.1-1)</label><input type="number" value={q} onChange={e => setQ(e.target.value)} min="0.1" max="1" step="0.05" className="premium-input w-full text-xs" /></div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={resize} className="btn-premium text-xs">Resize & Download</button>
            <button onClick={compress} className="btn-secondary-premium text-xs">Compress Original</button>
          </div>
          <ImagePreview canvas={canvas} />
        </>
      )}
    </div>
  );
}

/* ─── Color Picker ─── */
function ColorPicker() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvas) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * sx);
    const y = Math.floor((e.clientY - rect.top) * sy);
    const pixel = canvas.getContext('2d')!.getImageData(x, y, 1, 1).data;
    const h = '#' + [pixel[0], pixel[1], pixel[2]].map(v => v.toString(16).padStart(2, '0')).join('');
    const r = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    setHex(h);
    setRgb(r);
  }, [canvas]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Click anywhere on the image to extract color.</p>
      <FileInput accept="image/*" label="Upload Image" onChange={(f) => loadImageToCanvas(f, (c) => setCanvas(c))} />
      {canvas && (
        <>
          <div className="bg-secondary/40 rounded-lg p-2 border border-border/40 overflow-auto max-h-96">
            <canvas
              ref={(el) => { if (el) { el.width = canvas.width; el.height = canvas.height; el.getContext('2d')!.drawImage(canvas, 0, 0); } }}
              onClick={handleCanvasClick}
              style={{ maxWidth: '100%', height: 'auto', cursor: 'crosshair' }}
            />
          </div>
          {hex && (
            <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg border border-border/40">
              <div className="w-14 h-14 rounded-lg border border-border/50 shadow-sm" style={{ backgroundColor: hex }} />
              <div className="space-y-1.5">
                <div className="text-muted-foreground text-xs flex items-center gap-2">
                  HEX: <span className="text-foreground font-mono font-bold text-sm">{hex}</span>
                  <button onClick={() => navigator.clipboard.writeText(hex)} className="text-primary text-[10px] hover:underline">Copy</button>
                </div>
                <div className="text-muted-foreground text-xs flex items-center gap-2">
                  RGB: <span className="text-foreground font-mono font-bold text-sm">{rgb}</span>
                  <button onClick={() => navigator.clipboard.writeText(rgb)} className="text-primary text-[10px] hover:underline">Copy</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─── Image Cropper ─── */
function ImageCropper() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [cx, setCx] = useState('0');
  const [cy, setCy] = useState('0');
  const [cw, setCw] = useState('100');
  const [ch, setCh] = useState('100');

  const ratios = [
    { name: '1:1', w: 1, h: 1 },
    { name: '16:9', w: 16, h: 9 },
    { name: '4:3', w: 4, h: 3 },
    { name: '3:2', w: 3, h: 2 },
    { name: 'Free', w: 0, h: 0 },
  ];

  const applyRatio = (rw: number, rh: number) => {
    if (!currentImageCanvas) return;
    if (rw === 0) {
      setCx('0'); setCy('0');
      setCw(String(currentImageCanvas.width));
      setCh(String(currentImageCanvas.height));
      return;
    }
    const ir = currentImageCanvas.width / currentImageCanvas.height;
    const tr = rw / rh;
    let w: number, h: number;
    if (ir > tr) { h = currentImageCanvas.height; w = h * tr; }
    else { w = currentImageCanvas.width; h = w / tr; }
    setCx(String(Math.floor((currentImageCanvas.width - w) / 2)));
    setCy(String(Math.floor((currentImageCanvas.height - h) / 2)));
    setCw(String(Math.floor(w)));
    setCh(String(Math.floor(h)));
  };

  const applyCrop = () => {
    if (!currentImageCanvas) return;
    const x = parseInt(cx) || 0, y = parseInt(cy) || 0, w = parseInt(cw) || 1, h = parseInt(ch) || 1;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    c.getContext('2d')!.drawImage(currentImageCanvas, x, y, w, h, 0, 0, w, h);
    downloadCanvas(c, `${currentImageFileName}_cropped.png`);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Upload an image, select ratio, and crop.</p>
      <FileInput accept="image/*" label="Upload Image" onChange={(f) => loadImageToCanvas(f, (c) => setCanvas(c))} />
      {canvas && (
        <>
          <div className="flex flex-wrap gap-2">
            {ratios.map(r => (
              <button key={r.name} onClick={() => applyRatio(r.w, r.h)} className="btn-secondary-premium text-xs">{r.name}</button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div><label className="text-muted-foreground text-[10px]">X</label><input type="number" value={cx} onChange={e => setCx(e.target.value)} className="premium-input w-full text-xs py-1.5" /></div>
            <div><label className="text-muted-foreground text-[10px]">Y</label><input type="number" value={cy} onChange={e => setCy(e.target.value)} className="premium-input w-full text-xs py-1.5" /></div>
            <div><label className="text-muted-foreground text-[10px]">W</label><input type="number" value={cw} onChange={e => setCw(e.target.value)} className="premium-input w-full text-xs py-1.5" /></div>
            <div><label className="text-muted-foreground text-[10px]">H</label><input type="number" value={ch} onChange={e => setCh(e.target.value)} className="premium-input w-full text-xs py-1.5" /></div>
          </div>
          <button onClick={applyCrop} className="btn-premium text-xs">
            <Crop className="w-3 h-3" /> Crop & Download
          </button>
          <ImagePreview canvas={canvas} />
        </>
      )}
    </div>
  );
}

/* ─── Image Filters ─── */
function ImageFilters() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [previewCanvas, setPreviewCanvas] = useState<HTMLCanvasElement | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [blur, setBlur] = useState(0);

  const updatePreview = useCallback(() => {
    if (!previewCanvas || !canvas) return;
    previewCanvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px)`;
  }, [brightness, contrast, saturate, grayscale, sepia, blur, previewCanvas, canvas]);

  const downloadFiltered = () => {
    if (!currentImageCanvas) return;
    const c = document.createElement('canvas');
    c.width = currentImageCanvas.width;
    c.height = currentImageCanvas.height;
    const ctx = c.getContext('2d')!;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px)`;
    ctx.drawImage(currentImageCanvas, 0, 0);
    downloadCanvas(c, `${currentImageFileName}_filtered.png`);
  };

  const reset = () => {
    setBrightness(100); setContrast(100); setSaturate(100);
    setGrayscale(0); setSepia(0); setBlur(0);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Upload an image and apply filters.</p>
      <FileInput accept="image/*" label="Upload Image" onChange={(f) => loadImageToCanvas(f, (c) => {
        setCanvas(c);
        const p = document.createElement('canvas');
        p.width = c.width;
        p.height = c.height;
        p.getContext('2d')!.drawImage(c, 0, 0);
        setPreviewCanvas(p);
      })} />
      {canvas && previewCanvas && (
        <>
          <div className="bg-secondary/40 rounded-lg p-2 border border-border/40 overflow-auto max-h-96">
            <canvas ref={(el) => {
              if (el && previewCanvas) {
                el.width = previewCanvas.width;
                el.height = previewCanvas.height;
                el.getContext('2d')!.drawImage(previewCanvas, 0, 0);
                updatePreview();
              }
            }} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { l: 'Brightness', v: brightness, set: setBrightness, min: 0, max: 200 },
              { l: 'Contrast', v: contrast, set: setContrast, min: 0, max: 200 },
              { l: 'Saturation', v: saturate, set: setSaturate, min: 0, max: 200 },
              { l: 'Grayscale', v: grayscale, set: setGrayscale, min: 0, max: 100 },
              { l: 'Sepia', v: sepia, set: setSepia, min: 0, max: 100 },
              { l: 'Blur', v: blur, set: setBlur, min: 0, max: 10, step: 0.5 },
            ].map(s => (
              <div key={s.l}>
                <label className="text-muted-foreground text-[10px] flex justify-between">
                  <span>{s.l}</span>
                  <span>{s.v}{s.l !== 'Blur' ? '%' : 'px'}</span>
                </label>
                <input type="range" min={s.min} max={s.max} step={s.step || 1} value={s.v}
                  onChange={e => { s.set(Number(e.target.value)); setTimeout(updatePreview, 0); }}
                  className="w-full accent-primary h-1 bg-secondary rounded-lg appearance-none cursor-pointer" />
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={reset} className="btn-secondary-premium text-xs">
              <Undo2 className="w-3 h-3" /> Reset
            </button>
            <button onClick={() => { setGrayscale(100); setSepia(0); setTimeout(updatePreview, 0); }} className="btn-secondary-premium text-xs">Grayscale</button>
            <button onClick={() => { setSepia(100); setGrayscale(0); setTimeout(updatePreview, 0); }} className="btn-secondary-premium text-xs">Sepia</button>
            <button onClick={downloadFiltered} className="btn-premium text-xs">
              <Download className="w-3 h-3" /> Download
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Advanced Background Remover ─── */
function BgRemover() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [resultCanvas, setResultCanvas] = useState<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<'ai' | 'color' | 'edge'>('ai');
  const [targetColor, setTargetColor] = useState('#00ff00');
  const [tolerance, setTolerance] = useState(40);
  const [status, setStatus] = useState('');
  const [processing, setProcessing] = useState(false);

  const removeBgAI = async () => {
    if (!currentImageCanvas) return;
    setProcessing(true);
    setStatus('Loading AI model (first run downloads ~40MB, please wait)...');
    try {
      const imglyModule = await import('@imgly/background-removal');
      const imglyRemoveBackground = (imglyModule as any).default || imglyModule;
      setStatus('AI model loaded. Removing background...');

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        currentImageCanvas!.toBlob((b) => resolve(b!), 'image/png');
      });

      const imageUrl = URL.createObjectURL(blob);
      const removedBlob = await imglyRemoveBackground(imageUrl, {
        output: { format: 'image/png' },
        publicPath: 'https://staticimgly.com/@imgly/background-removal-data/1.6.0/dist/',
        progress: (key: string, current: number, total: number) => {
          if (key === 'compute' && total > 0) {
            setStatus(`Processing... ${Math.round((current / total) * 100)}%`);
          } else if (total > 0) {
            setStatus(`Downloading model... ${Math.round((current / total) * 100)}%`);
          }
        },
      });
      URL.revokeObjectURL(imageUrl);

      // Convert result back to canvas
      const resultUrl = URL.createObjectURL(removedBlob);
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.width;
        c.height = img.height;
        c.getContext('2d')!.drawImage(img, 0, 0);
        setResultCanvas(c);
        URL.revokeObjectURL(resultUrl);
        setStatus('Done! Background removed with AI.');
        setProcessing(false);
      };
      img.src = resultUrl;
    } catch (e: any) {
      setStatus('AI model failed to load. This may be due to network restrictions or the model CDN being unavailable. Try Edge Detection mode instead — it works offline. Error: ' + e.message);
      setProcessing(false);
    }
  };

  // Edge detection background remover — works offline, no model download
  const removeBgEdge = () => {
    if (!currentImageCanvas) return;
    setProcessing(true);
    setStatus('Detecting edges and removing background...');

    try {
      const w = currentImageCanvas.width;
      const h = currentImageCanvas.height;
      const srcCtx = currentImageCanvas.getContext('2d')!;
      const srcData = srcCtx.getImageData(0, 0, w, h);
      const data = srcData.data;

      // Step 1: Sample border pixels to determine background color
      const borderPixels: number[][] = [];
      const sampleSize = Math.min(20, Math.floor(w / 4));
      for (let x = 0; x < w; x += sampleSize) {
        for (const y of [0, h - 1]) {
          const i = (y * w + x) * 4;
          borderPixels.push([data[i], data[i + 1], data[i + 2]]);
        }
      }
      for (let y = 0; y < h; y += sampleSize) {
        for (const x of [0, w - 1]) {
          const i = (y * w + x) * 4;
          borderPixels.push([data[i], data[i + 1], data[i + 2]]);
        }
      }
      // Average border color = estimated background
      let bgR = 0, bgG = 0, bgB = 0;
      borderPixels.forEach(p => { bgR += p[0]; bgG += p[1]; bgB += p[2]; });
      bgR /= borderPixels.length;
      bgG /= borderPixels.length;
      bgB /= borderPixels.length;

      // Step 2: Flood fill from borders — mark pixels similar to background
      const tol = tolerance * tolerance * 3;
      const visited = new Uint8Array(w * h);
      const queue: number[] = [];
      // Seed from all border pixels
      for (let x = 0; x < w; x += 2) {
        queue.push(x, (h - 1) * w + x);
      }
      for (let y = 0; y < h; y += 2) {
        queue.push(y * w, y * w + w - 1);
      }
      while (queue.length > 0) {
        const idx = queue.shift()!;
        if (visited[idx]) continue;
        visited[idx] = 1;
        const i = idx * 4;
        const dr = data[i] - bgR;
        const dg = data[i + 1] - bgG;
        const db = data[i + 2] - bgB;
        if (dr * dr + dg * dg + db * db > tol) continue;
        // Mark as background (transparent)
        data[i + 3] = 0;
        // Add neighbors
        const x = idx % w;
        const y = Math.floor(idx / w);
        if (x > 0) queue.push(idx - 1);
        if (x < w - 1) queue.push(idx + 1);
        if (y > 0) queue.push(idx - w);
        if (y < h - 1) queue.push(idx + w);
      }

      // Step 3: Edge feathering — smooth alpha at boundaries
      const feather = 2;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = y * w + x;
          if (visited[idx]) continue;
          // Check if any neighbor is background
          let bgNeighbors = 0;
          for (let dy = -feather; dy <= feather; dy++) {
            for (let dx = -feather; dx <= feather; dx++) {
              const nx = x + dx, ny = y + dy;
              if (nx >= 0 && nx < w && ny >= 0 && ny < h && visited[ny * w + nx]) bgNeighbors++;
            }
          }
          if (bgNeighbors > 0) {
            const i = idx * 4;
            const ratio = 1 - bgNeighbors / ((2 * feather + 1) * (2 * feather + 1));
            data[i + 3] = Math.min(data[i + 3], Math.round(255 * ratio));
          }
        }
      }

      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      c.getContext('2d')!.putImageData(srcData, 0, 0);
      setResultCanvas(c);
      setStatus('Done! Background removed using edge detection.');
    } catch (e: any) {
      setStatus('Error: ' + e.message);
    }
    setProcessing(false);
  };

  const removeBgColor = () => {
    if (!currentImageCanvas) return;
    setProcessing(true);
    setStatus('Removing color...');

    try {
      const tr = parseInt(targetColor.slice(1, 3), 16);
      const tg = parseInt(targetColor.slice(3, 5), 16);
      const tb = parseInt(targetColor.slice(5, 7), 16);
      const tol = tolerance;

      const c = document.createElement('canvas');
      c.width = currentImageCanvas.width;
      c.height = currentImageCanvas.height;
      const srcCtx = currentImageCanvas.getContext('2d')!;
      const dstCtx = c.getContext('2d')!;
      const imgData = srcCtx.getImageData(0, 0, c.width, c.height);
      const data = imgData.data;
      const w = c.width;
      const h = c.height;

      // First pass: compute alpha based on color distance with soft falloff
      const tolSq = tol * tol;
      const feather = Math.max(1, tol * 0.4); // feather width for soft edges
      for (let i = 0; i < data.length; i += 4) {
        const dr = data[i] - tr;
        const dg = data[i + 1] - tg;
        const db = data[i + 2] - tb;
        const distSq = dr * dr + dg * dg + db * db;
        if (distSq < tolSq) {
          data[i + 3] = 0;
        } else if (distSq < (tol + feather) * (tol + feather)) {
          // Soft edge: partial transparency for pixels near the tolerance boundary
          const ratio = (Math.sqrt(distSq) - tol) / feather;
          data[i + 3] = Math.min(255, Math.round(255 * Math.max(0, Math.min(1, ratio))));
        }
      }

      dstCtx.putImageData(imgData, 0, 0);

      // Second pass: edge-aware smoothing using a simple horizontal+vertical blur
      // on the alpha channel to improve hair/object boundaries
      const smoothed = dstCtx.getImageData(0, 0, w, h);
      const sd = smoothed.data;
      const tmp = new Uint8ClampedArray(data.length);
      // Horizontal pass
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let sum = 0, count = 0;
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            if (nx >= 0 && nx < w) {
              sum += sd[(y * w + nx) * 4 + 3];
              count++;
            }
          }
          tmp[(y * w + x) * 4 + 3] = Math.round(sum / count);
        }
      }
      // Vertical pass
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let sum = 0, count = 0;
          for (let dy = -1; dy <= 1; dy++) {
            const ny = y + dy;
            if (ny >= 0 && ny < h) {
              sum += tmp[(ny * w + x) * 4 + 3];
              count++;
            }
          }
          sd[(y * w + x) * 4 + 3] = Math.round(sum / count);
        }
      }
      dstCtx.putImageData(smoothed, 0, 0);

      setResultCanvas(c);
      setStatus('Done! Color removed with edge feathering.');
    } catch (e: any) {
      setStatus('Error: ' + e.message);
    }
    setProcessing(false);
  };

  const downloadResult = () => {
    if (!resultCanvas) return;
    downloadCanvas(resultCanvas, `${currentImageFileName}_nobg.png`);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        {mode === 'ai'
          ? 'AI-powered background removal works on any image. First run downloads a ~40MB model.'
          : mode === 'edge'
          ? 'Edge detection flood-fill removal works offline. Best for images with uniform backgrounds.'
          : 'Remove a specific color (green screen / chroma key).'}
      </p>

      {/* Mode Toggle */}
      <div className="flex gap-2 p-1 bg-secondary/40 rounded-lg w-fit flex-wrap">
        <button
          onClick={() => setMode('ai')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'ai' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Wand2 className="w-3 h-3 inline mr-1" /> AI Removal
        </button>
        <button
          onClick={() => setMode('edge')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'edge' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Scissors className="w-3 h-3 inline mr-1" /> Edge Detect
        </button>
        <button
          onClick={() => setMode('color')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'color' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Eraser className="w-3 h-3 inline mr-1" /> Color Key
        </button>
      </div>

      <FileInput accept="image/*" label="Upload Image" onChange={(f) => {
        loadImageToCanvas(f, (c) => { setCanvas(c); setResultCanvas(null); setStatus(''); });
      }} />

      {canvas && (
        <>
          {/* Original Preview */}
          <div>
            <label className="block text-muted-foreground text-xs font-medium mb-2">Original</label>
            <div className="bg-secondary/40 rounded-lg p-2 border border-border/40 overflow-auto max-h-64">
              <canvas
                ref={(el) => { if (el) { el.width = canvas.width; el.height = canvas.height; el.getContext('2d')!.drawImage(canvas, 0, 0); } }}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* Color Key Controls */}
          {mode === 'color' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-muted-foreground text-xs">Target Color</label>
                <input type="color" value={targetColor} onChange={e => setTargetColor(e.target.value)} className="w-full h-9 rounded-lg cursor-pointer" />
              </div>
              <div>
                <label className="text-muted-foreground text-xs">Tolerance: {tolerance}</label>
                <input type="range" min="0" max="255" value={tolerance} onChange={e => setTolerance(parseInt(e.target.value))} className="w-full accent-primary h-1 bg-secondary rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          )}

          {/* Edge Detection Controls */}
          {mode === 'edge' && (
            <div>
              <label className="text-muted-foreground text-xs">Tolerance: {tolerance} (higher = removes more)</label>
              <input type="range" min="10" max="120" value={tolerance} onChange={e => setTolerance(parseInt(e.target.value))} className="w-full accent-primary h-1 bg-secondary rounded-lg appearance-none cursor-pointer" />
            </div>
          )}

          {/* Process Button */}
          <button
            onClick={mode === 'ai' ? removeBgAI : mode === 'edge' ? removeBgEdge : removeBgColor}
            disabled={processing}
            className="btn-premium text-xs"
          >
            {processing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
            {processing ? 'Processing...' : mode === 'ai' ? 'Remove Background (AI)' : mode === 'edge' ? 'Remove Background (Edge)' : 'Remove Color'}
          </button>

          {/* Result */}
          {resultCanvas && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <label className="text-muted-foreground text-xs font-medium">Result</label>
                <button onClick={downloadResult} className="btn-premium text-xs">
                  <Download className="w-3 h-3" /> Download PNG
                </button>
              </div>
              <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48cmVjdCB4PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTBlMGUwIi8+PHJlY3QgeT0iMTAiIHg9IjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg==')] rounded-lg p-2 border border-border/40 overflow-auto max-h-96">
                <canvas
                  ref={(el) => { if (el) { el.width = resultCanvas.width; el.height = resultCanvas.height; el.getContext('2d')!.drawImage(resultCanvas, 0, 0); } }}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          )}
        </>
      )}

      {status && <div className="mt-2 text-xs text-muted-foreground">{status}</div>}
    </div>
  );
}

const toolComponents: Record<ImageToolId, React.FC> = {
  converter: ImageConverter,
  resizer: ImageResizer,
  colorpicker: ColorPicker,
  cropper: ImageCropper,
  filters: ImageFilters,
  bgremover: BgRemover,
};

const searchToImageToolMap: Record<string, ImageToolId> = {
  'img-convert': 'converter', 'img-resize': 'resizer', 'img-crop': 'cropper',
  'img-filter': 'filters', 'img-color': 'colorpicker', 'img-bgremove': 'bgremover',
};

export function ImageToolsSuite({ initialTool }: { initialTool?: string }) {
  const [activeTool, setActiveTool] = useState<ImageToolId | null>(
    initialTool && searchToImageToolMap[initialTool] ? searchToImageToolMap[initialTool] : null
  );

  if (activeTool) {
    const Tool = toolComponents[activeTool];
    const toolInfo = imageTools.find(t => t.id === activeTool);
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <button onClick={() => setActiveTool(null)} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Image Tools
        </button>
        <h3 className="text-xl font-bold text-foreground">{toolInfo?.name}</h3>
        <div className="glass-card p-6 rounded-xl">
          <Tool />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {imageTools.map(t => {
        const Icon = t.icon;
        return (
          <button key={t.id} onClick={() => setActiveTool(t.id)} className="tool-card-premium text-center">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-violet-400" />
            </div>
            <div className="text-foreground font-semibold text-sm">{t.name}</div>
            <div className="text-muted-foreground text-xs mt-1">{t.desc}</div>
          </button>
        );
      })}
    </div>
  );
}
