// pages/VortexLanding.tsx (hoặc app/VortexLanding/page.tsx)
'use client'
import React from 'react';
import DefaultImageProject from '@/assets/images/project-1.1.png'; 
import VortexSimulation from '@/components/VortexSimulation'; // Điều chỉnh đường dẫn
import WarpedGridBackground from '@/components/WarpedGridBackground'
import EvolvingNeuralNetworkBackground from '@/components/EvolvingNeuralNetworkBackground'
import MinimalPyramid from '@/components/MinimalPyramid'
import { ArrowRight, Calendar, Clock, ExternalLink, Flag, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Image from 'next/image';
import Link from 'next/link';


const VortexLanding: React.FC = () => {
    // Logic cho việc chọn đáp án
    const selectOption = (event: React.MouseEvent<HTMLDivElement>) => {
        const card = event.currentTarget;
        const cards = document.querySelectorAll('.option-card');
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
    };

    // Giao diện người dùng sẽ được chuyển thành JSX
    return (
        <>
            <style jsx global>{`
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #050505;
                    color: #ffffff;
                    overflow-x: hidden;
                }
                ::-webkit-scrollbar {
                    width: 0.3rem;
                }
                ::-webkit-scrollbar-track {
                    background: #050505;
                }
                ::-webkit-scrollbar-thumb {
                    background: #27272a;
                    border-radius: 9999px;
                }
                .glass-panel {
                    background: rgba(10, 10, 12, 0.6);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
                }
                .glass-nav {
                    background: rgba(5, 5, 5, 0.6);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .option-card {
                    transition: all 0.2s ease;
                }
                .option-card:hover {
                    background: rgba(255, 255, 255, 0.03);
                    border-color: rgba(255, 255, 255, 0.2);
                }
                .option-card.selected {
                    background: rgba(244, 63, 94, 0.1); 
                    border-color: #f43f5e;
                }
                .option-card.selected .option-circle {
                    background: #f43f5e;
                    border-color: #f43f5e;
                    color: white;
                }
            `}</style>

            <div className="antialiased selection:bg-cyan-500/30 selection:text-white">
                {/* 3D Background */}
                {/* <VortexSimulation /> */}
                <WarpedGridBackground />
                {/* <EvolvingNeuralNetworkBackground/> */}

                {/* Main Content */}
                <main className="relative z-10 w-full">
                    {/* Section 1: Hero */}
                    <section id="hero" className="relative h-screen w-full flex flex-col md:flex-row justify-start py-26 md:py-40 items-start px-3 md:px-24 pointer-events-none">
                        <motion.section
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative md:px-6 overflow-hidden"
                        >

                            <div className="relative max-w-6xl mx-auto">
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="space-y-6"
                                >
                                    <p className="text-slate-500 dark:text-slate-300 text-xs md:text-sm tracking-[0.3em] uppercase">
                                        [PORTFOLIO] // SHOWCASE.2025
                                    </p>

                                    <h1 className="text-5xl lg:text-7xl font-light tracking-tight text-slate-200 dark:text-white">
                                        Solutions for
                                        <br />
                                        <span className="text-slate-300 dark:text-slate-300">web
                                            & AI businesses</span>
                                    </h1>

                                    <div className="max-w-2xl">
                                        <p className="text-slate-200 dark:text-slate-400 text-lg leading-relaxed border-l-2 border-slate-300 dark:border-slate-700 pl-6">
                                            THE BEST WORK AT CREATING INNOVATIVE SOLUTIONS.
                                            IT'S NOT EVEN CLOSE.
                                        </p>
                                    </div>

                                    <div className="pt-8 flex flex-wrap items-center gap-4 pointer-events-auto">
                                        <button className="h-12 px-8 rounded-full bg-zinc-100 text-zinc-950 text-sm font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300 flex items-center gap-2">
                                            Start Solving
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-zinc-800 bg-black/20 backdrop-blur-sm">
                                            <span className="text-xs text-zinc-500">Web-Based Platform v2.0</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.section>
                        <motion.div >
                            <MinimalPyramid />
                        </motion.div>

                        <div className="absolute bottom-10 left-6 md:left-24 flex items-center gap-4 text-xs text-zinc-600 font-mono">
                            <span>SYSTEM: ONLINE</span>
                            <div className="h-px w-12 bg-zinc-800"></div>
                            <span>SCROLL TO BEGIN</span>
                        </div>
                    </section>

                    {/* Section 2: Features projects */}
                    <section id="simulation" className=" min-h-screen w-full grid md:grid-cols-12 items-center justify-center gap-6 px-6 md:px-24 py-24 pointer-events-none">
                        {/* Features projects Card */}
                        <motion.div
                            className="md:col-span-5 space-y-4 glass-panel border-none!"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {/* Category & Year */}
                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="px-4 py-2 dark:bg-white/10 light:bg-gray-900 backdrop-blur-sm border border-white/20 rounded-full"
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                                >
                                    <span className="text-xs dark:text-gray-300 light:text-gray-600 font-semibold tracking-wider capitalize">
                                        Company website
                                    </span>
                                </motion.div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">2025</span>
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <motion.h3
                                    className="text-xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Công ty cổ phần Giải pháp xây dựng số 5
                                </motion.h3>
                                <motion.div
                                    className="h-1 w-20 bg-white rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: 80 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                />
                            </div>

                            {/* Description */}
                            <motion.p
                                className="dark:text-gray-100 light:text-gray-100 text-base leading-relaxed text-justify"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Hệ thống quản lý công ty CS5 là nền tảng điện tử hiện đại với trải nghiệm mượt mà. Tích hợp hệ thống quản lý admin, thay đổi giao diện tuỳ chỉnh, quản lý người dùng liên hệ, quản lý thông tin sản phẩn dự án, ý tường,...
                            </motion.p>
                            {/* Features */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <p className="dark:text-gray-100 light:text-gray-100 text-xs uppercase tracking-wider mb-4">Key Features</p>
                                <div className="space-y-3">
                                    {[
                                        "Hệ thống quản lý admin",
                                        'Thay đổi giao diện tuỳ chỉnh',
                                        "Quản lý người dùng liên hệ",
                                        "Quản lý thông tin sản phẩn dự án, ý tường,...",
                                        "Hỗ trợ đa ngôn ngữ",

                                    ].map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-start gap-3 dark:text-gray-100 light:text-gray-100"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 + index * 0.1 }}
                                        >
                                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-sm leading-relaxed">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        <div
                            className="md:col-span-7 max-w-3xl w-full glass-panel rounded-xl pointer-events-auto opacity-0 translate-y-10 transition-all duration-700 flex flex-col overflow-hidden shadow-2xl shadow-black/50"
                            id="interface-card"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center p-5 border-b border-zinc-800 bg-zinc-900/30">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-cyan-500 font-semibold">Q. 14</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded border border-zinc-700 text-zinc-400 bg-zinc-800/50 uppercase tracking-wide">Single Choice</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="text-white">02:14</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-emerald-500">+4</span>
                                        <span className="text-zinc-600">/</span>
                                        <span className="text-cyan-500">-1</span>
                                    </div>
                                </div>
                            </div>

                            {/* Question Body */}
                            <div className=""> 
                                <Image 
                                    src={DefaultImageProject.src}
                                    width={800}
                                    height={800}
                                    alt='Project image'
                                />    
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-zinc-900/30 border-t border-zinc-800 flex justify-end items-center">
                             
                                <Link href="https://cs5.vn/" className="bg-cyan-600 text-white px-6 py-2  flex items-center gap-2 rounded-md text-xs font-semibold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/20">
                                    Detail <ExternalLink size={16}/>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Data Stats */}
                    <section id="analytics" className="h-screen w-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                        <div className="relative z-20 space-y-12">
                            <div className="space-y-2">
                                <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white">DEEP INSIGHTS</h2>
                                <p className="text-sm text-zinc-500 font-mono">TRACKING METRICS THAT MATTER</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                                {/* Stat 1 */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="text-5xl md:text-7xl font-light text-white tracking-tight flex items-start">
                                        <span>142</span>
                                    </div>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest border-t border-zinc-800 pt-4 w-full">Concepts Mastered</span>
                                </div>
                                {/* Stat 2 */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="text-5xl md:text-7xl font-light text-white tracking-tight flex items-start">
                                        <span>1.8</span>
                                        <span className="text-2xl text-cyan-500 mt-2">m</span>
                                    </div>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest border-t border-zinc-800 pt-4 w-full">Avg. Time / Question</span>
                                </div>
                                {/* Stat 3 */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="text-5xl md:text-7xl font-light text-white tracking-tight flex items-start">
                                        <span>12</span>
                                        <span className="text-2xl text-emerald-500 mt-2">d</span>
                                    </div>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest border-t border-zinc-800 pt-4 w-full">Current Streak</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Grid CTA */}
                    <section id="cta" className="min-h-screen w-full bg-transparent flex flex-col items-center justify-center py-24 px-6 border-t border-zinc-900 relative overflow-hidden">
                        {/* Grid Background Effect */}
                        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                        {/* Glow Center */}
                        <div className="absolute inset-0 z-0 bg-gradient-to-t from-cyan-900/10 via-transparent to-transparent"></div>
                        <div className="z-10 text-center space-y-6 max-w-2xl mx-auto">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-2xl shadow-cyan-900/20">
                                <Zap className="w-8 h-8 text-cyan-500" />
                            </div>

                            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white">Focus on solving.</h2>
                            <p className="text-sm md:text-base text-zinc-400 font-light">
                                No distractions. No fluff. Just a pristine environment designed for deep work and rapid syllabus coverage.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
                                <button className="w-full md:w-auto bg-white text-black px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-cyan-500 hover:text-white transition-all shadow-lg shadow-white/10">
                                    Launch Dashboard
                                </button>
                                <button className="w-full md:w-auto bg-transparent border border-zinc-800 text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:border-zinc-600 transition-all">
                                    View Sample Analytics
                                </button>
                            </div>
                        </div>

                        <Hero />

                        {/* Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-24 z-10">
                            <div className="border border-zinc-800/50 bg-zinc-900/20 p-6 rounded-lg backdrop-blur-sm hover:border-zinc-700 transition-colors">
                                <span className="text-xs font-mono text-cyan-500 mb-2 block">PHASE 01</span>
                                <h3 className="text-sm font-medium text-white">Diagnostic</h3>
                                <p className="text-xs text-zinc-500 mt-2">We analyze your previous solve history to find gaps.</p>
                            </div>
                            <div className="border border-zinc-800/50 bg-zinc-900/20 p-6 rounded-lg backdrop-blur-sm hover:border-zinc-700 transition-colors">
                                <span className="text-xs font-mono text-cyan-500 mb-2 block">PHASE 02</span>
                                <h3 className="text-sm font-medium text-white">Execution</h3>
                                <p className="text-xs text-zinc-500 mt-2">Solve sets tailored to maximize your growth trajectory.</p>
                            </div>
                            <div className="border border-zinc-800/50 bg-zinc-900/20 p-6 rounded-lg backdrop-blur-sm hover:border-zinc-700 transition-colors">
                                <span className="text-xs font-mono text-cyan-500 mb-2 block">PHASE 03</span>
                                <h3 className="text-sm font-medium text-white">Review</h3>
                                <p className="text-xs text-zinc-500 mt-2">Detailed breakdown of time, accuracy, and potential traps.</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default VortexLanding;