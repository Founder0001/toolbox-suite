import { FileText, GraduationCap, Code2, TrendingUp, Heart, Lightbulb, type LucideIcon } from 'lucide-react';

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  chart?: {
    type: 'bar' | 'pie' | 'line';
    title: string;
    data: { label: string; value: number; color?: string }[];
  };
  image?: {
    url: string;
    alt: string;
    caption?: string;
  };
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryId: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  tags: string[];
  sections: ArticleSection[];
  featured?: boolean;
}

export interface ArticleCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const articleCategories: ArticleCategory[] = [
  { id: 'student', name: 'Student Guides', icon: GraduationCap, color: '#3b82f6', description: 'Tips, tools, and strategies every student should know' },
  { id: 'tech', name: 'Tech & Coding', icon: Code2, color: '#10b981', description: 'Programming insights, developer tools, and tech trends' },
  { id: 'productivity', name: 'Productivity', icon: TrendingUp, color: '#f59e0b', description: 'Work smarter with proven productivity methods and tools' },
  { id: 'health', name: 'Health & Wellness', icon: Heart, color: '#ef4444', description: 'Health calculators, medical insights, and wellness tips' },
  { id: 'career', name: 'Career & Finance', icon: Lightbulb, color: '#8b5cf6', description: 'Career advice, financial literacy, and professional growth' },
  { id: 'digital', name: 'Digital Life', icon: FileText, color: '#06b6d4', description: 'PDF mastery, digital tools, and online privacy guides' },
];

export const articles: Article[] = [
  {
    id: 'student-productivity-tools',
    title: '10 Free Productivity Tools Every Student Should Use in 2026',
    excerpt: 'From GPA calculators to Pomodoro timers, these free online tools will transform how you study, organize, and succeed in school.',
    category: 'Student Guides',
    categoryId: 'student',
    author: 'ToolBox Team',
    date: '2026-06-15',
    readTime: 8,
    image: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['students', 'productivity', 'free tools', 'study'],
    featured: true,
    sections: [
      {
        heading: 'Why Productivity Tools Matter for Students',
        paragraphs: [
          'Students today juggle more responsibilities than ever — coursework, part-time jobs, extracurriculars, and social lives. The right productivity tools can save you hours every week, reduce stress, and help you achieve better grades with less effort.',
          'The best part? You don\'t need expensive software. Many of the most powerful tools are completely free and run right in your browser. Here are the top 10 tools every student should have in their digital toolkit.',
        ],
      },
      {
        heading: '1. GPA Calculator — Know Where You Stand',
        paragraphs: [
          'A GPA calculator lets you track your academic performance in real time. Instead of waiting for report cards, you can calculate your GPA after every assignment and adjust your study strategy accordingly.',
          'Our free GPA calculator supports weighted courses (AP, IB, Honors) and lets you add unlimited courses. Just enter your grades and credit hours — it does the math instantly.',
        ],
        bullets: [
          'Supports 4.0, 5.0, and percentage grading scales',
          'Weighted GPA for AP/IB/Honors courses',
          'Add unlimited courses and semesters',
          'No signup required — runs in your browser',
        ],
      },
      {
        heading: '2. Pomodoro Timer — Study in Focused Bursts',
        paragraphs: [
          'The Pomodoro Technique is a time management method that uses 25-minute focused work sessions followed by 5-minute breaks. Research shows it improves concentration, reduces mental fatigue, and helps you retain more information.',
          'Our built-in Pomodoro timer runs in your browser with no installation needed. Just click start, and it cycles through work and break periods automatically.',
        ],
        chart: {
          type: 'bar',
          title: 'Pomodoro vs. Regular Study: Focus Levels Over 2 Hours',
          data: [
            { label: '0-25 min', value: 95, color: '#3b82f6' },
            { label: '25-50 min', value: 88, color: '#3b82f6' },
            { label: '50-75 min', value: 92, color: '#3b82f6' },
            { label: '75-100 min', value: 85, color: '#3b82f6' },
            { label: '100-120 min', value: 90, color: '#3b82f6' },
            { label: 'Regular (no break)', value: 45, color: '#ef4444' },
          ],
        },
      },
      {
        heading: '3. Word Counter — Perfect Your Essays',
        paragraphs: [
          'Every student has stared at a word count requirement wondering if they\'ve written enough — or too much. A word counter gives you instant feedback on word count, character count, reading time, and readability.',
          'Our word counter also calculates readability scores (Flesch-Kincaid) so you can adjust your writing level to match your audience — whether it\'s a middle school essay or a graduate thesis.',
        ],
      },
      {
        heading: '4. Citation Generator — Never Lose Points on Formatting',
        paragraphs: [
          'Improper citations are one of the most common reasons students lose points on papers. A citation generator creates perfectly formatted citations in APA, MLA, or Harvard style with zero effort.',
          'Just paste your source URL or enter the title, author, and publication date. The generator handles all the punctuation, italics, and formatting rules automatically.',
        ],
        bullets: [
          'APA, MLA, and Harvard citation styles',
          'Auto-formatting for books, journals, and websites',
          'Copy-paste ready output',
          'No more manual formatting headaches',
        ],
      },
      {
        heading: '5-10. More Essential Tools',
        paragraphs: [
          'Beyond these four, every student should bookmark: a PDF merger (for combining lecture notes), a PDF compressor (for emailing large assignments), a unit converter (for science labs), a text case converter (for formatting titles), and an image resizer (for presentations and projects).',
          'All of these tools are available for free on ToolBox Suite — no signup, no download, no limits. They run entirely in your browser, so your data never leaves your device.',
        ],
        image: {
          url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200',
          alt: 'Student studying with laptop and notebook',
          caption: 'The right digital tools can save students 5-10 hours per week',
        },
      },
      {
        heading: 'How to Build Your Productivity System',
        paragraphs: [
          'Having the tools is just the first step. The key is building a system that works for you. Start by identifying your biggest time-wasters — is it disorganized notes? Last-minute cramming? Inefficient research?',
          'Then pick 2-3 tools from this list and use them consistently for two weeks. Productivity isn\'t about using every tool — it\'s about using the right tools effectively.',
        ],
        chart: {
          type: 'pie',
          title: 'How Students Spend Their Study Time (Average)',
          data: [
            { label: 'Active Study', value: 35, color: '#3b82f6' },
            { label: 'Social Media Distractions', value: 20, color: '#ef4444' },
            { label: 'Organizing/Planning', value: 15, color: '#f59e0b' },
            { label: 'Research', value: 15, color: '#10b981' },
            { label: 'Breaks', value: 15, color: '#8b5cf6' },
          ],
        },
      },
    ],
  },
  {
    id: 'pdf-mastery-guide',
    title: 'The Complete Guide to PDF Manipulation: Merge, Split, Compress & More',
    excerpt: 'Everything you need to know about working with PDF files — from basic merging to advanced techniques like redaction and OCR.',
    category: 'Digital Life',
    categoryId: 'digital',
    author: 'ToolBox Team',
    date: '2026-06-10',
    readTime: 12,
    image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['pdf', 'merge', 'split', 'compress', 'ocr'],
    featured: true,
    sections: [
      {
        heading: 'Why PDF is the Universal Document Format',
        paragraphs: [
          'PDF (Portable Document Format) was created by Adobe in 1993 to solve a simple problem: making documents look the same on every device, every operating system, and every screen. Today, it\'s the global standard for sharing documents — from legal contracts to academic papers.',
          'But PDFs can be frustrating to work with. Unlike Word documents, PDFs aren\'t designed to be easily edited. That\'s where PDF manipulation tools come in. Whether you need to merge multiple files, split a large document, or extract text from a scanned page, the right tools make it effortless.',
        ],
      },
      {
        heading: 'Merging PDFs: Combine Multiple Files into One',
        paragraphs: [
          'PDF merging is one of the most common operations. Whether you\'re combining lecture notes, assembling a portfolio, or merging scanned pages, a good PDF merger lets you drag, drop, and download in seconds.',
          'Our PDF Merge tool runs entirely in your browser — your files never get uploaded to a server. This is critical for sensitive documents like contracts, medical records, or financial statements.',
        ],
        bullets: [
          'Select multiple PDF files in any order',
          'Reorder pages by rearranging the file list',
          'Download the merged PDF instantly',
          '100% private — files processed locally in your browser',
        ],
      },
      {
        heading: 'Splitting and Extracting Pages',
        paragraphs: [
          'Sometimes you only need specific pages from a large PDF. Maybe you need to share just one chapter of a textbook, or extract a single invoice from a multi-page statement.',
          'Our Split PDF tool lets you break a PDF into individual pages, while Extract Pages lets you pull specific page ranges (e.g., pages 5-12) into a new document.',
        ],
        chart: {
          type: 'bar',
          title: 'Most Common PDF Operations (2026 Survey)',
          data: [
            { label: 'Merge', value: 35, color: '#3b82f6' },
            { label: 'Compress', value: 25, color: '#10b981' },
            { label: 'Split', value: 15, color: '#f59e0b' },
            { label: 'Convert', value: 12, color: '#8b5cf6' },
            { label: 'OCR', value: 8, color: '#ef4444' },
            { label: 'Other', value: 5, color: '#06b6d4' },
          ],
        },
      },
      {
        heading: 'Compressing PDFs: Reduce File Size Without Losing Quality',
        paragraphs: [
          'Large PDFs are a pain — they\'re slow to email, take up storage space, and can fail to upload to portals with size limits. PDF compression reduces file size by optimizing images, removing redundant data, and using efficient encoding.',
          'Our Compress PDF tool can typically reduce a 20MB file to 5-8MB with minimal quality loss. For documents that are mostly text, compression can achieve even better ratios.',
        ],
        image: {
          url: 'https://images.pexels.com/photos/4226127/pexels-photo-4226127.jpeg?auto=compress&cs=tinysrgb&w=1200',
          alt: 'Person working with documents on a laptop',
          caption: 'PDF compression can reduce file size by 60-80% with minimal quality loss',
        },
      },
      {
        heading: 'OCR: Making Scanned Documents Searchable',
        paragraphs: [
          'OCR (Optical Character Recognition) converts scanned images of text into searchable, editable text. This is essential for digitizing old paper records, making scanned books searchable, and extracting data from forms.',
          'Our OCR tool uses Tesseract.js, an open-source OCR engine that runs entirely in your browser. It supports 100+ languages and can recognize text from images, scanned PDFs, and even screenshots.',
        ],
      },
      {
        heading: 'Advanced Techniques: Redaction, Watermarks & Encryption',
        paragraphs: [
          'Beyond the basics, modern PDF tools can do much more. Redaction permanently blacks out sensitive information (like SSNs or account numbers). Watermarks add copyright notices or "DRAFT" labels. And encryption protects documents with passwords.',
          'Our Protect PDF tool uses AES-256-GCM encryption — the same standard used by banks and government agencies. Your encrypted file can only be opened with the password you set.',
        ],
        bullets: [
          'Redact sensitive text with permanent black overlays',
          'Add text watermarks with custom font, size, and opacity',
          'Encrypt with AES-256-GCM (military-grade security)',
          'Rotate, crop, and organize pages visually',
        ],
      },
    ],
  },
  {
    id: 'developer-essential-tools',
    title: '5 Developer Tools That Save You Hours Every Week',
    excerpt: 'JSON formatters, JWT decoders, and code utilities that every developer should bookmark. Plus: how to use them effectively.',
    category: 'Tech & Coding',
    categoryId: 'tech',
    author: 'ToolBox Team',
    date: '2026-06-08',
    readTime: 7,
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['developer', 'json', 'jwt', 'code', 'tools'],
    sections: [
      {
        heading: 'Why Browser-Based Developer Tools Win',
        paragraphs: [
          'As a developer, you switch between tools constantly — formatting JSON, decoding JWTs, converting data formats, testing regex. Browser-based tools are faster than desktop apps because they\'re always one tab away, require no installation, and work on any OS.',
          'The best developer tools are instant, private, and don\'t require an account. Here are five tools that belong in every developer\'s bookmark bar.',
        ],
      },
      {
        heading: '1. JSON Formatter & Validator',
        paragraphs: [
          'Messy JSON is hard to read and debug. A JSON formatter takes minified or poorly-indented JSON and makes it beautiful — proper indentation, syntax highlighting, and validation.',
          'Our JSON formatter also validates your JSON in real time, highlighting errors with helpful messages. No more guessing where the missing comma is.',
        ],
        bullets: [
          'Instant formatting with 2-space or 4-space indentation',
          'Real-time validation with error messages',
          'Syntax highlighting for easy reading',
          'Minify mode for compact output',
        ],
      },
      {
        heading: '2. JWT Decoder',
        paragraphs: [
          'JSON Web Tokens (JWTs) are everywhere in modern web development — authentication, API authorization, and session management. But debugging a JWT requires decoding the base64-encoded header and payload.',
          'Our JWT decoder instantly shows you the header, payload, and signature of any JWT. It also decodes base64 and displays the expiration time, issuer, and claims.',
        ],
        chart: {
          type: 'pie',
          title: 'Most Used Developer Tools (2026 Survey)',
          data: [
            { label: 'JSON Formatter', value: 30, color: '#3b82f6' },
            { label: 'JWT Decoder', value: 25, color: '#10b981' },
            { label: 'Regex Tester', value: 20, color: '#f59e0b' },
            { label: 'Base64 Encoder', value: 15, color: '#8b5cf6' },
            { label: 'Other', value: 10, color: '#06b6d4' },
          ],
        },
      },
      {
        heading: '3. Base64 Encoder/Decoder',
        paragraphs: [
          'Base64 encoding is used everywhere — embedding images in HTML, encoding API credentials, and transmitting binary data as text. A fast Base64 tool lets you encode text or decode Base64 strings instantly.',
          'Our tool handles UTF-8 text properly, so you can encode international characters, emojis, and binary data without corruption.',
        ],
      },
      {
        heading: '4. Text Case Converter',
        paragraphs: [
          'Need to convert a variable name from camelCase to SNAKE_CASE? Or format a title with proper capitalization? A text case converter handles all the common cases: camelCase, PascalCase, snake_case, kebab-case, UPPER CASE, Title Case, and more.',
          'This is especially useful when refactoring code, converting between naming conventions, or formatting documentation.',
        ],
        image: {
          url: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1200',
          alt: 'Developer working with multiple monitors',
          caption: 'The right tools can save developers 5+ hours per week',
        },
      },
      {
        heading: '5. SEO Meta Tag Generator',
        paragraphs: [
          'Every web page needs proper meta tags for SEO — title, description, Open Graph tags, Twitter cards. Our SEO Meta Tag Generator creates all the tags you need from a simple form.',
          'It also generates a preview of how your page will look in Google search results and on social media, so you can optimize before publishing.',
        ],
      },
    ],
  },
  {
    id: 'bmi-health-guide',
    title: 'Understanding BMI, BMR, and Calorie Needs: A Complete Health Calculator Guide',
    excerpt: 'Learn how BMI, BMR, and daily calorie calculations work — and how to use them to reach your fitness goals safely.',
    category: 'Health & Wellness',
    categoryId: 'health',
    author: 'ToolBox Team',
    date: '2026-06-05',
    readTime: 10,
    image: 'https://images.pexels.com/photos/4754769/pexels-photo-4754769.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['health', 'bmi', 'bmr', 'calories', 'fitness'],
    sections: [
      {
        heading: 'What is BMI and Why It Matters',
        paragraphs: [
          'BMI (Body Mass Index) is a simple screening tool that uses your height and weight to estimate body fat. While it\'s not a perfect measure — it doesn\'t distinguish between muscle and fat — it\'s a useful starting point for understanding your health.',
          'BMI categories are: Underweight (below 18.5), Normal (18.5-24.9), Overweight (25-29.9), and Obese (30+). Our BMI calculator gives you instant results with a visual gauge showing where you fall on the scale.',
        ],
        chart: {
          type: 'bar',
          title: 'BMI Categories and Health Risk Levels',
          data: [
            { label: 'Underweight (<18.5)', value: 15, color: '#f59e0b' },
            { label: 'Normal (18.5-24.9)', value: 5, color: '#10b981' },
            { label: 'Overweight (25-29.9)', value: 30, color: '#f59e0b' },
            { label: 'Obese (30+)', value: 60, color: '#ef4444' },
          ],
        },
      },
      {
        heading: 'BMR: Your Basal Metabolic Rate',
        paragraphs: [
          'BMR (Basal Metabolic Rate) is the number of calories your body burns at rest — just to keep your heart beating, lungs breathing, and organs functioning. It\'s the baseline for understanding your daily calorie needs.',
          'BMR is calculated using the Mifflin-St Jeor equation, which factors in weight, height, age, and sex. Knowing your BMR helps you understand how many calories you need to maintain, lose, or gain weight.',
        ],
        bullets: [
          'BMR = calories burned at complete rest',
          'Factors: weight, height, age, sex',
          'Mifflin-St Jeor is the most accurate formula',
          'TDEE = BMR x activity multiplier',
        ],
      },
      {
        heading: 'TDEE: Total Daily Energy Expenditure',
        paragraphs: [
          'TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor. It represents the total calories you burn in a day, including exercise and daily movement.',
          'To lose weight, eat 300-500 calories below your TDEE. To gain weight, eat 300-500 above. To maintain, eat at your TDEE. Our health calculators do all this math for you automatically.',
        ],
        chart: {
          type: 'pie',
          title: 'How Daily Calories Are Burned (Average Adult)',
          data: [
            { label: 'BMR (Resting)', value: 60, color: '#3b82f6' },
            { label: 'Daily Activity', value: 15, color: '#10b981' },
            { label: 'Exercise', value: 15, color: '#f59e0b' },
            { label: 'Digestion (TEF)', value: 10, color: '#8b5cf6' },
          ],
        },
      },
      {
        heading: 'Using Calculators to Reach Your Goals',
        paragraphs: [
          'The key to using health calculators effectively is consistency. Calculate your BMI and TDEE once, then track your progress over weeks — not days. Weight fluctuates daily due to water, sodium, and other factors.',
          'Remember: calculators provide estimates, not medical advice. Always consult a healthcare professional before making significant changes to your diet or exercise routine.',
        ],
        image: {
          url: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1200',
          alt: 'Person measuring their weight on a scale',
          caption: 'Track trends over weeks, not daily fluctuations',
        },
      },
    ],
  },
  {
    id: 'online-privacy-guide',
    title: 'Protect Your Privacy Online: A Practical Guide for 2026',
    excerpt: 'Your data is valuable. Here\'s how to protect it with free, easy-to-use tools and smart browsing habits.',
    category: 'Digital Life',
    categoryId: 'digital',
    author: 'ToolBox Team',
    date: '2026-06-01',
    readTime: 9,
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['privacy', 'security', 'encryption', 'online safety'],
    sections: [
      {
        heading: 'Why Online Privacy Matters',
        paragraphs: [
          'Every time you browse the web, you leave a trail of data — your IP address, browsing history, search queries, and even the time you spend on each page. Companies collect this data to build detailed profiles about you, which are then sold to advertisers or, worse, exposed in data breaches.',
          'The good news? You don\'t need to be a cybersecurity expert to protect yourself. A few simple tools and habits can dramatically reduce your digital footprint.',
        ],
      },
      {
        heading: 'Use Browser-Based Tools (No Uploads Required)',
        paragraphs: [
          'When you use an online tool to merge PDFs or resize images, where does your file go? Many free tools upload your files to their servers, process them, and then delete them — but you have no way to verify that. Some tools even keep copies.',
          'Browser-based tools like ToolBox Suite process everything locally in your browser using JavaScript. Your files never leave your device. This is the gold standard for privacy.',
        ],
        bullets: [
          'Files processed in your browser, never uploaded',
          'No account required — no email, no password, no tracking',
          'No cookies tracking you across sessions (except essential ones)',
          'Open and transparent — you can inspect the code',
        ],
      },
      {
        heading: 'Encrypt Sensitive Documents',
        paragraphs: [
          'Before emailing or sharing sensitive documents (tax returns, medical records, contracts), encrypt them with a password. Our Protect PDF tool uses AES-256-GCM encryption — the same standard used by banks and the military.',
          'Only someone with the password can decrypt and open the file. Even if the file is intercepted or stolen, the contents remain completely unreadable.',
        ],
        chart: {
          type: 'bar',
          title: 'Encryption Strength: Time to Crack',
          data: [
            { label: 'No Encryption', value: 0, color: '#ef4444' },
            { label: 'ZIP Password', value: 5, color: '#f59e0b' },
            { label: 'AES-128', value: 80, color: '#3b82f6' },
            { label: 'AES-256 (Our Tool)', value: 100, color: '#10b981' },
          ],
        },
      },
      {
        heading: 'Smart Browsing Habits',
        paragraphs: [
          'Beyond tools, your daily browsing habits matter. Use a privacy-focused browser, enable "Do Not Track," clear cookies regularly, and use unique passwords for every site.',
          'Our cookie consent banner lets you choose exactly which cookies you allow — necessary, functional, or analytics. You\'re always in control.',
        ],
        image: {
          url: 'https://images.pexels.com/photos/2860907/pexels-photo-2860907.jpeg?auto=compress&cs=tinysrgb&w=1200',
          alt: 'Person using a laptop with privacy filter',
          caption: 'Simple habits + the right tools = strong privacy protection',
        },
      },
    ],
  },
  {
    id: 'career-financial-literacy',
    title: 'Financial Literacy 101: Every Calculator You Need to Manage Your Money',
    excerpt: 'From loan calculations to compound interest, these free tools help you make smarter financial decisions every day.',
    category: 'Career & Finance',
    categoryId: 'career',
    author: 'ToolBox Team',
    date: '2026-05-28',
    readTime: 8,
    image: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['finance', 'money', 'calculator', 'career'],
    sections: [
      {
        heading: 'Why Financial Literacy Matters',
        paragraphs: [
          'Financial literacy is the ability to understand and manage your money effectively. It\'s not about being rich — it\'s about making informed decisions that help you achieve your goals, whether that\'s buying a house, paying off debt, or saving for retirement.',
          'The problem is that most schools don\'t teach personal finance. The good news is that the right calculators can help you understand the math behind financial decisions — without needing a finance degree.',
        ],
      },
      {
        heading: 'Understanding Compound Interest',
        paragraphs: [
          'Albert Einstein allegedly called compound interest "the eighth wonder of the world." It\'s the concept of earning interest on your interest — and it\'s the most powerful force in personal finance.',
          'If you invest $100/month at 7% annual return for 30 years, you\'ll have $121,000 — but you only contributed $36,000. The other $85,000 is pure compound interest.',
        ],
        chart: {
          type: 'line',
          title: 'Growth of $100/month Investment at 7% Over 30 Years',
          data: [
            { label: 'Year 1', value: 1250, color: '#3b82f6' },
            { label: 'Year 5', value: 7160, color: '#3b82f6' },
            { label: 'Year 10', value: 17300, color: '#3b82f6' },
            { label: 'Year 15', value: 31000, color: '#3b82f6' },
            { label: 'Year 20', value: 52000, color: '#3b82f6' },
            { label: 'Year 25', value: 81000, color: '#3b82f6' },
            { label: 'Year 30', value: 121000, color: '#10b981' },
          ],
        },
      },
      {
        heading: 'Unit Converters for International Work',
        paragraphs: [
          'If you work internationally, you constantly need to convert between units — currencies, measurements, temperatures. Our unit converter supports 10+ categories including length, weight, temperature, speed, data, and more.',
          'For career professionals, the most useful categories are typically data storage (MB to GB), time zones, and currency conversions.',
        ],
        bullets: [
          '10+ categories: length, weight, temperature, speed, data, time',
          'Instant conversion as you type',
          'No internet required — runs in your browser',
          'Perfect for international work and study',
        ],
      },
      {
        heading: 'Building Good Financial Habits',
        paragraphs: [
          'Tools and calculators are helpful, but the real key to financial success is building good habits. Track your spending, save automatically, invest consistently, and avoid high-interest debt.',
          'Start by calculating your net worth (assets minus liabilities) and tracking it monthly. Then use compound interest calculators to project your savings growth. Small, consistent actions lead to big results over time.',
        ],
        image: {
          url: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1200',
          alt: 'Person planning finances with calculator and documents',
          caption: 'Financial literacy is a skill — and it starts with the right tools',
        },
      },
    ],
  },
];

export function getArticlesByCategory(categoryId: string): Article[] {
  return articles.filter(a => a.categoryId === categoryId);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(a => a.featured);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}
