'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers, Code, Palette, Zap, X, ExternalLink, Github, Sun, Moon } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tag: string;
  image: string;
  fullDescription: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Neural Interface",
    category: "AI & Machine Learning",
    description: "Advanced neural network visualization and interaction system",
    tag: "[01/08] // SYS.INIT",
    image: "bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-800 dark:to-black",
    fullDescription: "A cutting-edge neural network visualization platform that enables real-time interaction with complex AI models. Features include dynamic node visualization, performance metrics, and interactive training controls.",
    technologies: ["TensorFlow", "React", "WebGL", "Python", "FastAPI"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Quantum Design",
    category: "UI/UX Design",
    description: "Next-generation design system with micro-interactions",
    tag: "[02/08] // INTRO & SCROLL",
    image: "bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-700 dark:to-slate-900",
    fullDescription: "A comprehensive design system built for modern web applications. Includes 200+ components, accessibility-first approach, and seamless dark mode support with fluid animations.",
    technologies: ["Figma", "React", "Tailwind CSS", "Framer Motion", "Storybook"],
    liveUrl: "#"
  },
  {
    id: 3,
    title: "Ethereal Dashboard",
    category: "Web Development",
    description: "Real-time analytics dashboard with glassmorphism effects",
    tag: "[03/08] // CLIP ANIMATION",
    image: "bg-gradient-to-br from-slate-500 to-slate-700 dark:from-slate-600 dark:to-slate-800",
    fullDescription: "Enterprise-grade analytics dashboard featuring real-time data visualization, customizable widgets, and advanced filtering. Built with performance and scalability in mind.",
    technologies: ["Next.js", "TypeScript", "D3.js", "PostgreSQL", "Redis"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Morpheus Framework",
    category: "AI & Machine Learning",
    description: "Adaptive learning framework for dynamic content generation",
    tag: "[04/08] // TRANSFORM",
    image: "bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-800 dark:to-black",
    fullDescription: "An adaptive learning framework that generates personalized content based on user behavior and preferences. Utilizes advanced NLP and recommendation algorithms.",
    technologies: ["PyTorch", "GPT-4", "FastAPI", "MongoDB", "Kubernetes"],
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Velocity Commerce",
    category: "Web Development",
    description: "High-performance e-commerce platform with edge computing",
    tag: "[05/08] // PARALLAX",
    image: "bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-700 dark:to-slate-900",
    fullDescription: "A blazing-fast e-commerce solution leveraging edge computing for sub-100ms page loads globally. Features include real-time inventory, AI-powered recommendations, and seamless checkout.",
    technologies: ["Next.js", "Cloudflare Workers", "Stripe", "Prisma", "GraphQL"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Prism Studio",
    category: "UI/UX Design",
    description: "Collaborative design workspace with real-time sync",
    tag: "[06/08] // REVEAL",
    image: "bg-gradient-to-br from-slate-500 to-slate-700 dark:from-slate-600 dark:to-slate-800",
    fullDescription: "A collaborative design platform enabling teams to work together in real-time. Features include version control, commenting system, and seamless handoff to developers.",
    technologies: ["React", "WebRTC", "Socket.io", "Canvas API", "AWS"],
    liveUrl: "#"
  }
];

const categories: Category[] = [
  { name: "All Projects", icon: Layers },
  { name: "AI & Machine Learning", icon: Zap },
  { name: "Web Development", icon: Code },
  { name: "UI/UX Design", icon: Palette }
];

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const filteredProjects = selectedCategory === "All Projects"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

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
        
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-slate-500 dark:text-slate-400 text-sm tracking-[0.3em] uppercase">
              [PORTFOLIO] // SHOWCASE.2024
            </p>
            
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-slate-900 dark:text-white">
              Selected
              <br />
              <span className="text-slate-600 dark:text-slate-300">Projects</span>
            </h1>
            
            <div className="max-w-2xl">
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed border-l-2 border-slate-300 dark:border-slate-700 pl-6">
                THE BEST WORK AT CREATING INNOVATIVE SOLUTIONS. 
                IT'S NOT EVEN CLOSE.
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
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${
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

      {/* Projects Grid */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500">
                  {/* Project Image/Placeholder */}
                  <div className={`aspect-[4/3] ${project.image} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Tag */}
                    <div className="absolute top-4 left-4 text-xs text-slate-300 dark:text-slate-400 font-mono tracking-wider">
                      {project.tag}
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

                  {/* Project Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-light text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Detail Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className={`${selectedProject.image} p-8 relative`}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
                
                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-slate-300 text-xs font-mono tracking-wider">
                        {selectedProject.tag}
                      </p>
                      <h2 className="text-3xl md:text-4xl font-light text-white">
                        {selectedProject.title}
                      </h2>
                      <p className="text-slate-300 text-sm uppercase tracking-wider">
                        {selectedProject.category}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    About Project
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Live</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence> 
    </div>
  );
}