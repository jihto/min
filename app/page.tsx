// pages/VortexLanding.tsx (hoặc app/VortexLanding/page.tsx)
'use client'
import React from 'react';
import WarpedGridBackground from '@/components/WarpedGridBackground'
import MinimalPyramid from '@/components/MinimalPyramid'
import { ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import FeaturesShowcase from '@/components/FeaturesShowcase';
import ProjectsShowcase from '@/components/ProjectsShowcase';


const VortexLanding: React.FC = () => {
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
                                        <span className="text-slate-300 dark:text-slate-300">Web & AI businesses</span>
                                    </h1>

                                    <div className="max-w-2xl">
                                        <p className="text-slate-200 dark:text-slate-400 text-lg leading-relaxed border-l-2 border-slate-300 dark:border-slate-700 pl-6">
                                            THE BEST WORK AT CREATING INNOVATIVE SOLUTIONS.
                                            IT&apos;S NOT EVEN CLOSE.
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

                        <div className="absolute bottom-10 left-6 md:left-24 flex items-center gap-4 text-xs font-mono text-cyan-300">
                            <span>SYSTEM: ONLINE</span>
                            <div className="h-px w-12 bg-zinc-800"></div>
                            <span>SCROLL TO BEGIN</span>
                        </div>
                    </section> 

                    <FeaturesShowcase />

                    {/* Section 2: Projects Showcase */}
                    <ProjectsShowcase />

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