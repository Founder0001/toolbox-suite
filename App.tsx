import { useCallback, useEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { ShareSection } from '@/components/ShareSection';
import { SuggestionBox } from '@/components/SuggestionBox';
import { lazy as lazyImport } from 'react';

const ArticlesPage = lazyImport(() => import('@/pages/Articles').then(m => ({ default: m.ArticlesPage })));
import { articles } from '@/data/articles';
import { categories, toolSuites, allIndividualTools, type Category } from '@/data/categories';
import { Target, Zap, Shield, GraduationCap, Clock, ArrowRight } from 'lucide-react';

const TextCaseConverter = lazy(() => import('@/tools/TextTools').then(m => ({ default: m.TextCaseConverter })));
const PromptStudio = lazy(() => import('@/tools/PromptTools').then(m => ({ default: m.PromptStudio })));
const MedicalToolsSuite = lazy(() => import('@/tools/MedicalTools').then(m => ({ default: m.MedicalToolsSuite })));
const UnitConverterSuite = lazy(() => import('@/tools/UnitConverter').then(m => ({ default: m.UnitConverterSuite })));
const CodeUtilitiesTool = lazy(() => import('@/tools/CodeTools').then(m => ({ default: m.CodeUtilitiesTool })));
const StudentToolsSuite = lazy(() => import('@/tools/StudentTools').then(m => ({ default: m.StudentToolsSuite })));
const SeoToolsSuite = lazy(() => import('@/tools/SeoTools').then(m => ({ default: m.SeoToolsSuite })));
const ImageToolsSuite = lazy(() => import('@/tools/ImageTools').then(m => ({ default: m.ImageToolsSuite })));
const PdfToolsSuite = lazy(() => import('@/tools/PdfTools').then(m => ({ default: m.PdfToolsSuite })));

type LegalPage = 'about' | 'contact' | 'privacy' | 'terms' | 'cookie';

// Real, crawlable URL slug for every category suite
const categorySlugMap: Record<string, string> = {
  pdfTools: 'pdf-tools',
  imageTools: 'image-tools',
  aiPromptTools: 'ai-prompt-tools',
  studentTools: 'student-tools',
  mbbsTools: 'medical-tools',
  unitConverters: 'unit-converters',
  codeUtilities: 'code-utilities',
  textUtilities: 'text-utilities',
  seoTools: 'seo-tools',
};
const slugToCategoryId: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugMap).map(([id, slug]) => [slug, id])
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function LegalContent({ page }: { page: LegalPage }) {
  const configs: Record<LegalPage, { title: string; subtitle: string; badge: string; content: React.ReactNode }> = {
    about: {
      title: 'About Us',
      subtitle: 'Learn more about ToolBox and our mission',
      badge: 'Company',
      content: (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="text-4xl mb-4">
              <Target className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              ToolBox was built with a singular vision: to provide students, medical professionals, developers,
              and everyday users with lightning-fast, high-utility web tools that improve daily productivity.
              No installations, no subscriptions, no barriers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { i: <Zap className="w-6 h-6 text-amber-400" />, t: 'Lightning Fast', d: 'All tools run directly in your browser. No server round-trips means instant results.' },
              { i: <Shield className="w-6 h-6 text-emerald-400" />, t: '100% Private', d: 'Your files and data never leave your device. Zero-data-collection policy.' },
              { i: <GraduationCap className="w-6 h-6 text-blue-400" />, t: 'Built for Everyone', d: 'From medical students to developers - ToolBox serves every profession.' },
              { i: <Zap className="w-6 h-6 text-rose-400" />, t: 'Free Forever', d: 'All 100+ tools are completely free. No paywalls, no premium tiers.' },
            ].map(item => (
              <div key={item.t} className="glass-card p-5 rounded-2xl">
                <div className="mb-2">{item.i}</div>
                <h4 className="text-foreground font-bold text-sm mb-1">{item.t}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team',
      badge: 'Support',
      content: (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="text-4xl mb-4">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Support Channel</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Our dedicated support team is committed to providing timely assistance.
            </p>
            <div className="p-4 bg-secondary/30 border border-border/40 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-lg">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Email</div>
                  <div className="text-foreground font-semibold text-sm">support@toolbox-suite.app</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { i: <Zap className="w-5 h-5" />, t: 'Bug Reports', d: 'Found an issue? Report it promptly.' },
              { i: <Target className="w-5 h-5" />, t: 'Feature Requests', d: 'Have an idea? We would love to hear it.' },
              { i: <GraduationCap className="w-5 h-5" />, t: 'Partnerships', d: 'Interested in collaboration? Reach out.' },
            ].map(item => (
              <div key={item.t} className="glass-card p-5 rounded-2xl text-center">
                <div className="mb-2 flex justify-center">{item.i}</div>
                <h4 className="text-foreground font-semibold text-sm mb-1">{item.t}</h4>
                <p className="text-muted-foreground text-xs">{item.d}</p>
              </div>
            ))}
          </div>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
            <p className="text-emerald-600 dark:text-emerald-300 text-xs">
              <strong className="text-foreground">Response Time:</strong> We aim to respond within 24-48 business hours.
            </p>
          </div>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How we protect your data',
      badge: 'Legal',
      content: (
        <div className="space-y-6">
          {[
            { t: '100% Client-Side Processing', d: 'All operations execute entirely within your browser. No files, inputs, or personal data are transmitted to any server.' },
            { t: 'Zero User Data Storage', d: 'We store 0% of user metrics. No accounts, no email collection, no tracking. Every session is anonymous.' },
            { t: 'Secure Cookies Only', d: 'Only first-party cookies for layout preferences. No PII. Expire after 30 days.' },
            { t: 'Third-Party Services', d: 'Essential libraries (PDF-Lib, PDF.js) loaded from CDNs. No Google Analytics, no tracking scripts.' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-5 rounded-2xl">
              <h4 className="text-foreground font-bold text-sm mb-2 flex items-center gap-2">
                <span className="text-emerald-500">&#10003;</span> {item.t}
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.d}</p>
            </div>
          ))}
          <div className="glass-card p-5 rounded-2xl">
            <h4 className="text-foreground font-bold text-sm mb-2 flex items-center gap-2">
              <span className="text-amber-500">!</span> Advertising
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              We may display ads via Google AdSense. You can opt out at{' '}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Ad Settings
              </a>.
            </p>
          </div>
          <p className="text-muted-foreground text-xs text-center">Last updated: June 2026</p>
        </div>
      )
    },
    cookie: {
      title: 'Cookie Policy',
      subtitle: 'How we use cookies',
      badge: 'Legal',
      content: (
        <div className="space-y-6">
          {[
            { t: 'What Are Cookies', d: 'Cookies are small text files stored on your device when you visit a website. They allow the site to remember your actions and preferences over a period of time.' },
            { t: 'Necessary Cookies', d: 'These cookies are essential for the website to function properly. They enable core functionality such as security and accessibility. They cannot be disabled.' },
            { t: 'Functional Cookies', d: 'These cookies remember your preferences such as theme (dark/light mode) and tool settings. They enhance your experience but are not required for the site to work.' },
            { t: 'Analytics Cookies', d: 'These cookies help us understand how visitors interact with our site by collecting anonymous usage data. This information is used to improve the website performance and user experience.' },
            { t: 'No Tracking Cookies', d: 'We do not use third-party tracking cookies, advertising cookies, or cross-site tracking. Your browsing activity is never shared with advertisers.' },
            { t: 'Managing Your Preferences', d: 'You can manage your cookie preferences at any time using the cookie consent banner. Your choices are stored in localStorage and persist across sessions.' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-5 rounded-2xl">
              <h4 className="text-foreground font-bold text-sm mb-2">{item.t}</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.d}</p>
            </div>
          ))}
          <p className="text-muted-foreground text-xs text-center">Last updated: June 2026</p>
        </div>
      )
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Usage guidelines',
      badge: 'Legal',
      content: (
        <div className="space-y-6">
          {[
            { t: '1. Acceptance of Terms', d: 'By using ToolBox, you agree to these Terms and Conditions.' },
            { t: '2. Purpose & Use', d: 'ToolBox provides web-based utilities for educational and productivity purposes. Not a replacement for professional advice.' },
            { t: '3. No Warranty', d: 'ToolBox is provided "as is" without warranties. Users assume full responsibility for results.' },
            { t: '4. Limitation of Liability', d: 'ToolBox shall not be liable for damages arising from use of the platform.' },
            { t: '5. Intellectual Property', d: 'All content and implementations are the property of the ToolBox team.' },
            { t: '6. Modifications', d: 'We reserve the right to modify or discontinue any tool at any time.' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-5 rounded-2xl">
              <h4 className="text-foreground font-bold text-sm mb-2">{item.t}</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.d}</p>
            </div>
          ))}
          <p className="text-muted-foreground text-xs text-center">Last updated: June 2026</p>
        </div>
      )
    }
  };

  const cfg = configs[page];
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">{cfg.title}</h2>
        <p className="text-sm text-muted-foreground">{cfg.subtitle}</p>
      </div>
      {cfg.content}
    </div>
  );
}

function Workspace({ category, toolId, subToolId, onBack }: { category: Category; toolId: string; subToolId?: string; onBack: () => void }) {
  const toolMap: Record<string, { name: string; description: string; category: string }> = {
    pdfSuite: { name: 'All-In-One PDF Suite', description: 'Merge, Split, Compress, Unlock, Convert, and AI Summarize PDFs.', category: 'PDF Tools' },
    imageSuite: { name: 'Comprehensive Image Suite', description: 'Convert, Resize, Crop, Filter, Extract Colors, and Remove Backgrounds.', category: 'Image Tools' },
    promptStudio: { name: 'AI Prompt Studio', description: 'Professional prompt builder, role generator, templates, and optimizer.', category: 'AI Prompt Tools' },
    studentSuite: { name: 'Student Tools Suite', description: 'GPA Calculator, Pomodoro Timer, Word Counter & Citation Generator.', category: 'Student Tools' },
    medicalTools: { name: 'Medical Tools', description: 'Cardiology, Nephrology, Biochemistry & Clinical Pharmacology calculators.', category: 'Medical Tools' },
    unitConverterSuite: { name: 'Unit Converter Suite', description: 'Convert Length, Mass, Volume, Temperature, Speed, Pressure, and more.', category: 'Unit Converters' },
    codeUtilities: { name: 'Code Utilities Suite', description: 'JSON, JWT, Regex, Base64 & Language Tools.', category: 'Code Utilities' },
    textCaseConverter: { name: 'Text Utilities', description: 'Text Case Converter, Word Counter, Lorem Generator, Password Generator.', category: 'Text Utilities' },
    seoSuite: { name: 'SEO & Marketing Tools Suite', description: 'Meta Tag Generator, OG Preview, Keyword Density, Slug Generator.', category: 'SEO Tools' },
  };

  const tool = toolMap[toolId];

  const renderTool = () => {
    const suite = (() => {
      switch (toolId) {
        case 'pdfSuite': return <PdfToolsSuite initialTool={subToolId} />;
        case 'imageSuite': return <ImageToolsSuite initialTool={subToolId} />;
        case 'promptStudio': return <PromptStudio initialTool={subToolId} />;
        case 'studentSuite': return <StudentToolsSuite initialTool={subToolId} />;
        case 'medicalTools': return <MedicalToolsSuite initialTool={subToolId} />;
        case 'unitConverterSuite': return <UnitConverterSuite initialTool={subToolId} />;
        case 'codeUtilities': return <CodeUtilitiesTool initialTool={subToolId} />;
        case 'textCaseConverter': return <TextCaseConverter initialTool={subToolId} />;
        case 'seoSuite': return <SeoToolsSuite initialTool={subToolId} />;
        default: return <div className="text-center py-12 text-muted-foreground">Tool coming soon.</div>;
      }
    })();
    return <Suspense fallback={<div className="flex items-center justify-center py-24 text-muted-foreground text-sm">Loading tool...</div>}>{suite}</Suspense>;
  };

  return (
    <div className="workspace-container min-h-screen">
      <Navbar onBack={onBack} showBack badge={tool?.category || category.shortName} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient-brand">{tool?.name || category.shortName}</h1>
          <p className="text-sm text-muted-foreground mt-2">{tool?.description || category.description}</p>
        </div>
        <div className="glass-card p-6 rounded-xl animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            {renderTool()}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// --- Route wrappers below wire the existing components to real URLs ---

function DashboardRoute() {
  const navigate = useNavigate();

  const goToWorkspace = useCallback((category: Category) => {
    const slug = categorySlugMap[category.id];
    if (slug) navigate(`/${slug}`);
  }, [navigate]);

  const handleSearchToolSelect = useCallback((toolId: string) => {
    const suite = toolSuites[toolId];
    if (suite) {
      const category = categories.find(c => c.id === suite.categoryId);
      if (category) goToWorkspace(category);
      return;
    }
    const allTool = allIndividualTools.find(t => t.id === toolId);
    if (allTool) {
      const category = categories.find(c => c.id === allTool.categoryId);
      const slug = category ? categorySlugMap[category.id] : undefined;
      if (slug) navigate(`/${slug}?tool=${toolId}`);
    }
  }, [goToWorkspace, navigate]);

  const searchFilter = '';
  const filteredCount = categories.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onArticles={() => navigate('/articles')} />
      <Hero
        searchValue={searchFilter}
        onSearchChange={() => {}}
        resultCount={filteredCount}
        onToolSelect={handleSearchToolSelect}
      />
      <CategoryGrid filter={searchFilter} onSelect={goToWorkspace} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              <span className="text-gradient">Latest Articles & Guides</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Insights and knowledge every student and professional should know</p>
          </div>
          <button onClick={() => navigate('/articles')} className="btn-secondary-premium text-xs whitespace-nowrap hidden sm:flex items-center gap-2">
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.slice(0, 3).map(article => (
            <button key={article.id} onClick={() => navigate('/articles')} className="text-left group">
              <div className="glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 h-full flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-medium text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded">{article.category}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{article.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground/60">
                    <Clock className="w-3 h-3" />
                    {article.readTime} min read
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="text-center mt-6 sm:hidden">
          <button onClick={() => navigate('/articles')} className="btn-secondary-premium text-xs">View All Articles</button>
        </div>
      </section>

      <ShareSection />
      <SuggestionBox />
      <div className="flex-1" />
      <Footer onNavigate={(page: LegalPage) => navigate(`/${page === 'privacy' ? 'privacy-policy' : page === 'cookie' ? 'cookie-policy' : page}`)} />
      <CookieConsent onNavigate={(page: LegalPage) => navigate(`/${page === 'privacy' ? 'privacy-policy' : page === 'cookie' ? 'cookie-policy' : page}`)} />
    </div>
  );
}

function ArticlesRoute() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-24 text-muted-foreground text-sm">Loading articles...</div>}>
      <ArticlesPage onBack={() => navigate('/')} />
    </Suspense>
  );
}

function WorkspaceRoute() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryId = slug ? slugToCategoryId[slug] : undefined;
  const category = categories.find(c => c.id === categoryId);

  useEffect(() => {
    if (!category) navigate('/', { replace: true });
  }, [category, navigate]);

  if (!category) return null;

  const toolId = category.toolIds[0] || '';
  const subToolId = searchParams.get('tool') || undefined;

  return <Workspace category={category} toolId={toolId} subToolId={subToolId} onBack={() => navigate('/')} />;
}

function LegalRoute({ page }: { page: LegalPage }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar onBack={() => navigate('/')} showBack badge="Legal" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LegalContent page={page} />
      </main>
      <Footer onNavigate={(p: LegalPage) => navigate(`/${p === 'privacy' ? 'privacy-policy' : p === 'cookie' ? 'cookie-policy' : p}`)} />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardRoute />} />
      <Route path="/articles" element={<ArticlesRoute />} />
      <Route path="/about" element={<LegalRoute page="about" />} />
      <Route path="/contact" element={<LegalRoute page="contact" />} />
      <Route path="/privacy-policy" element={<LegalRoute page="privacy" />} />
      <Route path="/terms" element={<LegalRoute page="terms" />} />
      <Route path="/cookie-policy" element={<LegalRoute page="cookie" />} />
      <Route path="/:slug" element={<WorkspaceRoute />} />
      <Route path="*" element={<DashboardRoute />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
