import {
  FileText, Image, Sparkles, BookOpen, Stethoscope, Scale,
  Code, Type, Search
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  emoji: string;
  description: string;
  color: string;
  toolIds: string[];
}

export interface ToolDef {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  aliases?: string[];
  keywords?: string[];
}

export const categories: Category[] = [
  {
    id: 'pdfTools',
    name: 'All-In-One PDF Suite',
    shortName: 'PDF Suite',
    icon: FileText,
    emoji: '📄',
    description: 'Merge, Split, Compress, Unlock, Convert, and AI Summarize PDFs completely locally.',
    color: '#ef4444',
    toolIds: ['pdfSuite'],
  },
  {
    id: 'imageTools',
    name: 'Comprehensive Image Suite',
    shortName: 'Image Suite',
    icon: Image,
    emoji: '🖼️',
    description: 'Convert, Resize, Crop, Filter, Extract Colors, and Remove Backgrounds',
    color: '#8b5cf6',
    toolIds: ['imageSuite'],
  },
  {
    id: 'aiPromptTools',
    name: 'AI Prompt Studio',
    shortName: 'AI Prompts',
    icon: Sparkles,
    emoji: '✨',
    description: 'Professional prompt builder, role generator, templates, and optimizer',
    color: '#f59e0b',
    toolIds: ['promptStudio'],
  },
  {
    id: 'studentTools',
    name: 'Student Tools Suite',
    shortName: 'Student Tools',
    icon: BookOpen,
    emoji: '📚',
    description: 'GPA Calculator, Pomodoro Timer, Word Counter & Citation Generator',
    color: '#10b981',
    toolIds: ['studentSuite'],
  },
  {
    id: 'mbbsTools',
    name: 'Medical Tools',
    shortName: 'Medical',
    icon: Stethoscope,
    emoji: '🩺',
    description: 'Cardiology, Nephrology, Biochemistry & Clinical Pharmacology Calculators',
    color: '#f43f5e',
    toolIds: ['medicalTools'],
  },
  {
    id: 'unitConverters',
    name: 'Comprehensive Unit Converter Suite',
    shortName: 'Unit Converters',
    icon: Scale,
    emoji: '⚖️',
    description: 'Convert Length, Mass, Volume, Temperature, Speed, Pressure, and more!',
    color: '#06b6d4',
    toolIds: ['unitConverterSuite'],
  },
  {
    id: 'codeUtilities',
    name: 'Code Utilities Suite',
    shortName: 'Code Utilities',
    icon: Code,
    emoji: '💻',
    description: 'JSON, JWT, Regex, Base64 & Language Tools',
    color: '#6366f1',
    toolIds: ['codeUtilities'],
  },
  {
    id: 'textUtilities',
    name: 'Text Utilities',
    shortName: 'Text Utilities',
    icon: Type,
    emoji: '📝',
    description: 'Text Case Converter, Word Counter, Lorem Generator, Password Generator',
    color: '#ec4899',
    toolIds: ['textCaseConverter'],
  },
  {
    id: 'seoTools',
    name: 'SEO & Marketing Tools Suite',
    shortName: 'SEO Tools',
    icon: Search,
    emoji: '🔍',
    description: 'Meta Tags, OG Preview, Keyword Density, Slug Generator & Sitemap Builder',
    color: '#14b8a6',
    toolIds: ['seoSuite'],
  },
];

// Top-level tool suites
export const toolSuites: Record<string, ToolDef> = {
  pdfSuite: {
    id: 'pdfSuite',
    name: 'All-In-One PDF Suite',
    category: 'PDF Tools',
    categoryId: 'pdfTools',
    description: 'Merge, Split, Compress, Unlock, Convert, and AI Summarize PDFs completely locally. All processed securely 100% client-side.',
    aliases: ['pdf', 'pdf editor', 'pdf merger', 'pdf splitter'],
    keywords: ['pdf', 'merge', 'split', 'compress', 'convert', 'unlock', 'protect', 'watermark', 'ocr', 'rotate'],
  },
  imageSuite: {
    id: 'imageSuite',
    name: 'Comprehensive Image Suite',
    category: 'Image Tools',
    categoryId: 'imageTools',
    description: 'Convert, Resize, Crop, Filter, Extract Colors, and Remove Backgrounds from your images completely client-side.',
    aliases: ['image', 'photo', 'picture editor', 'image converter'],
    keywords: ['image', 'photo', 'resize', 'crop', 'filter', 'convert', 'background removal', 'color picker'],
  },
  promptStudio: {
    id: 'promptStudio',
    name: 'AI Prompt Studio',
    category: 'AI Prompt Tools',
    categoryId: 'aiPromptTools',
    description: 'Professional prompt workspace with builder, role generator, templates, and optimizer.',
    aliases: ['prompt', 'ai prompt', 'chatgpt prompt', 'prompt generator'],
    keywords: ['prompt', 'ai', 'chatgpt', 'claude', 'midjourney', 'role', 'template', 'optimizer'],
  },
  studentSuite: {
    id: 'studentSuite',
    name: 'Student Tools Suite',
    category: 'Student Tools',
    categoryId: 'studentTools',
    description: 'GPA Calculator, Pomodoro Timer, Word Counter & Citation Generator for students.',
    aliases: ['student', 'gpa', 'pomodoro', 'study'],
    keywords: ['student', 'gpa', 'cgpa', 'pomodoro', 'timer', 'word count', 'citation', 'study'],
  },
  textCaseConverter: {
    id: 'textCaseConverter',
    name: 'Text Utilities',
    category: 'Text Utilities',
    categoryId: 'textUtilities',
    description: 'Text Case Converter, Word Counter, Lorem Ipsum Generator, Password Generator.',
    aliases: ['text', 'case converter', 'word counter', 'lorem ipsum', 'password'],
    keywords: ['text', 'case', 'uppercase', 'lowercase', 'word count', 'lorem', 'password generator'],
  },
  medicalTools: {
    id: 'medicalTools',
    name: 'Medical Tools',
    category: 'Medical Tools',
    categoryId: 'mbbsTools',
    description: 'Cardiology, Nephrology, Biochemistry & Clinical Pharmacology calculators with real-time clinical interpretation.',
    aliases: ['medical', 'mbbs', 'cardiology', 'nephrology', 'calculator'],
    keywords: ['medical', 'mbbs', 'cardiology', 'nephrology', 'biochemistry', 'pharmacology', 'egfr', 'bmi', 'dose'],
  },
  unitConverterSuite: {
    id: 'unitConverterSuite',
    name: 'Comprehensive Unit Converter Suite',
    category: 'Unit Converters',
    categoryId: 'unitConverters',
    description: 'A comprehensive collection of unit conversion tools for various fields, processed entirely client-side.',
    aliases: ['converter', 'unit', 'length', 'mass', 'temperature', 'volume'],
    keywords: ['converter', 'unit', 'length', 'mass', 'weight', 'temperature', 'volume', 'speed', 'pressure'],
  },
  codeUtilities: {
    id: 'codeUtilities',
    name: 'Code Utilities Suite',
    category: 'Code Utilities',
    categoryId: 'codeUtilities',
    description: 'A complete suite of developer tools: JSON, JWT, Regex, Base64, and language flashcards.',
    aliases: ['code', 'developer', 'json', 'jwt', 'regex', 'base64'],
    keywords: ['code', 'developer', 'json', 'jwt', 'regex', 'base64', 'uuid', 'timestamp', 'color'],
  },
  seoSuite: {
    id: 'seoSuite',
    name: 'SEO & Marketing Tools Suite',
    category: 'SEO Tools',
    categoryId: 'seoTools',
    description: 'Meta Tag Generator, OG Preview, Keyword Density Analyzer, Slug Generator & Sitemap Builder.',
    aliases: ['seo', 'meta', 'marketing', 'slug', 'sitemap'],
    keywords: ['seo', 'meta', 'tags', 'open graph', 'slug', 'sitemap', 'keyword', 'density'],
  },
};

// Individual tools for global search - PDF tools
const pdfTools: ToolDef[] = [
  { id: 'pdf-merge', name: 'PDF Merge', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Combine multiple PDF files into one document.', aliases: ['merge pdf', 'combine pdf', 'join pdf'], keywords: ['merge', 'combine', 'join', 'multiple'] },
  { id: 'pdf-split', name: 'PDF Split', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Split a PDF into individual pages.', aliases: ['split pdf', 'extract pages', 'separate pdf'], keywords: ['split', 'separate', 'pages', 'extract'] },
  { id: 'pdf-compress', name: 'PDF Compress', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Reduce PDF file size while maintaining quality.', aliases: ['compress pdf', 'shrink pdf', 'reduce pdf'], keywords: ['compress', 'shrink', 'reduce', 'optimize', 'size'] },
  { id: 'pdf-ocr', name: 'PDF OCR', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Extract text from PDF files using OCR.', aliases: ['ocr pdf', 'extract text', 'pdf to text'], keywords: ['ocr', 'text', 'extract', 'read'] },
  { id: 'pdf-rotate', name: 'PDF Rotate', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Rotate PDF pages to the correct orientation.', aliases: ['rotate pdf', 'flip pdf', 'orientation'], keywords: ['rotate', 'flip', 'orientation', 'turn'] },
  { id: 'pdf-watermark', name: 'PDF Watermark', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Add text or image watermarks to PDFs.', aliases: ['watermark pdf', 'stamp pdf', 'protect pdf'], keywords: ['watermark', 'stamp', 'protect', 'mark'] },
  { id: 'pdf-unlock', name: 'PDF Unlock', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Remove password protection from PDFs.', aliases: ['unlock pdf', 'remove password', 'decrypt pdf'], keywords: ['unlock', 'password', 'decrypt', 'remove protection'] },
  { id: 'pdf-protect', name: 'PDF Protect', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Add password protection to PDF files.', aliases: ['protect pdf', 'encrypt pdf', 'password pdf'], keywords: ['protect', 'encrypt', 'password', 'secure'] },
  { id: 'pdf-sign', name: 'PDF Sign', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Add digital signatures to PDF documents.', aliases: ['sign pdf', 'signature', 'digital sign'], keywords: ['sign', 'signature', 'digital', 'esign'] },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Convert JPG/PNG images to PDF format.', aliases: ['image to pdf', 'photo to pdf', 'png to pdf'], keywords: ['jpg', 'png', 'image', 'convert'] },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Convert PDF pages to JPG images.', aliases: ['pdf to image', 'pdf to png', 'extract images'], keywords: ['jpg', 'png', 'image', 'convert'] },
  { id: 'pdf-summarize', name: 'PDF AI Summarizer', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Get AI-powered summaries of PDF documents.', aliases: ['summarize pdf', 'pdf summary', 'ai pdf'], keywords: ['summarize', 'summary', 'ai', 'extract'] },
  { id: 'pdf-remove', name: 'Remove PDF Pages', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Delete unwanted pages from a PDF.', aliases: ['remove pages', 'delete pages', 'cut pdf'], keywords: ['remove', 'delete', 'pages', 'cut'] },
  { id: 'pdf-extract', name: 'Extract PDF Pages', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Extract specific pages from a PDF.', aliases: ['extract pages', 'pull pages', 'pdf extract'], keywords: ['extract', 'pull', 'pages', 'select'] },
  { id: 'pdf-organize', name: 'Organize PDF Pages', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Reorder and organize pages in a PDF.', aliases: ['organize pdf', 'reorder pages', 'arrange pdf'], keywords: ['organize', 'reorder', 'arrange', 'pages'] },
  { id: 'pdf-sort', name: 'Sort PDF Pages', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Sort pages in a PDF document.', aliases: ['sort pdf', 'reorder pdf', 'page order'], keywords: ['sort', 'order', 'reorder', 'pages'] },
  { id: 'pdf-repair', name: 'Repair PDF', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Fix corrupted or damaged PDF files.', aliases: ['repair pdf', 'fix pdf', 'restore pdf'], keywords: ['repair', 'fix', 'restore', 'corrupt', 'damaged'] },
  { id: 'pdf-flatten', name: 'Flatten PDF Forms', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Flatten form fields into static content.', aliases: ['flatten pdf', 'flatten forms', 'static pdf'], keywords: ['flatten', 'forms', 'static', 'fields'] },
  { id: 'pdf-pdfa', name: 'PDF to PDF/A', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Convert PDF to archival PDF/A standard.', aliases: ['pdfa', 'pdf/a', 'archival pdf'], keywords: ['pdfa', 'pdf/a', 'archival', 'archive', 'iso'] },
  { id: 'pdf-crop', name: 'Crop PDF', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Crop or trim PDF page margins.', aliases: ['crop pdf', 'trim pdf', 'pdf margins'], keywords: ['crop', 'trim', 'margins', 'cut'] },
  { id: 'pdf-fill', name: 'Fill PDF Forms', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Fill in PDF form fields.', aliases: ['fill pdf', 'fill forms', 'pdf forms'], keywords: ['fill', 'forms', 'fields', 'acroform'] },
  { id: 'pdf-redact', name: 'Redact PDF', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Permanently redact sensitive content in PDFs.', aliases: ['redact pdf', 'blackout pdf', 'censor pdf'], keywords: ['redact', 'blackout', 'censor', 'hide', 'sensitive'] },
  { id: 'pdf-compare', name: 'Compare PDFs', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Compare two PDF documents for differences.', aliases: ['compare pdf', 'pdf diff', 'pdf difference'], keywords: ['compare', 'diff', 'difference', 'contrast'] },
  { id: 'pdf-translate', name: 'Translate PDF', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Translate PDF text to 12+ languages.', aliases: ['translate pdf', 'pdf translation', 'pdf language'], keywords: ['translate', 'translation', 'language', 'spanish', 'french', 'german'] },
  { id: 'pdf-pagenums', name: 'Add Page Numbers', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Add page numbers to PDF documents.', aliases: ['page numbers', 'number pages', 'pdf numbering'], keywords: ['page', 'numbers', 'numbering', 'paginate'] },
  { id: 'word-to-pdf', name: 'Word to PDF', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Convert Word documents to PDF.', aliases: ['word to pdf', 'doc to pdf', 'docx to pdf'], keywords: ['word', 'doc', 'docx', 'convert'] },
  { id: 'ppt-to-pdf', name: 'PPT to PDF', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Convert PowerPoint to PDF.', aliases: ['ppt to pdf', 'powerpoint to pdf', 'pptx to pdf'], keywords: ['ppt', 'powerpoint', 'pptx', 'convert'] },
  { id: 'excel-to-pdf', name: 'Excel to PDF', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Convert Excel spreadsheets to PDF.', aliases: ['excel to pdf', 'xls to pdf', 'csv to pdf'], keywords: ['excel', 'xls', 'csv', 'convert'] },
  { id: 'html-to-pdf', name: 'HTML to PDF', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Convert HTML files to PDF.', aliases: ['html to pdf', 'webpage to pdf'], keywords: ['html', 'webpage', 'convert'] },
  { id: 'txt-to-pdf', name: 'TXT to PDF', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Convert text files to PDF.', aliases: ['txt to pdf', 'text to pdf'], keywords: ['txt', 'text', 'convert'] },
  { id: 'pdf-to-word', name: 'PDF to Word', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Convert PDF to editable Word text.', aliases: ['pdf to word', 'pdf to doc', 'pdf to text'], keywords: ['word', 'doc', 'text', 'convert'] },
  { id: 'pdf-to-txt', name: 'PDF to TXT', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Extract text from PDF to a TXT file.', aliases: ['pdf to txt', 'pdf to text', 'extract text'], keywords: ['txt', 'text', 'extract', 'convert'] },
  { id: 'pdf-to-html', name: 'PDF to HTML', category: 'PDF Tools', categoryId: 'pdfTools', description: 'Convert PDF to HTML format.', aliases: ['pdf to html', 'pdf to webpage'], keywords: ['html', 'webpage', 'convert'] },
];

// Individual tools for global search - Image tools
const imageTools: ToolDef[] = [
  { id: 'img-convert', name: 'Image Converter', category: 'Image Tools', categoryId: 'imageTools', description: 'Convert between JPG, PNG, WebP formats.', aliases: ['convert image', 'jpg to png', 'png to webp'], keywords: ['convert', 'jpg', 'png', 'webp', 'format'] },
  { id: 'img-resize', name: 'Image Resizer', category: 'Image Tools', categoryId: 'imageTools', description: 'Resize images to exact dimensions.', aliases: ['resize image', 'scale image', 'image dimensions'], keywords: ['resize', 'scale', 'dimensions', 'size', 'width', 'height'] },
  { id: 'img-crop', name: 'Image Cropper', category: 'Image Tools', categoryId: 'imageTools', description: 'Crop images with custom or preset ratios.', aliases: ['crop image', 'image crop', 'aspect ratio'], keywords: ['crop', 'aspect ratio', '1:1', '16:9', '4:3'] },
  { id: 'img-filter', name: 'Image Filters', category: 'Image Tools', categoryId: 'imageTools', description: 'Apply filters: brightness, contrast, saturation, grayscale, sepia, blur.', aliases: ['filter image', 'photo filters', 'image effects'], keywords: ['filter', 'brightness', 'contrast', 'saturation', 'grayscale', 'sepia', 'blur'] },
  { id: 'img-color', name: 'Color Picker', category: 'Image Tools', categoryId: 'imageTools', description: 'Extract HEX/RGB color codes from any image.', aliases: ['color picker', 'eyedropper', 'color extractor'], keywords: ['color', 'hex', 'rgb', 'picker', 'eyedropper'] },
  { id: 'img-bgremove', name: 'Background Remover', category: 'Image Tools', categoryId: 'imageTools', description: 'AI-powered background removal from images.', aliases: ['remove background', 'bg remover', 'transparent background', 'ai background'], keywords: ['background', 'remove', 'transparent', 'ai', 'chroma key'] },
];

// Individual tools for global search - AI Prompt tools
const promptTools: ToolDef[] = [
  { id: 'prompt-builder', name: 'Prompt Builder', category: 'AI Prompt Tools', categoryId: 'aiPromptTools', description: 'Build structured prompts with variables and templates.', aliases: ['prompt builder', 'create prompt', 'prompt maker'], keywords: ['builder', 'create', 'structure', 'variables'] },
  { id: 'prompt-role', name: 'Role Generator', category: 'AI Prompt Tools', categoryId: 'aiPromptTools', description: 'Generate expert role-based system prompts.', aliases: ['role generator', 'system prompt', 'expert prompt'], keywords: ['role', 'system', 'expert', 'persona'] },
  { id: 'prompt-templates', name: 'Template Library', category: 'AI Prompt Tools', categoryId: 'aiPromptTools', description: 'Browse 100+ ready-to-use prompt templates.', aliases: ['prompt templates', 'prompt library', 'prompt examples'], keywords: ['templates', 'library', 'examples', 'ready-made'] },
  { id: 'prompt-optimizer', name: 'Prompt Optimizer', category: 'AI Prompt Tools', categoryId: 'aiPromptTools', description: 'Optimize and improve your prompts for better results.', aliases: ['optimize prompt', 'prompt improver', 'prompt enhancer'], keywords: ['optimize', 'improve', 'enhance', 'refine'] },
];

// Individual tools for global search - Student tools
const studentTools: ToolDef[] = [
  { id: 'gpa-calc', name: 'GPA Calculator', category: 'Student Tools', categoryId: 'studentTools', description: 'Calculate GPA and CGPA with grade points.', aliases: ['gpa', 'cgpa', 'grade calculator'], keywords: ['gpa', 'cgpa', 'grade', 'calculate'] },
  { id: 'pomodoro', name: 'Pomodoro Timer', category: 'Student Tools', categoryId: 'studentTools', description: 'Focus timer with work/break intervals.', aliases: ['pomodoro', 'focus timer', 'study timer'], keywords: ['pomodoro', 'timer', 'focus', 'study', 'concentration'] },
  { id: 'word-count', name: 'Word Counter', category: 'Student Tools', categoryId: 'studentTools', description: 'Count words, characters, sentences, and paragraphs.', aliases: ['word count', 'character count', 'text stats'], keywords: ['word', 'character', 'count', 'text', 'statistics'] },
  { id: 'citation', name: 'Citation Generator', category: 'Student Tools', categoryId: 'studentTools', description: 'Generate citations in APA, MLA, Chicago formats.', aliases: ['citation', 'bibliography', 'reference'], keywords: ['citation', 'apa', 'mla', 'chicago', 'bibliography', 'reference'] },
];

// Individual tools for global search - Medical tools
const medicalTools: ToolDef[] = [
  { id: 'med-bmi', name: 'BMI Calculator', category: 'Medical Tools', categoryId: 'mbbsTools', description: 'Calculate Body Mass Index with category.', aliases: ['bmi', 'body mass index', 'weight calculator'], keywords: ['bmi', 'body mass', 'weight', 'height'] },
  { id: 'med-egfr', name: 'eGFR Calculator', category: 'Medical Tools', categoryId: 'mbbsTools', description: 'Estimate Glomerular Filtration Rate.', aliases: ['egfr', 'kidney function', 'renal'], keywords: ['egfr', 'kidney', 'renal', 'creatinine'] },
  { id: 'med-dose', name: 'Drug Dose Calculator', category: 'Medical Tools', categoryId: 'mbbsTools', description: 'Calculate medication dosages by weight.', aliases: ['dose calculator', 'medication dose', 'drug dose'], keywords: ['dose', 'medication', 'drug', 'weight-based'] },
  { id: 'med-abi', name: 'ABI Calculator', category: 'Medical Tools', categoryId: 'mbbsTools', description: 'Ankle-Brachial Index for peripheral artery disease.', aliases: ['abi', 'ankle brachial', 'vascular'], keywords: ['abi', 'ankle', 'brachial', 'vascular', 'pad'] },
];

// Individual tools for global search - Unit converters
const converterTools: ToolDef[] = [
  { id: 'conv-length', name: 'Length Converter', category: 'Unit Converters', categoryId: 'unitConverters', description: 'Convert meters, feet, inches, kilometers, miles.', aliases: ['length', 'distance', 'meter', 'feet', 'inch'], keywords: ['length', 'meter', 'feet', 'inch', 'kilometer', 'mile'] },
  { id: 'conv-mass', name: 'Mass Converter', category: 'Unit Converters', categoryId: 'unitConverters', description: 'Convert kilograms, pounds, grams, ounces.', aliases: ['mass', 'weight', 'kg', 'pound', 'gram'], keywords: ['mass', 'weight', 'kilogram', 'pound', 'gram', 'ounce'] },
  { id: 'conv-temp', name: 'Temperature Converter', category: 'Unit Converters', categoryId: 'unitConverters', description: 'Convert Celsius, Fahrenheit, Kelvin.', aliases: ['temperature', 'celsius', 'fahrenheit', 'kelvin'], keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'heat'] },
  { id: 'conv-volume', name: 'Volume Converter', category: 'Unit Converters', categoryId: 'unitConverters', description: 'Convert liters, gallons, milliliters, cups.', aliases: ['volume', 'liter', 'gallon', 'ml'], keywords: ['volume', 'liter', 'gallon', 'milliliter', 'cup'] },
  { id: 'conv-speed', name: 'Speed Converter', category: 'Unit Converters', categoryId: 'unitConverters', description: 'Convert km/h, mph, m/s, knots.', aliases: ['speed', 'velocity', 'km/h', 'mph'], keywords: ['speed', 'velocity', 'kmh', 'mph', 'knot'] },
  { id: 'conv-pressure', name: 'Pressure Converter', category: 'Unit Converters', categoryId: 'unitConverters', description: 'Convert Pascal, Bar, PSI, mmHg.', aliases: ['pressure', 'pascal', 'bar', 'psi'], keywords: ['pressure', 'pascal', 'bar', 'psi', 'mmhg'] },
];

// Individual tools for global search - Code utilities
const codeTools: ToolDef[] = [
  { id: 'code-json', name: 'JSON Formatter', category: 'Code Utilities', categoryId: 'codeUtilities', description: 'Format, validate, and beautify JSON data.', aliases: ['json', 'json formatter', 'json validator'], keywords: ['json', 'format', 'validate', 'parse', 'beautify'] },
  { id: 'code-jwt', name: 'JWT Decoder', category: 'Code Utilities', categoryId: 'codeUtilities', description: 'Decode and inspect JWT tokens.', aliases: ['jwt', 'jwt decoder', 'token decoder'], keywords: ['jwt', 'token', 'decode', 'inspect'] },
  { id: 'code-regex', name: 'Regex Tester', category: 'Code Utilities', categoryId: 'codeUtilities', description: 'Test and debug regular expressions.', aliases: ['regex', 'regular expression', 'regex tester'], keywords: ['regex', 'regular expression', 'pattern', 'match'] },
  { id: 'code-base64', name: 'Base64 Converter', category: 'Code Utilities', categoryId: 'codeUtilities', description: 'Encode and decode Base64 strings.', aliases: ['base64', 'encode', 'decode'], keywords: ['base64', 'encode', 'decode', 'convert'] },
  { id: 'code-uuid', name: 'UUID Generator', category: 'Code Utilities', categoryId: 'codeUtilities', description: 'Generate random UUID/GUID identifiers.', aliases: ['uuid', 'guid', 'unique id'], keywords: ['uuid', 'guid', 'unique', 'identifier', 'random'] },
  { id: 'code-timestamp', name: 'Timestamp Converter', category: 'Code Utilities', categoryId: 'codeUtilities', description: 'Convert between Unix timestamps and dates.', aliases: ['timestamp', 'unix time', 'epoch'], keywords: ['timestamp', 'unix', 'epoch', 'date', 'time'] },
];

// Individual tools for global search - Text utilities
const textTools: ToolDef[] = [
  { id: 'text-case', name: 'Case Converter', category: 'Text Utilities', categoryId: 'textUtilities', description: 'Convert text between uppercase, lowercase, title case, camelCase.', aliases: ['case converter', 'uppercase', 'lowercase', 'title case'], keywords: ['case', 'uppercase', 'lowercase', 'title', 'camelcase', 'snake_case'] },
  { id: 'text-lorem', name: 'Lorem Ipsum Generator', category: 'Text Utilities', categoryId: 'textUtilities', description: 'Generate placeholder text for designs.', aliases: ['lorem ipsum', 'placeholder text', 'dummy text'], keywords: ['lorem', 'ipsum', 'placeholder', 'dummy', 'text'] },
  { id: 'text-password', name: 'Password Generator', category: 'Text Utilities', categoryId: 'textUtilities', description: 'Generate secure random passwords.', aliases: ['password', 'password generator', 'secure password'], keywords: ['password', 'secure', 'random', 'strong'] },
  { id: 'text-diff', name: 'Text Diff Checker', category: 'Text Utilities', categoryId: 'textUtilities', description: 'Compare two texts and highlight differences.', aliases: ['diff', 'compare text', 'text difference'], keywords: ['diff', 'compare', 'difference', 'text'] },
];

// Individual tools for global search - SEO tools
const seoTools: ToolDef[] = [
  { id: 'seo-meta', name: 'Meta Tag Generator', category: 'SEO Tools', categoryId: 'seoTools', description: 'Generate SEO-friendly meta tags for websites.', aliases: ['meta tags', 'meta generator', 'seo meta'], keywords: ['meta', 'tags', 'seo', 'title', 'description'] },
  { id: 'seo-og', name: 'OG Preview', category: 'SEO Tools', categoryId: 'seoTools', description: 'Preview how links appear on social media.', aliases: ['open graph', 'social preview', 'og tags'], keywords: ['open graph', 'og', 'social', 'preview', 'facebook'] },
  { id: 'seo-slug', name: 'Slug Generator', category: 'SEO Tools', categoryId: 'seoTools', description: 'Create URL-friendly slugs from text.', aliases: ['slug', 'url slug', 'permalink'], keywords: ['slug', 'url', 'permalink', 'friendly'] },
  { id: 'seo-sitemap', name: 'Sitemap Generator', category: 'SEO Tools', categoryId: 'seoTools', description: 'Generate XML sitemaps for websites.', aliases: ['sitemap', 'xml sitemap', 'sitemap generator'], keywords: ['sitemap', 'xml', 'seo', 'index'] },
  { id: 'seo-keyword', name: 'Keyword Density', category: 'SEO Tools', categoryId: 'seoTools', description: 'Analyze keyword frequency in text.', aliases: ['keyword density', 'keyword analysis', 'seo analysis'], keywords: ['keyword', 'density', 'frequency', 'analysis'] },
];

// Combine all individual tools for global search
export const allIndividualTools: ToolDef[] = [
  ...pdfTools,
  ...imageTools,
  ...promptTools,
  ...studentTools,
  ...medicalTools,
  ...converterTools,
  ...codeTools,
  ...textTools,
  ...seoTools,
];

// Flat search index: combines suites + individual tools
export const searchIndex: ToolDef[] = [
  ...Object.values(toolSuites),
  ...allIndividualTools,
];

// Helper: search tools by query
export function searchTools(query: string): ToolDef[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results = searchIndex.filter(tool => {
    const searchable = [
      tool.name,
      tool.description,
      tool.category,
      ...(tool.aliases || []),
      ...(tool.keywords || []),
    ].join(' ').toLowerCase();
    return searchable.includes(q);
  });

  // Sort: exact name match > alias match > keyword match > description match
  // Individual tools are prioritized over suite-level entries
  return results.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const aAlias = (a.aliases || []).some(al => al.toLowerCase() === q);
    const bAlias = (b.aliases || []).some(al => al.toLowerCase() === q);
    const aIsSuite = a.id in toolSuites;
    const bIsSuite = b.id in toolSuites;

    if (aName === q) return -1;
    if (bName === q) return 1;
    if (aName.startsWith(q) && !bName.startsWith(q)) return -1;
    if (bName.startsWith(q) && !aName.startsWith(q)) return 1;
    if (aAlias && !bAlias) return -1;
    if (bAlias && !aAlias) return 1;
    // Prefer individual tools over suites for equal relevance
    if (!aIsSuite && bIsSuite) return -1;
    if (aIsSuite && !bIsSuite) return 1;
    return 0;
  });
}
