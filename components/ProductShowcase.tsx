'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';

import ProjectImage11 from '@/assets/images/project-1.1.png';
import ProjectImage12 from '@/assets/images/project-1.2.png';
import ProjectImage13 from '@/assets/images/project-1.3.png';
import ProjectImage14 from '@/assets/images/project-1.4.png';
import ProjectImage15 from '@/assets/images/project-1.5.png';


import ProjectImage2 from '@/assets/images/project-2.png';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    duration: string;
    features: string[];
    images: string[];
    year: string;
    client: string;
    link?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Công ty cổ phần Giải pháp xây dựng số 5",
        category: "Company Website",
        description: "Hệ thống quản lý công ty CS5 là nền tảng điện tử hiện đại với trải nghiệm mượt mà. Tích hợp hệ thống quản lý admin, thay đổi giao diện tuỳ chỉnh, quản lý người dùng liên hệ, quản lý thông tin sản phẩn dự án, ý tường,...",
        images: [ProjectImage11.src, ProjectImage12.src, ProjectImage13.src, ProjectImage14.src, ProjectImage15.src],
        year: "2025",
        client: "Công ty cổ phần Giải pháp xây dựng số 5",
        duration: "14 ngày",
        features: [
            "Hệ thống quản lý admin",
            "Thay đổi giao diện tuỳ chỉnh",
            "Quản lý người dùng liên hệ",
            "Quản lý thông tin sản phẩn dự án, ý tường,...",
            "Hỗ trợ đa ngôn ngữ"
        ],
        link: "https://cs5.vn"
    },
    {
        id: 2,
        title: "Trang web công ty Agnes Biofarm",
        category: "Company Website",
        description: "Hệ thống quản lý công ty Agnes Biofarm là nền tảng điện tử hiện đại với trải nghiệm mượt mà. Tích hợp hệ thống quản lý admin, thay đổi giao diện tuỳ chỉnh, quản lý người dùng liên hệ, quản lý thông tin sản phẩn, bài viết,...",
        images: [ProjectImage2.src],
        year: "2025",
        client: "Công ty cổ phần Agnes Biofarm",
        duration: "14 ngày",
        features: [
            "Hệ thống quản lý admin",
            "Thay đổi giao diện tuỳ chỉnh",
            "Quản lý người dùng liên hệ",
            "Quản lý thông tin sản phẩn, bài viết,...",
        ]
    },
    {
        id: 3,
        title: "Trang web Công ty Cổ phần Bảo Hiểm Bảo Việt",
        category: "Landing page",
        description: "Website cá nhân sáng tạo với animation độc đáo và interactive elements. Tạo ấn tượng mạnh với potential clients và employers.",
        images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop"],
        year: "2024",
        client: "Personal Project",
        duration: "3 tháng",
        features: [
            "3D interactive elements",
            "Smooth scroll animations",
            "Case study presentations",
            "Contact form với automation"
        ]
    },
    {
        id: 4,
        title: "Mobile Banking App",
        category: "Fintech",
        description: "Ứng dụng ngân hàng di động an toàn và tiện lợi. Chuyển khoản nhanh, quản lý tài chính cá nhân và đầu tư thông minh.",
        images: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop"],
        year: "2023",
        client: "FinBank Solutions",
        duration: "12 tháng",
        features: [
            "Bảo mật đa lớp với biometric",
            "Chuyển khoản tức thì 24/7",
            "Quản lý ngân sách AI-powered",
            "Tích hợp investment portfolio"
        ]
    }
];

const PortfolioShowcase = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // // Auto-play functionality
    // useEffect(() => {
    //     if (isPaused) return;

    //     const interval = setInterval(() => {
    //         setDirection(1);
    //         setCurrentIndex((prevIndex) => {
    //             const nextIndex = prevIndex + 1;
    //             return nextIndex >= projects.length ? 0 : nextIndex;
    //         });
    //     }, 12000); // Auto change every 6 seconds

    //     return () => clearInterval(interval);
    // }, [isPaused]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.9
        })
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = projects.length - 1;
            if (nextIndex >= projects.length) nextIndex = 0;
            return nextIndex;
        });
    };

    return (
        <section className="relative min-h-screen bg-[var(--section-bg)] overflow-hidden flex items-center justify-center py-20 px-4">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                {/* Gradient Orbs - Monochrome */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--glow-color)] rounded-full blur-3xl"
                    animate={{
                        x: mousePosition.x * 2,
                        y: mousePosition.y * 2,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--glow-color)] rounded-full blur-3xl"
                    animate={{
                        x: -mousePosition.x * 2,
                        y: -mousePosition.y * 2,
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Floating Particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.1, 0.6, 0.1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className='flex justify-between items-end mb-10'>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-start"
                    >
                        <h2 className="text-6xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
                            Dự án của chúng tôi
                        </h2>
                        <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
                            Khám phá những dự án đỉnh cao được tạo ra với đam mê và công nghệ hiện đại
                        </p>
                    </motion.div> 
                    <div className='flex items-center justify-start gap-10'>
                        {/* Navigation Buttons */}
                        <motion.button
                            className="p-3 bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--card-border)] rounded-full text-[var(--text-primary)] hover:bg-[var(--card-bg)] transition-colors"
                            whileHover={{ scale: 1.1, x: -5, borderColor: "rgba(255,255,255,0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => paginate(-1)}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                        {/* Project Counter */}
                        <motion.div
                            className="text-center z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <p className="text-gray-600 text-sm">
                                <span className="text-[var(--text-primary)] font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span>
                                {' / '}
                                <span>{String(projects.length).padStart(2, '0')}</span>
                            </p>
                        </motion.div>

                        <motion.button
                            className="p-3 bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--card-border)] rounded-full text-[var(--text-primary)] hover:bg-[var(--card-bg)] transition-colors"
                            whileHover={{ scale: 1.1, x: 5, borderColor: "rgba(255,255,255,0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => paginate(1)}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
                {/* Main Slider */}
                <div
                    className="relative h-[550px] flex items-center justify-center"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "tween", stiffness: 250, damping: 30 },
                                opacity: { duration: 0.3, ease: "easeInOut" },
                                scale: { duration: 0.3, ease: "easeInOut" }
                            }}
                            className="absolute w-full"
                        >
                            <div className="grid md:grid-cols-12 gap-12 items-start justify-start">
                                {/* Left Content - 5 columns */}
                                <motion.div
                                    className="md:col-span-5 space-y-4"
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
                                                {projects[currentIndex].category}
                                            </span>
                                        </motion.div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">{projects[currentIndex].year}</span>
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
                                            {projects[currentIndex].title}
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
                                        className="dark:text-gray-400 light:text-gray-600 text-base leading-relaxed text-justify"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {projects[currentIndex].description}
                                    </motion.p>
                                    {/* Features */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <p className="dark:text-gray-600 light:text-gray-400 text-xs uppercase tracking-wider mb-4">Key Features</p>
                                        <div className="space-y-3">
                                            {projects[currentIndex].features.map((feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="flex items-start gap-3 dark:text-gray-400 light:text-gray-600"
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

                                {/* Right Image - 7 columns */}
                                <motion.div
                                    className="md:col-span-7 h-full"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    <motion.div
                                        className="relative group h-full"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    > 
                                        {/* Main Image Container */}
                                        <div className='relative grid grid-cols-12 w-full h-full gap-4'>
                                            <div className='col-span-9 flex flex-col gap-4 place-items-end'>
                                                <div className="relative w-full h-fit aspect-[5/3] overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                                                    <Image
                                                        src={projects[currentIndex].images[0] as string}
                                                        alt={projects[currentIndex].title}
                                                        className="w-full h-full object-cover"
                                                        fill
                                                    />
                                                </div>
                                                <div className='flex gap-4'>
                                                    <div className='relative w-1/3 h-full overflow-hidden bg-white backdrop-blur-sm border border-white/10 flex items-center justify-center'>
                                                        <Image
                                                            src={projects[currentIndex].images[1] as string}
                                                            alt={projects[currentIndex].title}
                                                            className="w-full h-fit object-contain object-top bg-white"
                                                            width={200}
                                                            height={200}
                                                        />
                                                    </div>
                                                    <Image
                                                        src={projects[currentIndex].images[3] as string}
                                                        alt={projects[currentIndex].title}
                                                        className="w-2/3 h-auto object-contain"
                                                        width={200}
                                                        height={200}
                                                    />
                                                </div>
                                            </div> 
                                            <div className="relative col-span-3 overflow-hidden flex flex-col gap-4">
                                                <Image
                                                    src={projects[currentIndex].images[2] as string}
                                                    alt={projects[currentIndex].title}
                                                    className="w-full h-fit object-contain object-top"
                                                     width={200}
                                                    height={200}
                                                />
                                                <Image
                                                    src={projects[currentIndex].images[4] as string}
                                                    alt={projects[currentIndex].title}
                                                    className="w-full h-fit object-contain object-top"
                                                    width={200}
                                                    height={200}
                                                />
                                            </div>

                                            {/* <div className="absolute bg-white h-[280px] w-[350px] bottom-0 right-0 overflow-hidden">
                                                <p>Tim hieeur them</p>
                                            </div> */}
                                        </div>
                                        {/* Decorative Elements */}
                                        <motion.div
                                            className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-3xl -z-10"
                                            animate={{ rotate: [0, 5, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-3xl -z-10"
                                            animate={{ rotate: [0, -5, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default PortfolioShowcase;