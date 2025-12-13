'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Blog {
  id: number;
  title: string;
  category: string;
  description: string;
  tag: string;
  image: string;
  fullDescription: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    category: "AI & Machine Learning",
    description: "Exploring how artificial intelligence is revolutionizing modern web development practices",
    tag: "[01/06] // AI.REVOLUTION",
    image: "bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-800 dark:to-black",
    fullDescription: "Artificial intelligence is transforming the landscape of web development, introducing new paradigms and capabilities that were once considered science fiction. From automated code generation to intelligent user interfaces, AI is reshaping how we build and interact with web applications.",
    content: "In this comprehensive exploration, we delve into the cutting-edge AI technologies that are revolutionizing web development. We examine how machine learning models are being integrated into development workflows, the rise of AI-powered design tools, and the future implications for developers and businesses alike.\n\n## The Rise of AI in Development\n\nMachine learning and artificial intelligence are no longer just buzzwords—they're becoming integral parts of the development process. From GitHub Copilot to ChatGPT, AI tools are helping developers write code faster, catch bugs earlier, and build more sophisticated applications.\n\n## Automated Code Generation\n\nOne of the most exciting developments is the ability of AI to generate code from natural language descriptions. This doesn't mean developers will be replaced, but rather that they can focus on higher-level architectural decisions while AI handles boilerplate and routine tasks.\n\n## Intelligent User Interfaces\n\nAI is also revolutionizing how users interact with web applications. Natural language processing enables more intuitive interfaces, while machine learning algorithms can personalize experiences in real-time.\n\n## The Future Landscape\n\nAs AI continues to evolve, we can expect even more sophisticated tools that understand context, suggest optimizations, and help maintain code quality at scale. The future of web development is one where AI and human developers work in harmony.",
    author: "John Doe",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["AI", "Web Development", "Machine Learning", "Future Tech"]
  },
  {
    id: 2,
    title: "Building Scalable React Applications",
    category: "Web Development",
    description: "Best practices and patterns for creating maintainable and scalable React applications",
    tag: "[02/06] // REACT.MASTERY",
    image: "bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-700 dark:to-slate-900",
    fullDescription: "Scalability is crucial for modern web applications. This guide covers essential patterns, architectural decisions, and performance optimization techniques that will help you build React applications that can grow with your business needs.",
    content: "We explore advanced React patterns including component composition, state management strategies, code splitting, and performance optimization. Learn how to structure your application for long-term maintainability and scalability.\n\n## Component Architecture\n\nA well-structured component hierarchy is the foundation of any scalable React application. We'll explore patterns like compound components, render props, and custom hooks that promote reusability and maintainability.\n\n## State Management\n\nChoosing the right state management solution is critical. Whether you use Context API, Redux, Zustand, or another solution, understanding when and how to manage state is key to building scalable applications.\n\n## Performance Optimization\n\nReact applications can become slow as they grow. We'll cover techniques like memoization, code splitting, lazy loading, and virtualization to keep your app performant at scale.",
    author: "Jane Smith",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["React", "JavaScript", "Performance", "Architecture"]
  },
  {
    id: 3,
    title: "Design Systems: From Concept to Implementation",
    category: "UI/UX Design",
    description: "A comprehensive guide to creating and maintaining effective design systems",
    tag: "[03/06] // DESIGN.SYSTEM",
    image: "bg-gradient-to-br from-slate-500 to-slate-700 dark:from-slate-600 dark:to-slate-800",
    fullDescription: "Design systems have become essential for maintaining consistency and efficiency in modern product development. This article walks through the entire process of creating a design system from initial concept to full implementation.",
    content: "Discover the key principles of design systems, learn how to structure components, establish design tokens, and create documentation that empowers your team. We also cover common pitfalls and how to avoid them.\n\n## Foundation First\n\nBefore building components, establish your design tokens: colors, typography, spacing, and other foundational elements. These tokens ensure consistency across your entire system.\n\n## Component Library\n\nBuild reusable components that follow your design principles. Start with basic components like buttons and inputs, then build more complex composite components.\n\n## Documentation\n\nGreat design systems are well-documented. Create clear guidelines for when and how to use each component, and provide examples that developers can reference.",
    author: "Sarah Johnson",
    date: "2024-01-05",
    readTime: "15 min read",
    tags: ["Design", "UI/UX", "Design Systems", "Components"]
  },
  {
    id: 4,
    title: "Next.js 14: What's New and How to Use It",
    category: "Web Development",
    description: "Deep dive into the latest features and improvements in Next.js 14",
    tag: "[04/06] // NEXTJS.14",
    image: "bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-800 dark:to-black",
    fullDescription: "Next.js 14 brings exciting new features including improved server components, enhanced caching strategies, and better developer experience. This guide helps you understand and leverage these new capabilities.",
    content: "We break down the major updates in Next.js 14, including the new App Router improvements, server actions, and performance enhancements. Learn how to migrate your existing projects and take advantage of the latest features.\n\n## App Router Enhancements\n\nThe App Router in Next.js 14 has received significant improvements, making it more stable and feature-rich. Server components are now the default, enabling better performance and SEO.\n\n## Server Actions\n\nServer Actions provide a seamless way to handle form submissions and data mutations without writing API routes. This simplifies data fetching and mutations significantly.\n\n## Performance Improvements\n\nNext.js 14 includes optimizations that make your applications faster out of the box. From improved caching to better code splitting, your users will notice the difference.",
    author: "Mike Chen",
    date: "2024-01-01",
    readTime: "10 min read",
    tags: ["Next.js", "React", "Framework", "Performance"]
  },
  {
    id: 5,
    title: "The Art of Micro-interactions",
    category: "UI/UX Design",
    description: "How subtle animations and interactions can dramatically improve user experience",
    tag: "[05/06] // MICRO.INTERACT",
    image: "bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-700 dark:to-slate-900",
    fullDescription: "Micro-interactions are the small, often overlooked details that make digital experiences feel polished and delightful. This article explores how to design and implement effective micro-interactions that enhance usability and engagement.",
    content: "Learn the principles of effective micro-interactions, discover tools and techniques for implementation, and see real-world examples of how these small details can make a big impact on user satisfaction and engagement.\n\n## Principles of Micro-interactions\n\nEffective micro-interactions provide feedback, communicate status, and guide users through their journey. They should feel natural and enhance rather than distract from the core experience.\n\n## Implementation Techniques\n\nFrom CSS animations to JavaScript libraries like Framer Motion, there are many ways to implement micro-interactions. Choose the right tool for your needs and constraints.\n\n## Real-World Examples\n\nWe'll examine successful micro-interactions from popular applications and break down what makes them effective.",
    author: "Emily Davis",
    date: "2023-12-28",
    readTime: "7 min read",
    tags: ["UI/UX", "Animation", "Interaction Design", "User Experience"]
  },
  {
    id: 6,
    title: "TypeScript Best Practices for Large Codebases",
    category: "Web Development",
    description: "Essential TypeScript patterns and practices for maintaining large-scale applications",
    tag: "[06/06] // TYPESCRIPT.PRO",
    image: "bg-gradient-to-br from-slate-500 to-slate-700 dark:from-slate-600 dark:to-slate-800",
    fullDescription: "TypeScript is invaluable for large codebases, but it requires discipline and best practices to maintain. This guide covers advanced patterns, type safety strategies, and organizational techniques that keep your codebase maintainable.",
    content: "Explore advanced TypeScript features including utility types, generics, conditional types, and module organization. Learn how to structure your types effectively and avoid common pitfalls that can lead to maintenance nightmares.\n\n## Type Organization\n\nKeep your types organized and reusable. Use type aliases, interfaces, and namespaces effectively to create a maintainable type system.\n\n## Advanced Patterns\n\nLeverage TypeScript's powerful type system with generics, conditional types, and mapped types to create flexible and type-safe code.\n\n## Avoiding Common Pitfalls\n\nLearn from common mistakes: overusing `any`, creating overly complex types, and not leveraging TypeScript's inference capabilities.",
    author: "David Wilson",
    date: "2023-12-25",
    readTime: "14 min read",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Code Quality"]
  }
];

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = parseInt(params.id as string);
  const blog = blogs.find(b => b.id === blogId);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const getInitialTheme = (): 'light' | 'dark' => {
      try {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) return savedTheme;
        if (document.documentElement.classList.contains('dark')) return 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch {
        return 'dark';
      }
    };

    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
    
    setTimeout(() => {
      root.style.transition = '';
    }, 300);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Blog post not found</h1>
          <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header Image */}
      <div className={`relative h-[400px] md:h-[500px] ${blog.image} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Blog</span>
            </Link>
            
            <p className="text-slate-300 text-xs font-mono tracking-wider">
              {blog.tag}
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-slate-300 text-sm uppercase tracking-wider">
              {blog.category}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Meta Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{blog.readTime}</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            {blog.fullDescription}
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="prose prose-slate dark:prose-invert max-w-none"
        >
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {blog.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl font-light mt-8 mb-4 text-slate-900 dark:text-white">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.trim() === '') {
                return <br key={idx} />;
              }
              return (
                <p key={idx} className="mb-4 text-base leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tags
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm border border-slate-200 dark:border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Back to Blog Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Posts</span>
          </Link>
        </motion.div>
      </article>
    </div>
  );
}

