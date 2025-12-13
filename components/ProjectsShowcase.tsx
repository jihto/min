'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ExternalLink, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import DefaultImageProject from '@/assets/images/project-1.1.png';
import Project2 from '@/assets/images/project-2.png';
import Project3 from '@/assets/images/project-1.2.png';
import Project4 from '@/assets/images/project-1.3.png';

interface Project {
    id: number;
    title: string;
    category: string;
    year: string;
    description: string;
    features: string[];
    image: StaticImageData;
    link?: string;
    tags?: string[];
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Công ty cổ phần Giải pháp xây dựng số 5',
        category: 'Company website',
        year: '2025',
        description: 'Hệ thống quản lý công ty CS5 là nền tảng điện tử hiện đại với trải nghiệm mượt mà. Tích hợp hệ thống quản lý admin, thay đổi giao diện tuỳ chỉnh, quản lý người dùng liên hệ, quản lý thông tin sản phẩn dự án, ý tường,...',
        features: [
            'Hệ thống quản lý admin',
            'Thay đổi giao diện tuỳ chỉnh',
            'Quản lý người dùng liên hệ',
            'Quản lý thông tin sản phẩn dự án, ý tường,...',
            'Hỗ trợ đa ngôn ngữ',
        ],
        image: DefaultImageProject,
        link: 'https://cs5.vn/',
        tags: ['Web App', 'Admin Panel', 'CMS'],
    },
    {
        id: 2,
        title: 'E-Commerce Platform',
        category: 'E-Commerce',
        year: '2024',
        description: 'Nền tảng thương mại điện tử hiện đại với hệ thống thanh toán tích hợp, quản lý kho hàng thông minh, và trải nghiệm mua sắm tối ưu cho người dùng.',
        features: [
            'Hệ thống thanh toán đa dạng',
            'Quản lý kho hàng tự động',
            'Tích hợp AI đề xuất sản phẩm',
            'Dashboard phân tích doanh thu',
            'Mobile-first responsive design',
        ],
        image: Project2,
        link: '#',
        tags: ['E-Commerce', 'Payment', 'AI'],
    },
    {
        id: 3,
        title: 'Healthcare Management System',
        category: 'Healthcare',
        year: '2024',
        description: 'Hệ thống quản lý bệnh viện và phòng khám với lịch hẹn trực tuyến, quản lý hồ sơ bệnh nhân, và tích hợp với các thiết bị y tế IoT.',
        features: [
            'Đặt lịch hẹn trực tuyến',
            'Quản lý hồ sơ điện tử',
            'Tích hợp IoT devices',
            'Báo cáo y tế tự động',
            'Bảo mật dữ liệu cao cấp',
        ],
        image: Project3,
        link: '#',
        tags: ['Healthcare', 'IoT', 'Security'],
    },
    {
        id: 4,
        title: 'Education Learning Platform',
        category: 'Education',
        year: '2024',
        description: 'Nền tảng học tập trực tuyến với video streaming chất lượng cao, bài tập tương tác, và hệ thống đánh giá thông minh.',
        features: [
            'Video streaming HD',
            'Bài tập tương tác',
            'AI đánh giá tự động',
            'Gamification & Badges',
            'Live classroom sessions',
        ],
        image: Project4,
        link: '#',
        tags: ['Education', 'Streaming', 'AI'],
    },
];

export default function ProjectsShowcase() {
    const [activeProject, setActiveProject] = useState(0);
 
    const nextProject = () => {
        setActiveProject((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const goToProject = (index: number) => {
        setActiveProject(index);
    };

    const currentProject = projects[activeProject];

    return (
        <section
            id="projects"
            className="min-h-screen w-full grid md:grid-cols-12 items-stretch justify-center gap-6 px-6 md:px-24 py-24 pointer-events-none relative"
        >
            {/* Left Panel - Project Info */}
            <motion.div
                key={activeProject}
                className="md:col-span-5 space-y-6 pointer-events-auto flex flex-col bg-black/20"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
            >

                {/* Category & Year */}
                <div className="flex items-center gap-4 flex-wrap"> 
                    <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{currentProject.year}</span>
                    </div>
                    {currentProject.tags && (
                        <div className="flex items-center gap-2 flex-wrap">
                            {currentProject.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Title */}
                <div>
                    <motion.h3
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {currentProject.title}
                    </motion.h3>
                    <motion.div
                        className="h-px w-20 bg-white"
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
                    {currentProject.description}
                </motion.p>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <p className="dark:text-gray-100 light:text-gray-100 text-xs uppercase tracking-wider">
                            Key Features
                        </p>
                    </div>
                    <div className="space-y-3">
                        {currentProject.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-3 dark:text-gray-100 light:text-gray-100 group"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                            >
                                <div className="w-4 h-1 bg-white mt-2 flex-shrink-0 transition-transform" />
                                <span className="text-sm leading-relaxed transition-colors">
                                    {feature}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Project Navigation Dots */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToProject(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === activeProject
                                    ? 'w-8 bg-gradient-to-r from-cyan-500 to-purple-500'
                                    : 'w-2 bg-white/20 hover:bg-white/40'
                            }`}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Right Panel - Project Image */}
            <div className="md:col-span-7 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeProject}
                        className="max-w-3xl w-full glass-panel rounded-xl pointer-events-auto flex flex-col overflow-hidden shadow-2xl shadow-black/50"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                    > 
                        {/* Image Container */}
                        <div className="relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                            <Image
                                src={currentProject.image.src || currentProject.image}
                                width={800}
                                height={800}
                                alt={currentProject.title}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-300 z-20" />
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gradient-to-r from-zinc-900/30 to-zinc-800/20 border-t border-zinc-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={prevProject}
                                    className="p-2 rounded-md border border-zinc-700 text-zinc-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                                    aria-label="Previous project"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={nextProject}
                                    className="p-2 rounded-md border border-zinc-700 text-zinc-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                                    aria-label="Next project"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <Link
                                href={currentProject.link || '#'}
                                className="bg-cyan-600 text-white px-6 py-2 flex items-center gap-2 rounded-md text-xs font-semibold hover:from-cyan-500 hover:to-purple-500 transition-all shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 hover:scale-105"
                            >
                                View Details <ExternalLink size={16} />
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Custom animation for shimmer */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
            `}</style>
        </section>
    );
}

