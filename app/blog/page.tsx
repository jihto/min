'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Code, Zap, Palette, Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';
import AnimatedStarfield from '@/components/AnimatedStarfield';

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

interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
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
    content: "In this comprehensive exploration, we delve into the cutting-edge AI technologies that are revolutionizing web development. We examine how machine learning models are being integrated into development workflows, the rise of AI-powered design tools, and the future implications for developers and businesses alike.",
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
    content: "We explore advanced React patterns including component composition, state management strategies, code splitting, and performance optimization. Learn how to structure your application for long-term maintainability and scalability.",
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
    content: "Discover the key principles of design systems, learn how to structure components, establish design tokens, and create documentation that empowers your team. We also cover common pitfalls and how to avoid them.",
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
    content: "We break down the major updates in Next.js 14, including the new App Router improvements, server actions, and performance enhancements. Learn how to migrate your existing projects and take advantage of the latest features.",
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
    content: "Learn the principles of effective micro-interactions, discover tools and techniques for implementation, and see real-world examples of how these small details can make a big impact on user satisfaction and engagement.",
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
    content: "Explore advanced TypeScript features including utility types, generics, conditional types, and module organization. Learn how to structure your types effectively and avoid common pitfalls that can lead to maintenance nightmares.",
    author: "David Wilson",
    date: "2023-12-25",
    readTime: "14 min read",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Code Quality"]
  }
];

const categories: Category[] = [
  { name: "All Posts", icon: BookOpen },
  { name: "AI & Machine Learning", icon: Zap },
  { name: "Web Development", icon: Code },
  { name: "UI/UX Design", icon: Palette }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Posts");
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

  const filteredBlogs = selectedCategory === "All Posts"
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">  
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative px-6 py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/50 to-white dark:from-slate-900/50 dark:to-black"></div>
        <AnimatedStarfield 
          className="dark:block hidden"
          intensity="medium"
          variant="dark"
        />
        <AnimatedStarfield 
          className="dark:hidden block"
          intensity="low"
          variant="light"
        />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-slate-500 dark:text-slate-400 text-sm tracking-[0.3em] uppercase">
              [BLOG] // INSIGHTS.2024
            </p>
            
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-slate-900 dark:text-white">
              Latest 
              <span className="text-slate-600 dark:text-slate-300">Articles</span>
            </h1>
            
            <div className="max-w-2xl">
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed border-l-2 border-slate-300 dark:border-slate-700 pl-6">
                INSIGHTS, TUTORIALS, AND THOUGHTS ON MODERN WEB DEVELOPMENT. 
                STAY AHEAD OF THE CURVE.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 pt-4"
            >
              <span className="text-slate-400 dark:text-slate-500 text-sm">SCROLL TO EXPLORE</span>
              <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 animate-pulse" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Filter */}
      <section className="px-6 py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 ${
                    selectedCategory === cat.name
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white'
                      : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-light">{cat.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="wait">
              {filteredBlogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ 
                    delay: idx * 0.05, 
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="group"
                >
                <Link href={`/blog/${blog.id}`}>
                  <div className="relative overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 h-full flex flex-col cursor-pointer">
                    {/* Blog Image/Placeholder */}
                    <div className={`aspect-[4/3] ${blog.image} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Tag */}
                      <div className="absolute top-4 left-4 text-xs text-slate-300 dark:text-slate-400 font-mono tracking-wider">
                        {blog.tag}
                      </div>

                      {/* Hover Arrow */}
                      <motion.div
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-5 h-5 text-black" />
                      </motion.div>
                    </div>

                    {/* Blog Info */}
                    <div className="p-6 space-y-3 flex-1 flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {blog.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-light text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                        {blog.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                        {blog.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500 pt-3 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(blog.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

