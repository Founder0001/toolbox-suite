export interface ArticleTeaser {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  image: string;
}

export const articleTeasers: ArticleTeaser[] = [
  {
    id: 'student-productivity-tools',
    title: '10 Free Productivity Tools Every Student Should Use in 2026',
    excerpt: 'From GPA calculators to Pomodoro timers, these free online tools will transform how you study, organize, and succeed in school.',
    category: 'Student Guides',
    date: '2026-06-15',
    readTime: 8,
    image: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'pdf-mastery-guide',
    title: 'PDF Mastery: Merge, Split, Compress & Edit Like a Pro',
    excerpt: 'Everything you need to know about PDF manipulation. Learn to merge, split, compress, and edit PDFs without expensive software.',
    category: 'Digital Life',
    date: '2026-06-10',
    readTime: 6,
    image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'image-optimization',
    title: 'Image Optimization: A Complete Guide for Web Performance',
    excerpt: 'Learn how to optimize images for faster page loads without sacrificing quality. Covers compression, formats, and responsive images.',
    category: 'Tech & Coding',
    date: '2026-06-05',
    readTime: 7,
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];
