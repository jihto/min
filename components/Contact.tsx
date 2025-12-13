'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MessageSquare, User, Linkedin, Github } from 'lucide-react';

interface Star {
    size: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
    opacity: number;
}

// Generate stars data - using a function to avoid Math.random in render
const generateStars = (): Star[] => {
    return Array.from({ length: 50 }).map(() => ({
        size: Math.random() * 2 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
    }));
};

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '', 
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stars] = useState<Star[]>(() => generateStars());
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    const socialLinks = [
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'Connect on LinkedIn',
            link: 'https://linkedin.com',
        },
        {
            icon: Github,
            label: 'GitHub',
            value: 'View our repositories',
            link: 'https://github.com',
        },
        {
            icon: Mail,
            label: 'Gmail',
            value: 'hello@jihto.com',
            link: 'mailto:hello@jihto.com',
        },
    ];

    return (
        <section
            id="contact"
            className="container mx-auto min-h-screen w-full grid md:grid-cols-12 items-stretch justify-center gap-6 px-6 md:px-24 py-28 pointer-events-none relative overflow-hidden"
        >
            {/* Stars Background */}
            <div className="absolute inset-0 pointer-events-none">
                {stars.map((star, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-cyan-400"
                        style={{
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            left: `${star.left}%`,
                            top: `${star.top}%`,
                            opacity: star.opacity,
                        }}
                        animate={{
                            opacity: [star.opacity, star.opacity + 0.3, star.opacity],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: star.duration,
                            delay: star.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
            {/* Left Panel - Contact Info */}
            <motion.div
                className="md:col-span-5 space-y-6 pointer-events-auto flex flex-col"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Category Badge */}
                <div className="flex items-center gap-4 flex-wrap">
                    <motion.div
                        className="px-4 py-2 dark:bg-white/10 light:bg-gray-900 backdrop-blur-sm border border-white/20 rounded-full"
                    >
                        <span className="text-xs dark:text-gray-300 light:text-gray-600 font-semibold tracking-wider capitalize">
                            Get in touch
                        </span>
                    </motion.div>
                </div>

                {/* Title */}
                <div>
                    <motion.h3
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Let&apos;s work together
                    </motion.h3>
                    <motion.div
                        className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    />
                </div>

                {/* Description */}
                <motion.p
                    className="dark:text-gray-100 light:text-gray-100 text-base leading-relaxed text-justify"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Have a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                </motion.p>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-3 gap-4 py-6 border-y border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="text-center">
                        <motion.div
                            className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, type: 'spring' }}
                        >
                            50+
                        </motion.div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Projects</p>
                    </div>
                    <div className="text-center">
                        <motion.div
                            className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                        >
                            24/7
                        </motion.div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Support</p>
                    </div>
                    <div className="text-center">
                        <motion.div
                            className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: 'spring' }}
                        >
                            100%
                        </motion.div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Satisfaction</p>
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <motion.a
                                key={social.label}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 group"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-gradient-to-r group-hover:from-cyan-500/20 group-hover:to-cyan-600/20 transition-all">
                                    <Icon className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                        {social.label}
                                    </p>
                                    <p className="text-sm dark:text-gray-100 light:text-gray-100 group-hover:text-cyan-300 transition-colors">
                                        {social.value}
                                    </p>
                                </div>
                            </motion.a>
                        );
                    })}
                </motion.div>
            </motion.div>

            {/* Right Panel - Contact Form */}
            <div className="md:col-span-7 relative">
                <motion.div
                    className="max-w-3xl w-full glass-panel rounded-xl pointer-events-auto flex flex-col overflow-hidden shadow-2xl shadow-black/50"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-5 border-b border-zinc-800 bg-gradient-to-r from-zinc-900/30 to-zinc-800/20">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-cyan-500 font-semibold">
                                Contact Form
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded border border-zinc-700 text-zinc-400 bg-zinc-800/50 uppercase tracking-wide">
                                Send Message
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-cyan-400" />
                        </div>
                    </div>

                    {/* Form Container */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Name Field */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                                Name
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                                    <AnimatePresence mode="wait">
                                        {focusedField === 'name' ? (
                                            <motion.span
                                                key="typing"
                                                initial={{ opacity: 0, x: -10, width: 0 }}
                                                animate={{ opacity: 1, x: 0, width: 'auto' }}
                                                exit={{ opacity: 0, x: 10, width: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="text-[10px] text-cyan-400 font-mono whitespace-nowrap overflow-hidden"
                                            >
                                                Typing...
                                            </motion.span>
                                        ) : (
                                            <motion.div
                                                key="icon"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            >
                                                <User className="w-4 h-4 text-gray-500" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <motion.input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    animate={{
                                        paddingLeft: focusedField === 'name' ? '4.5rem' : '2.5rem',
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="w-full pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                                    placeholder="Your name"
                                />
                            </div>
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                                    <AnimatePresence mode="wait">
                                        {focusedField === 'email' ? (
                                            <motion.span
                                                key="typing"
                                                initial={{ opacity: 0, x: -10, width: 0 }}
                                                animate={{ opacity: 1, x: 0, width: 'auto' }}
                                                exit={{ opacity: 0, x: 10, width: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="text-[10px] text-cyan-400 font-mono whitespace-nowrap overflow-hidden"
                                            >
                                                Typing...
                                            </motion.span>
                                        ) : (
                                            <motion.div
                                                key="icon"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            >
                                                <Mail className="w-4 h-4 text-gray-500" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <motion.input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    animate={{
                                        paddingLeft: focusedField === 'email' ? '4.5rem' : '2.5rem',
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="w-full pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </motion.div>

                        

                        {/* Message Field */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                                Message
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-4 flex items-center">
                                    <AnimatePresence mode="wait">
                                        {focusedField === 'message' ? (
                                            <motion.span
                                                key="typing"
                                                initial={{ opacity: 0, x: -10, width: 0 }}
                                                animate={{ opacity: 1, x: 0, width: 'auto' }}
                                                exit={{ opacity: 0, x: 10, width: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="text-[10px] text-cyan-400 font-mono whitespace-nowrap overflow-hidden"
                                            >
                                                Typing...
                                            </motion.span>
                                        ) : (
                                            <motion.div
                                                key="icon"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            >
                                                <MessageSquare className="w-4 h-4 text-gray-500" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <motion.textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    rows={6}
                                    animate={{
                                        paddingLeft: focusedField === 'message' ? '4.5rem' : '2.5rem',
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="w-full pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 resize-none"
                                    placeholder="Tell us about your project..."
                                />
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-6 py-3 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold hover:from-cyan-500 hover:to-cyan-400 transition-all shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}

