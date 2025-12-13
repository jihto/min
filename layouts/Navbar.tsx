'use client';


import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, User, Languages, ChevronDown, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const { language, setLanguage, t } = useLanguage();

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    // Add transition class for smooth theme change
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
    
    // Remove transition after animation completes
    setTimeout(() => {
      root.style.transition = '';
    }, 300);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load theme from localStorage or detect system preference
    const getInitialTheme = (): 'light' | 'dark' => {
      try {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
          return savedTheme;
        }
        // Check if dark class is already applied (from script in layout)
        if (document.documentElement.classList.contains('dark')) {
          return 'dark';
        }
        // Fallback to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (e) {
        return 'dark'; // Default to dark
      }
    };

    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    // Only apply if not already applied by the script
    if (!document.documentElement.classList.contains('dark') && initialTheme === 'dark') {
      applyTheme(initialTheme);
    } else if (document.documentElement.classList.contains('dark') && initialTheme === 'light') {
      applyTheme(initialTheme);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };

    if (isLangDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangDropdownOpen]);

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.projects'), href: 'projects' },
    { name: t('nav.newArrivals'), href: '#new' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  const iconVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  return ( 
      <motion.nav
        style={{ opacity: navOpacity }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-[var(--nav-bg-scrolled)] backdrop-blur-md border-b border-[var(--border-color)]' 
            : 'bg-[var(--nav-bg)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-2xl font-light tracking-[0.2em] text-[var(--text-primary)]" 
            >
              MIN
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-sm tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--text-primary)] group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.button
                variants={iconVariants}
                whileHover="hover"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>
              <div className="relative" ref={langDropdownRef}>
                <motion.button
                  variants={iconVariants} 
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
                  aria-label="Change language"
                  aria-expanded={isLangDropdownOpen}
                >
                  <Languages className="w-5 h-5" />
                  <span className="text-sm">{language === 'en' ? 'English' : 'Tiếng Việt'}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </motion.button>

                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-[var(--nav-bg)] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-lg z-50"
                  >
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                        language === 'en' 
                          ? 'bg-[var(--text-primary)]/10 text-[var(--text-primary)]' 
                          : 'text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/10 hover:text-[var(--text-primary)]'
                      }`}
                    >
                      🇺🇸 English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('vi');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors border-t border-[var(--border-color)] ${
                        language === 'vi' 
                          ? 'bg-[var(--text-primary)]/10 text-[var(--text-primary)]' 
                          : 'text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/10 hover:text-[var(--text-primary)]'
                      }`}
                    >
                      🇻🇳 Tiếng Việt
                    </button>
                  </motion.div>
                )}
              </div>
              <motion.button
                variants={iconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9, rotate: 180 }}
                onClick={toggleTheme}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative w-5 h-5"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[var(--text-primary)]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-[var(--nav-bg)] border-t border-[var(--border-color)]"
        >
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1 }}
                className="block text-lg tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="flex items-center space-x-6 pt-6 border-t border-[var(--border-color)]">
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <User className="w-5 h-5" />
              </button>
              <motion.button 
                onClick={toggleTheme}
                whileTap={{ scale: 0.9, rotate: 180 }}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative w-5 h-5"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav> 
  );
}