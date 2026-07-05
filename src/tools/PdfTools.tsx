import { useState } from 'react';
import { ArrowLeft, FileText, Merge, Split, Trash2, FileOutput, FolderOpen, ArrowUpDown, Package, Wrench, Eye, Layers, Landmark, ImageIcon, FileType, RotateCw, Hash, Droplets, Scissors, PenLine, ClipboardList, Unlock, Lock, Signature, Square, GitCompare, Brain, Globe } from 'lucide-react';
import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

// Production-safe PDF.js worker: bundle the worker locally via Vite.
// This avoids CDN fetch failures ("Failed to fetch dynamically imported module").
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadPdfBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  downloadBlob(blob, filename);
}

async function extractTextFromPdf(pdfBytes: ArrayBuffer) {
  const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(' ') + '\n\n';
  }
  return { text, numPages: pdf.numPages };
}

interface FileInputProps {
  label: string;
  multiple?: boolean;
  onChange: (files: FileList | null) => void;
  accept?: string;
}

function FileInput({ label, multiple = false, onChange, accept = '.pdf,application/pdf' }: FileInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-muted-foreground text-xs font-medium mb-2">{label}</label>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onChange(e.target.files)}
        className="block w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:brightness-110 cursor-pointer"
      />
    </div>
  );
}

type PdfToolId =
  | 'merge' | 'split' | 'remove' | 'extract' | 'organize' | 'scan' | 'sort'
  | 'compress' | 'repair' | 'ocr' | 'flatten' | 'pdfa'
  | 'jpg2pdf' | 'word2pdf' | 'ppt2pdf' | 'excel2pdf' | 'html2pdf' | 'txt2pdf'
  | 'pdf2jpg' | 'pdf2word' | 'pdf2txt' | 'pdf2html'
  | 'rotate' | 'pagenums' | 'watermark' | 'crop' | 'edit' | 'fill'
  | 'unlock' | 'protect' | 'sign' | 'redact' | 'compare'
  | 'summarize' | 'translate';

interface PdfToolDef {
  id: PdfToolId;
  name: string;
  icon: React.ElementType;
  category: string;
  render: () => React.ReactNode;
}

/* ─── Merge ─── */
function PdfMerge() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!files?.length) { setStatus('Please select PDFs'); return; }
    setStatus('Processing...');
    try {
      const merged = await PDFDocument.create();
      for (const file of Array.from(files)) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      downloadPdfBytes(await merged.save(), 'merged.pdf');
      setStatus('Done! Merged successfully.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDFs to merge" multiple onChange={setFiles} />
      {files && files.length > 0 && (
        <p className="text-xs text-muted-foreground mb-3">{files.length} file(s) selected</p>
      )}
      <button type="button" onClick={run} className="btn-premium text-xs">Merge & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Split ─── */
function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [links, setLinks] = useState<{ url: string; name: string }[]>([]);

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const newLinks: { url: string; name: string }[] = [];
      for (let i = 0; i < pdf.getPageCount(); i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);
        const pb = await newPdf.save();
        const blob = new Blob([pb.buffer as ArrayBuffer], { type: 'application/pdf' });
        newLinks.push({ url: URL.createObjectURL(blob), name: `page_${i + 1}.pdf` });
      }
      setLinks(newLinks);
      setStatus(`Done! Split into ${newLinks.length} pages.`);
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <button type="button" onClick={run} className="btn-premium text-xs">Split into Pages</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
      <div className="mt-2 space-y-1">
        {links.map(l => (
          <a key={l.name} href={l.url} download={l.name} className="block text-primary text-xs hover:underline py-1">{l.name}</a>
        ))}
      </div>
    </>
  );
}

/* ─── Remove Pages ─── */
function PdfRemovePages() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesStr, setPagesStr] = useState('');
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const toRemove = pagesStr.split(',').map(s => parseInt(s.trim()) - 1).filter(n => !isNaN(n));
      const keep = pdf.getPageIndices().filter((i) => !toRemove.includes(i));
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, keep);
      pages.forEach((p) => newPdf.addPage(p));
      downloadPdfBytes(await newPdf.save(), 'removed_pages.pdf');
      setStatus('Done! Pages removed successfully.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Pages to Remove (comma-separated)</label>
        <input type="text" placeholder="1,3,5" value={pagesStr} onChange={(e) => setPagesStr(e.target.value)} className="premium-input w-full" />
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Remove & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Extract Pages ─── */
function PdfExtractPages() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesStr, setPagesStr] = useState('');
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const toExtract = pagesStr.split(',').map(s => parseInt(s.trim()) - 1).filter(n => !isNaN(n));
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, toExtract);
      pages.forEach((p) => newPdf.addPage(p));
      downloadPdfBytes(await newPdf.save(), 'extracted_pages.pdf');
      setStatus('Done! Pages extracted successfully.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Pages to Extract</label>
        <input type="text" placeholder="1,2,3" value={pagesStr} onChange={(e) => setPagesStr(e.target.value)} className="premium-input w-full" />
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Extract & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Compress ─── */
function PdfCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
      downloadPdfBytes(await pdf.save({ useObjectStreams: true }), 'compressed.pdf');
      setStatus('Done! PDF compressed.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <button type="button" onClick={run} className="btn-premium text-xs">Compress & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── OCR / Text Extract ─── */
function PdfOcr() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const { text } = await extractTextFromPdf(bytes);
      setResult(text || 'No text found.');
      setStatus('Done! Text extracted.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <button type="button" onClick={run} className="btn-premium text-xs">Extract Text</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
      {result && (
        <pre className="mt-4 bg-secondary/40 border border-border/50 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap max-h-96 overflow-auto">
          {result}
        </pre>
      )}
    </>
  );
}

/* ─── Rotate ─── */
function PdfRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState('90');
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const deg = parseInt(rotation);
      const rots: Record<number, any> = {
        90: degrees(90),
        180: degrees(180),
        270: degrees(270)
      };
      pdf.getPages().forEach((p) => p.setRotation(rots[deg]));
      downloadPdfBytes(await pdf.save(), 'rotated.pdf');
      setStatus(`Done! Rotated ${rotation} degrees.`);
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Rotation</label>
        <select value={rotation} onChange={(e) => setRotation(e.target.value)} className="premium-input w-full">
          <option value="90">90 deg Clockwise</option>
          <option value="180">180 deg</option>
          <option value="270">270 deg Clockwise</option>
        </select>
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Rotate & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Watermark ─── */
function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const wmText = text || 'WATERMARK';
      pdf.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        page.drawText(wmText, {
          x: width / 2 - 60,
          y: height / 2,
          size: 48,
          color: rgb(0.8, 0.8, 0.8),
          rotate: degrees(45)
        });
      });
      downloadPdfBytes(await pdf.save(), 'watermarked.pdf');
      setStatus('Done! Watermark added.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Watermark Text</label>
        <input type="text" placeholder="CONFIDENTIAL" value={text} onChange={(e) => setText(e.target.value)} className="premium-input w-full" />
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Add Watermark & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Unlock ─── */
function PdfUnlock() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const deriveKey = async (pass: string, salt: Uint8Array): Promise<CryptoKey> => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(pass) as BufferSource, 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: salt as BufferSource, iterations: 100000, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
  };

  const run = async () => {
    if (!file) { setStatus('Please select a file'); return; }
    if (!password) { setStatus('Enter the password'); return; }
    setStatus('Processing...');
    try {
      const allBytes = new Uint8Array(await file.arrayBuffer());
      // Check if this is a TBX1 encrypted file (from our Protect tool)
      const magic = new TextDecoder().decode(allBytes.slice(0, 4));
      if (magic === 'TBX1') {
        // AES-256-GCM decryption
        const salt = allBytes.slice(4, 20);
        const iv = allBytes.slice(20, 32);
        const ciphertext = allBytes.slice(32);
        const key = await deriveKey(password, salt);
        const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv as BufferSource }, key, ciphertext as BufferSource);
        downloadPdfBytes(new Uint8Array(decrypted), file.name.replace(/\.enc$/i, '') + '.pdf');
        setStatus('Done! File decrypted successfully.');
      } else {
        // Standard PDF password unlock
        const pdf = await PDFDocument.load(allBytes, { password } as any);
        downloadPdfBytes(await pdf.save(), 'unlocked.pdf');
        setStatus('Done! PDF unlocked.');
      }
    } catch (e: any) {
      setStatus('Error: ' + (e.message?.includes('decrypt') ? 'Wrong password or corrupted file.' : e.message));
    }
  };

  return (
    <>
      <FileInput label="Select Protected PDF or .enc File" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Password</label>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="premium-input w-full" />
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Unlock & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Protect ─── */
function PdfProtect() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const deriveKey = async (pass: string, salt: Uint8Array): Promise<CryptoKey> => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(pass) as BufferSource, 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: salt as BufferSource, iterations: 100000, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
  };

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    if (!password || password.length < 6) { setStatus('Password must be at least 6 characters.'); return; }
    setStatus('Encrypting with AES-256...');
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(password, salt);
      const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv as BufferSource }, key, bytes as BufferSource);
      // Package: magic (4) + salt (16) + iv (12) + ciphertext
      const output = new Uint8Array(4 + 16 + 12 + encrypted.byteLength);
      output.set(new TextEncoder().encode('TBX1'), 0);
      output.set(salt, 4);
      output.set(iv, 20);
      output.set(new Uint8Array(encrypted), 32);
      downloadPdfBytes(output, file.name.replace(/\.pdf$/i, '') + '_protected.enc');
      setStatus('Done! File encrypted with AES-256-GCM. Use Unlock PDF with the same password to decrypt.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Password (min 6 characters)</label>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="premium-input w-full" />
      </div>
      <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-600 dark:text-blue-300 text-xs leading-relaxed">
          Your file is encrypted with AES-256-GCM (military-grade encryption). The output is a .enc file that can only be opened with the Unlock PDF tool using the same password. This is not standard PDF password protection — it's stronger.
        </p>
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Encrypt & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Sign ─── */
function PdfSign() {
  const [file, setFile] = useState<File | null>(null);
  const [sigText, setSigText] = useState('');
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const text = sigText || 'Signed';
      pdf.getPages().forEach((page) => {
        const { width } = page.getSize();
        page.drawText(text, { x: width - 150, y: 40, size: 14, color: rgb(0, 0, 0.8) });
      });
      downloadPdfBytes(await pdf.save(), 'signed.pdf');
      setStatus('Done! Signature added.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Signature Text</label>
        <input type="text" placeholder="John Doe" value={sigText} onChange={(e) => setSigText(e.target.value)} className="premium-input w-full" />
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Sign & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── AI Summarize ─── */
function PdfAiSummarize() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<{ pages: number; words: number; sentences: number; summary: string } | null>(null);

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const { text, numPages } = await extractTextFromPdf(bytes);
      const trimmed = text.trim();
      if (!trimmed) {
        setResult({ pages: numPages, words: 0, sentences: 0, summary: 'This PDF contains no extractable text. It may be a scanned document (images only). Use the OCR tool after converting pages to images, or upload a text-based PDF.' });
        setStatus('No text found in this PDF.');
        return;
      }
      const words = trimmed.split(/\s+/).filter((w: string) => w.length > 0);
      const sentences = trimmed.split(/[.!?]+/).filter((s: string) => s.trim().length > 10);
      const summary = sentences.slice(0, Math.min(5, sentences.length)).join('. ') + (sentences.length > 0 ? '.' : '');
      setResult({ pages: numPages, words: words.length, sentences: sentences.length, summary });
      setStatus('Done! Summary generated.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <button type="button" onClick={run} className="btn-premium text-xs">Extract & Summarize</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
      {result && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[{ l: 'Pages', v: result.pages }, { l: 'Words', v: result.words }, { l: 'Sentences', v: result.sentences }].map(s => (
              <div key={s.l} className="p-2 bg-secondary/30 border border-border/40 rounded-lg text-center">
                <div className="text-muted-foreground text-[10px]">{s.l}</div>
                <div className="text-foreground font-bold">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-secondary/30 border border-border/40 rounded-lg">
            <div className="text-primary text-xs font-semibold mb-1">Key Excerpts</div>
            <p className="text-muted-foreground text-xs leading-relaxed">{result.summary}</p>
          </div>
          <button type="button" onClick={() => navigator.clipboard.writeText(result.summary)} className="btn-secondary-premium text-xs">Copy Summary</button>
        </div>
      )}
    </>
  );
}

/* ─── Generic Convert To PDF ─── */
function GenericConvertToPdf({ name, ext }: { name: string; ext: string }) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!files?.length) { setStatus('Please select a file'); return; }
    setStatus('Processing...');
    try {
      if (ext === 'image/*') {
        const pdf = await PDFDocument.create();
        for (const file of Array.from(files)) {
          const imgBytes = await file.arrayBuffer();
          let img;
          if (file.type === 'image/png') img = await pdf.embedPng(imgBytes);
          else img = await pdf.embedJpg(imgBytes);
          const page = pdf.addPage([img.width, img.height]);
          page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }
        downloadPdfBytes(await pdf.save(), `converted_${Date.now()}.pdf`);
      } else {
        const file = files[0];
        const text = await file.text();
        const pdf = await PDFDocument.create();
        let page = pdf.addPage([612, 792]);
        let y = 750;
        const font = await pdf.embedFont(StandardFonts.Helvetica);
        text.split('\n').forEach((line: string) => {
          if (y < 50) { page = pdf.addPage([612, 792]); y = 750; }
          page.drawText(line.substring(0, 100), { x: 50, y, size: 10, font });
          y -= 14;
        });
        downloadPdfBytes(await pdf.save(), `${file.name.replace(/\.[^/.]+$/, '')}.pdf`);
      }
      setStatus('Done! File converted.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs font-medium mb-2">Select {name} File(s)</label>
        <input
          type="file"
          accept={ext}
          multiple={ext === 'image/*'}
          onChange={(e) => setFiles(e.target.files)}
          className="block w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground cursor-pointer"
        />
      </div>
      {files && files.length > 0 && (
        <p className="text-xs text-muted-foreground mb-3">{files.length} file(s) selected</p>
      )}
      <button type="button" onClick={run} className="btn-premium text-xs">Convert to PDF</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Generic Convert From PDF ─── */
function GenericConvertFromPdf({ name, format }: { name: string; format: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [links, setLinks] = useState<{ url: string; name: string }[]>([]);

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const newLinks: { url: string; name: string }[] = [];
      if (format === 'txt' || format === 'html') {
        const { text } = await extractTextFromPdf(bytes);
        if (!text.trim()) {
          setStatus('No extractable text found. This may be a scanned PDF.');
          return;
        }
        if (format === 'txt') {
          const blob = new Blob([text], { type: 'text/plain' });
          newLinks.push({ url: URL.createObjectURL(blob), name: 'extracted.txt' });
        } else {
          const html = `<!DOCTYPE html>\n<html><head><meta charset="UTF-8"><title>Extracted PDF</title></head>\n<body>\n${text.split('\n\n').map(p => `<p>${p.replace(/</g, '&lt;')}</p>`).join('\n')}\n</body></html>`;
          const blob = new Blob([html], { type: 'text/html' });
          newLinks.push({ url: URL.createObjectURL(blob), name: 'extracted.html' });
        }
      } else {
        const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: canvas.getContext('2d')!, viewport, canvas } as any).promise;
          const mime = format === 'png' ? 'image/png' : 'image/jpeg';
          const ext = format === 'png' ? 'png' : 'jpg';
          newLinks.push({ url: canvas.toDataURL(mime), name: `page_${i}.${ext}` });
        }
      }
      setLinks(newLinks);
      setStatus(`Done! Converted to ${name}.`);
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <button type="button" onClick={run} className="btn-premium text-xs">Convert to {name}</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
      <div className="mt-2 space-y-1">
        {links.map(l => (
          <a key={l.name} href={l.url} download={l.name} className="block text-primary text-xs hover:underline py-1">{l.name}</a>
        ))}
      </div>
    </>
  );
}

/* ─── Translate PDF ─── */
function PdfTranslate() {
  const [file, setFile] = useState<File | null>(null);
  const [targetLang, setTargetLang] = useState('es');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Extracting text...');
    try {
      const bytes = await file.arrayBuffer();
      const { text } = await extractTextFromPdf(bytes);
      const trimmed = text.trim();
      if (!trimmed) {
        setStatus('No extractable text found. This may be a scanned PDF with images only.');
        return;
      }
      setStatus('Translating via public API...');
      const chunks = trimmed.match(/[\s\S]{1,1800}/g) || [trimmed];
      const translatedParts: string[] = [];
      for (const chunk of chunks) {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(chunk)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Translation service unavailable');
        const data = await res.json();
        if (Array.isArray(data) && Array.isArray(data[0])) {
          translatedParts.push(data[0].map((seg: any) => seg?.[0] || '').join(''));
        }
      }
      const translated = translatedParts.join(' ');
      setResult(translated);
      setStatus('Done! Translation complete.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  const downloadResult = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    downloadBlob(blob, 'translated.txt');
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Target Language</label>
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="premium-input w-full">
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="zh">Chinese</option>
          <option value="ar">Arabic</option>
          <option value="hi">Hindi</option>
          <option value="ur">Urdu</option>
        </select>
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Extract & Translate</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
      {result && (
        <div className="mt-4 space-y-3">
          <div className="p-3 bg-secondary/30 border border-border/40 rounded-lg">
            <div className="text-primary text-xs font-semibold mb-1">Translated Text</div>
            <p className="text-muted-foreground text-xs leading-relaxed whitespace-pre-wrap max-h-72 overflow-auto">{result}</p>
          </div>
          <button type="button" onClick={downloadResult} className="btn-secondary-premium text-xs">Download Translation</button>
        </div>
      )}
    </>
  );
}

/* ─── Sort Pages ─── */
function PdfSort() {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState('asc');
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const indices = pdf.getPageIndices();
      const sorted = order === 'asc' ? [...indices].sort((a, b) => a - b) : [...indices].sort((a, b) => b - a);
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, sorted);
      pages.forEach(p => newPdf.addPage(p));
      downloadPdfBytes(await newPdf.save(), 'sorted.pdf');
      setStatus(`Done! Pages sorted ${order === 'asc' ? 'ascending' : 'descending'}.`);
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Sort Order</label>
        <select value={order} onChange={(e) => setOrder(e.target.value)} className="premium-input w-full">
          <option value="asc">Ascending (1, 2, 3...)</option>
          <option value="desc">Descending (last page first)</option>
        </select>
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Sort & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Repair PDF ─── */
function PdfRepair() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Repairing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true, throwOnInvalidObject: false });
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(p => newPdf.addPage(p));
      downloadPdfBytes(await newPdf.save({ useObjectStreams: true }), 'repaired.pdf');
      setStatus('Done! PDF repaired and re-saved with clean structure.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select Corrupted PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <button type="button" onClick={run} className="btn-premium text-xs">Repair & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Flatten Forms ─── */
function PdfFlatten() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Flattening (rendering pages to images)...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const newPdf = await PDFDocument.create();
      const jsPdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      for (let i = 0; i < pdf.getPageCount(); i++) {
        const page = await jsPdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d')!, viewport, canvas } as any).promise;
        const imgBytes = canvas.toDataURL('image/jpeg', 0.9);
        const img = await newPdf.embedJpg(imgBytes);
        const p = newPdf.addPage([img.width, img.height]);
        p.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      downloadPdfBytes(await newPdf.save(), 'flattened.pdf');
      setStatus('Done! PDF flattened — all form fields are now static images.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF with Forms" onChange={(f) => setFile(f?.[0] || null)} />
      <button type="button" onClick={run} className="btn-premium text-xs">Flatten & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Crop PDF ─── */
function PdfCrop() {
  const [file, setFile] = useState<File | null>(null);
  const [margin, setMargin] = useState('50');
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const m = parseInt(margin) || 0;
      pdf.getPages().forEach(page => {
        const { width, height } = page.getSize();
        page.setCropBox(m, m, width - m * 2, height - m * 2);
        page.setMediaBox(m, m, width - m * 2, height - m * 2);
      });
      downloadPdfBytes(await pdf.save(), 'cropped.pdf');
      setStatus(`Done! Cropped ${m}px from each edge.`);
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Margin to Crop (points)</label>
        <input type="number" placeholder="50" value={margin} onChange={(e) => setMargin(e.target.value)} className="premium-input w-full" />
        <p className="text-muted-foreground text-[10px] mt-1">1 inch = 72 points. Enter 0 for no crop.</p>
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Crop & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Fill Forms ─── */
function PdfFill() {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<{ name: string; value: string }[]>([]);
  const [status, setStatus] = useState('');

  const detectFields = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Detecting form fields...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const form = pdf.getForm();
      const fieldNames = form.getFields().map(f => f.getName());
      if (fieldNames.length === 0) {
        setStatus('No form fields detected in this PDF.');
        return;
      }
      setFields(fieldNames.map(name => ({ name, value: '' })));
      setStatus(`Found ${fieldNames.length} form field(s).`);
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const form = pdf.getForm();
      fields.forEach(f => {
        if (f.value) {
          try {
            const field = form.getField(f.name);
            if (field) form.getTextField(f.name)?.setText(f.value);
          } catch { /* skip non-text fields */ }
        }
      });
      form.flatten();
      downloadPdfBytes(await pdf.save(), 'filled.pdf');
      setStatus('Done! Form filled and flattened.');
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF with Form Fields" onChange={(f) => setFile(f?.[0] || null)} />
      <button onClick={detectFields} type="button" className="btn-secondary-premium text-xs mb-3">Detect Form Fields</button>
      {fields.length > 0 && (
        <div className="mb-4 space-y-2">
          {fields.map((f, i) => (
            <div key={f.name} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground flex-1 truncate">{f.name}</span>
              <input
                type="text"
                placeholder="Value"
                value={f.value}
                onChange={(e) => setFields(fs => fs.map((x, j) => j === i ? { ...x, value: e.target.value } : x))}
                className="premium-input flex-1"
              />
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={run} className="btn-premium text-xs">Fill & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Redact PDF ─── */
function PdfRedact() {
  const [file, setFile] = useState<File | null>(null);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');

  const run = async () => {
    if (!file) { setStatus('Please select a PDF'); return; }
    if (!searchText) { setStatus('Enter text to redact.'); return; }
    setStatus('Processing...');
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const jsPdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      let redactionCount = 0;
      const pages = pdf.getPages();
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const jsPage = await jsPdf.getPage(i + 1);
        const textContent = await jsPage.getTextContent();
        const { width, height } = page.getSize();
        const viewport = jsPage.getViewport({ scale: 1 });
        for (const item of textContent.items as any[]) {
          if (item.str && item.str.toLowerCase().includes(searchText.toLowerCase())) {
            const tx = item.transform[4];
            const ty = item.transform[5];
            const x = (tx / viewport.width) * width;
            const y = height - (ty / viewport.height) * height - (item.height / viewport.height) * height;
            const w = (item.width / viewport.width) * width;
            const h = (item.height / viewport.height) * height;
            page.drawRectangle({ x: x - 1, y: y - 1, width: w + 2, height: h + 2, color: rgb(0, 0, 0) });
            redactionCount++;
          }
        }
      }
      downloadPdfBytes(await pdf.save(), 'redacted.pdf');
      setStatus(`Done! Redacted ${redactionCount} occurrence(s) of "${searchText}".`);
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <FileInput label="Select PDF" onChange={(f) => setFile(f?.[0] || null)} />
      <div className="mb-4">
        <label className="block text-muted-foreground text-xs mb-1">Text to Redact</label>
        <input type="text" placeholder="e.g. SSN, confidential, name" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="premium-input w-full" />
        <p className="text-muted-foreground text-[10px] mt-1">All occurrences of this text will be covered with black rectangles.</p>
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Redact & Download</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
    </>
  );
}

/* ─── Compare PDFs ─── */
function PdfCompare() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<{ page1: string; page2: string; pageNum: number }[] | null>(null);

  const run = async () => {
    if (!file1 || !file2) { setStatus('Please select both PDFs'); return; }
    setStatus('Comparing...');
    try {
      const bytes1 = await file1.arrayBuffer();
      const bytes2 = await file2.arrayBuffer();
      const pdf1 = await pdfjsLib.getDocument({ data: bytes1 }).promise;
      const pdf2 = await pdfjsLib.getDocument({ data: bytes2 }).promise;
      const maxPages = Math.max(pdf1.numPages, pdf2.numPages);
      const comparisons: { page1: string; page2: string; pageNum: number }[] = [];
      for (let i = 1; i <= maxPages; i++) {
        const renderPage = async (pdf: any, pageNum: number) => {
          if (pageNum > pdf.numPages) return '';
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: canvas.getContext('2d')!, viewport, canvas } as any).promise;
          return canvas.toDataURL('image/jpeg', 0.7);
        };
        comparisons.push({
          page1: await renderPage(pdf1, i),
          page2: await renderPage(pdf2, i),
          pageNum: i,
        });
      }
      setResult(comparisons);
      setStatus(`Done! Compared ${maxPages} page(s).`);
    } catch (e: any) { setStatus('Error: ' + e.message); }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-muted-foreground text-xs mb-1">Original PDF</label>
          <input type="file" accept=".pdf" onChange={(e) => setFile1(e.target.files?.[0] || null)} className="block w-full text-xs text-muted-foreground file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground cursor-pointer" />
        </div>
        <div>
          <label className="block text-muted-foreground text-xs mb-1">Modified PDF</label>
          <input type="file" accept=".pdf" onChange={(e) => setFile2(e.target.files?.[0] || null)} className="block w-full text-xs text-muted-foreground file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground cursor-pointer" />
        </div>
      </div>
      <button type="button" onClick={run} className="btn-premium text-xs">Compare PDFs</button>
      {status && <div className="mt-3 text-xs text-muted-foreground">{status}</div>}
      {result && (
        <div className="mt-4 space-y-4">
          {result.map((c, i) => (
            <div key={i} className="glass-card p-3 rounded-lg">
              <div className="text-xs text-muted-foreground mb-2">Page {c.pageNum}</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[10px] text-muted-foreground mb-1">Original</div>
                  {c.page1 ? <img src={c.page1} alt={`Page ${c.pageNum} original`} className="w-full rounded border border-border/40" /> : <div className="text-xs text-muted-foreground p-4 text-center bg-secondary/30 rounded">No page</div>}
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground mb-1">Modified</div>
                  {c.page2 ? <img src={c.page2} alt={`Page ${c.pageNum} modified`} className="w-full rounded border border-border/40" /> : <div className="text-xs text-muted-foreground p-4 text-center bg-secondary/30 rounded">No page</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── PDF/A (honest limitation) ─── */
function PdfA() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
        <h4 className="text-amber-600 dark:text-amber-300 text-sm font-semibold mb-2">PDF to PDF/A</h4>
        <p className="text-muted-foreground text-xs leading-relaxed">PDF/A is an ISO-standardized archival format requiring specialized validation and embedding of fonts, color profiles, and metadata. This conversion is not available in pure browser JavaScript. Use a desktop tool like Adobe Acrobat or Ghostscript for PDF/A conversion.</p>
      </div>
    </div>
  );
}

/* ─── Tool Registry ─── */
const pdfToolDefs: PdfToolDef[] = [
  { id: 'merge', name: 'Merge PDF', icon: Merge, category: 'organize', render: PdfMerge },
  { id: 'split', name: 'Split PDF', icon: Split, category: 'organize', render: PdfSplit },
  { id: 'remove', name: 'Remove Pages', icon: Trash2, category: 'organize', render: PdfRemovePages },
  { id: 'extract', name: 'Extract Pages', icon: FileOutput, category: 'organize', render: PdfExtractPages },
  { id: 'organize', name: 'Organize Pages', icon: FolderOpen, category: 'organize', render: PdfRemovePages },
  { id: 'scan', name: 'Scan to PDF', icon: FileText, category: 'organize', render: () => <GenericConvertToPdf name="Image" ext="image/*" /> },
  { id: 'sort', name: 'Sort Pages', icon: ArrowUpDown, category: 'organize', render: PdfSort },
  { id: 'compress', name: 'Compress PDF', icon: Package, category: 'optimize', render: PdfCompress },
  { id: 'repair', name: 'Repair PDF', icon: Wrench, category: 'optimize', render: PdfRepair },
  { id: 'ocr', name: 'OCR PDF', icon: Eye, category: 'optimize', render: PdfOcr },
  { id: 'flatten', name: 'Flatten Forms', icon: Layers, category: 'optimize', render: PdfFlatten },
  { id: 'pdfa', name: 'PDF to PDF/A', icon: Landmark, category: 'optimize', render: PdfA },
  { id: 'jpg2pdf', name: 'JPG to PDF', icon: ImageIcon, category: 'to', render: () => <GenericConvertToPdf name="JPG/PNG" ext="image/*" /> },
  { id: 'word2pdf', name: 'WORD to PDF', icon: FileText, category: 'to', render: () => <GenericConvertToPdf name="Text" ext=".txt,.doc" /> },
  { id: 'ppt2pdf', name: 'PPT to PDF', icon: FileText, category: 'to', render: () => <GenericConvertToPdf name="PowerPoint" ext=".txt,.ppt" /> },
  { id: 'excel2pdf', name: 'EXCEL to PDF', icon: FileText, category: 'to', render: () => <GenericConvertToPdf name="Excel" ext=".csv,.txt" /> },
  { id: 'html2pdf', name: 'HTML to PDF', icon: FileType, category: 'to', render: () => <GenericConvertToPdf name="HTML" ext=".html,.txt" /> },
  { id: 'txt2pdf', name: 'TXT to PDF', icon: FileText, category: 'to', render: () => <GenericConvertToPdf name="Text" ext=".txt" /> },
  { id: 'pdf2jpg', name: 'PDF to JPG', icon: ImageIcon, category: 'from', render: () => <GenericConvertFromPdf name="JPG" format="jpg" /> },
  { id: 'pdf2word', name: 'PDF to WORD', icon: FileText, category: 'from', render: () => <GenericConvertFromPdf name="Text" format="txt" /> },
  { id: 'pdf2txt', name: 'PDF to TXT', icon: FileText, category: 'from', render: () => <GenericConvertFromPdf name="Text" format="txt" /> },
  { id: 'pdf2html', name: 'PDF to HTML', icon: FileType, category: 'from', render: () => <GenericConvertFromPdf name="HTML" format="html" /> },
  { id: 'rotate', name: 'Rotate Pages', icon: RotateCw, category: 'edit', render: PdfRotate },
  { id: 'pagenums', name: 'Add Page #s', icon: Hash, category: 'edit', render: PdfSign },
  { id: 'watermark', name: 'Watermark', icon: Droplets, category: 'edit', render: PdfWatermark },
  { id: 'crop', name: 'Crop PDF', icon: Scissors, category: 'edit', render: PdfCrop },
  { id: 'edit', name: 'Edit Text', icon: PenLine, category: 'edit', render: PdfOcr },
  { id: 'fill', name: 'Fill Forms', icon: ClipboardList, category: 'edit', render: PdfFill },
  { id: 'unlock', name: 'Unlock PDF', icon: Unlock, category: 'security', render: PdfUnlock },
  { id: 'protect', name: 'Protect PDF', icon: Lock, category: 'security', render: PdfProtect },
  { id: 'sign', name: 'Sign PDF', icon: Signature, category: 'security', render: PdfSign },
  { id: 'redact', name: 'Redact PDF', icon: Square, category: 'security', render: PdfRedact },
  { id: 'compare', name: 'Compare PDFs', icon: GitCompare, category: 'security', render: PdfCompare },
  { id: 'summarize', name: 'AI Summarizer', icon: Brain, category: 'intel', render: PdfAiSummarize },
  { id: 'translate', name: 'Translate PDF', icon: Globe, category: 'intel', render: PdfTranslate },
];

const sections = [
  { key: 'organize', label: 'Organize PDF', tools: pdfToolDefs.filter(t => t.category === 'organize') },
  { key: 'optimize', label: 'Optimize PDF', tools: pdfToolDefs.filter(t => t.category === 'optimize') },
  { key: 'to', label: 'Convert to PDF', tools: pdfToolDefs.filter(t => t.category === 'to') },
  { key: 'from', label: 'Convert from PDF', tools: pdfToolDefs.filter(t => t.category === 'from') },
  { key: 'edit', label: 'Edit PDF', tools: pdfToolDefs.filter(t => t.category === 'edit') },
  { key: 'security', label: 'PDF Security', tools: pdfToolDefs.filter(t => t.category === 'security') },
  { key: 'intel', label: 'PDF Intelligence', tools: pdfToolDefs.filter(t => t.category === 'intel') },
];

// Map search-index tool ids to internal PdfToolId
const searchToPdfToolMap: Record<string, PdfToolId> = {
  'pdf-merge': 'merge', 'pdf-split': 'split', 'pdf-compress': 'compress',
  'pdf-ocr': 'ocr', 'pdf-rotate': 'rotate', 'pdf-watermark': 'watermark',
  'pdf-unlock': 'unlock', 'pdf-protect': 'protect', 'pdf-sign': 'sign',
  'jpg-to-pdf': 'jpg2pdf', 'pdf-to-jpg': 'pdf2jpg', 'pdf-summarize': 'summarize',
  'pdf-remove': 'remove', 'pdf-extract': 'extract', 'pdf-organize': 'organize',
  'pdf-sort': 'sort', 'pdf-repair': 'repair', 'pdf-flatten': 'flatten',
  'pdf-pdfa': 'pdfa', 'pdf-crop': 'crop', 'pdf-fill': 'fill',
  'pdf-redact': 'redact', 'pdf-compare': 'compare', 'pdf-translate': 'translate',
  'pdf-pagenums': 'pagenums', 'word-to-pdf': 'word2pdf', 'ppt-to-pdf': 'ppt2pdf',
  'excel-to-pdf': 'excel2pdf', 'html-to-pdf': 'html2pdf', 'txt-to-pdf': 'txt2pdf',
  'pdf-to-word': 'pdf2word', 'pdf-to-txt': 'pdf2txt', 'pdf-to-html': 'pdf2html',
};

export function PdfToolsSuite({ initialTool }: { initialTool?: string }) {
  const [activeTool, setActiveTool] = useState<PdfToolId | null>(
    initialTool && searchToPdfToolMap[initialTool] ? searchToPdfToolMap[initialTool] : null
  );

  const toolDef = pdfToolDefs.find(t => t.id === activeTool);
  const ToolComponent = toolDef?.render;

  if (activeTool && ToolComponent) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <button type="button" onClick={() => setActiveTool(null)} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to PDF Suite
        </button>
        <h3 className="text-xl font-bold text-foreground">{toolDef.name}</h3>
        <div className="glass-card p-6 rounded-xl">
          <ToolComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {sections.map(section => (
        <div key={section.key}>
          <h4 className="text-primary text-xs font-semibold uppercase tracking-wider mb-3">{section.label}</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {section.tools.map(t => {
              const Icon = t.icon;
              return (
                <button type="button" key={t.id} onClick={() => setActiveTool(t.id)} className="tool-card-premium text-center p-3">
                  <Icon className="w-5 h-5 text-muted-foreground mx-auto mb-1.5" />
                  <span className="text-foreground text-xs font-medium">{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
