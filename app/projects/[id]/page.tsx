'use client'

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Sparkles, ExternalLink, Tag } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import AnimatedStarfield from '@/components/AnimatedStarfield';
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
    fullDescription?: string;
    technologies?: string[];
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Công ty cổ phần Giải pháp xây dựng số 5',
        category: 'Company website',
        year: '2025',
        description: 'Hệ thống quản lý công ty CS5 là nền tảng điện tử hiện đại với trải nghiệm mượt mà. Tích hợp hệ thống quản lý admin, thay đổi giao diện tuỳ chỉnh, quản lý người dùng liên hệ, quản lý thông tin sản phẩn dự án, ý tường,...',
        fullDescription: 'Công ty cổ phần Giải pháp xây dựng số 5 (CS5) là một hệ thống quản lý công ty toàn diện được xây dựng trên nền tảng web hiện đại. Hệ thống này cung cấp giải pháp quản lý doanh nghiệp hoàn chỉnh với giao diện thân thiện và trải nghiệm người dùng tối ưu.\n\nHệ thống được thiết kế để đáp ứng nhu cầu quản lý của các công ty xây dựng, từ quản lý dự án, nhân sự, đến quản lý tài chính và báo cáo. Với kiến trúc linh hoạt và khả năng mở rộng cao, CS5 có thể được tùy chỉnh theo nhu cầu cụ thể của từng doanh nghiệp.',
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
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma']
    },
    {
        id: 2,
        title: 'E-Commerce Platform',
        category: 'E-Commerce',
        year: '2024',
        description: 'Nền tảng thương mại điện tử hiện đại với hệ thống thanh toán tích hợp, quản lý kho hàng thông minh, và trải nghiệm mua sắm tối ưu cho người dùng.',
        fullDescription: 'Nền tảng thương mại điện tử được xây dựng với công nghệ tiên tiến, mang đến trải nghiệm mua sắm trực tuyến hoàn hảo. Hệ thống tích hợp đầy đủ các tính năng cần thiết cho một cửa hàng trực tuyến hiện đại.\n\nTừ quản lý sản phẩm, đơn hàng, đến xử lý thanh toán và vận chuyển, tất cả đều được tự động hóa và tối ưu hóa để mang lại hiệu quả cao nhất. Hệ thống còn tích hợp AI để đề xuất sản phẩm phù hợp với từng khách hàng, tăng tỷ lệ chuyển đổi và doanh thu.',
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
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'TensorFlow']
    },
    {
        id: 3,
        title: 'Healthcare Management System',
        category: 'Healthcare',
        year: '2024',
        description: 'Hệ thống quản lý bệnh viện và phòng khám với lịch hẹn trực tuyến, quản lý hồ sơ bệnh nhân, và tích hợp với các thiết bị y tế IoT.',
        fullDescription: 'Hệ thống quản lý y tế toàn diện được thiết kế đặc biệt cho các bệnh viện và phòng khám. Hệ thống giúp số hóa toàn bộ quy trình quản lý, từ đặt lịch hẹn, quản lý hồ sơ bệnh nhân, đến tích hợp với các thiết bị y tế thông minh.\n\nVới giao diện trực quan và dễ sử dụng, hệ thống giúp nhân viên y tế tiết kiệm thời gian và nâng cao chất lượng dịch vụ. Tính năng bảo mật cao đảm bảo thông tin bệnh nhân được bảo vệ tuyệt đối.',
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
        technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'AWS IoT']
    },
    {
        id: 4,
        title: 'Education Learning Platform',
        category: 'Education',
        year: '2024',
        description: 'Nền tảng học tập trực tuyến với video streaming chất lượng cao, bài tập tương tác, và hệ thống đánh giá thông minh.',
        fullDescription: 'Nền tảng học tập trực tuyến được xây dựng để mang đến trải nghiệm học tập tốt nhất cho học sinh và sinh viên. Hệ thống hỗ trợ nhiều hình thức học tập khác nhau, từ video bài giảng, bài tập tương tác, đến lớp học trực tuyến.\n\nVới công nghệ AI tích hợp, hệ thống có thể đánh giá tự động bài làm của học sinh, đưa ra gợi ý cải thiện, và cá nhân hóa lộ trình học tập cho từng người. Tính năng gamification giúp tăng động lực học tập và duy trì sự hứng thú.',
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
        technologies: ['Next.js', 'WebRTC', 'FFmpeg', 'OpenAI API', 'Redis']
    },
];

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = parseInt(params.id as string);
    const project = projects.find(p => p.id === projectId); 
 

    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-light mb-4">Project not found</h1>
                    <Link href="/" className="text-slate-400 hover:text-white">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header Image */}
            <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                <AnimatedStarfield 
                    intensity="high"
                    variant="dark"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10"></div>
                <Image
                    src={project.image.src || project.image}
                    alt={project.title}
                    fill
                    className="object-cover z-0"
                    priority
                />
                
                <div className="relative z-20 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-16 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm">Back to Home</span>
                        </Link>
                        
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 text-white/80">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{project.year}</span>
                            </div>
                            <span className="text-sm text-white/80 uppercase tracking-wider">
                                {project.category}
                            </span>
                            {project.tags && (
                                <div className="flex items-center gap-2 flex-wrap">
                                    {project.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-white/70 border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <article className="max-w-5xl mx-auto px-6 py-16">
                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-light">
                        {project.description}
                    </p>
                </motion.div>

                {/* Full Description */}
                {project.fullDescription && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="text-white/70 leading-relaxed whitespace-pre-line text-lg">
                            {project.fullDescription.split('\n').map((paragraph, idx) => {
                                if (paragraph.trim() === '') {
                                    return <br key={idx} />;
                                }
                                return (
                                    <p key={idx} className="mb-6 text-lg leading-relaxed">
                                        {paragraph}
                                    </p>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-10">
                        <div className="h-px w-12 bg-white/20"></div>
                        <Sparkles className="w-5 h-5 text-white/60" />
                        <h2 className="text-2xl font-light text-white uppercase tracking-wider">
                            Key Features
                        </h2>
                        <div className="h-px flex-1 bg-white/20"></div>
                    </div>
                    <div className="space-y-5">
                        {project.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-4 text-gray-300 group"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                            >
                                <div className="w-4 h-1 bg-white/30 mt-2 flex-shrink-0 group-hover:bg-white transition-colors" />
                                <span className="text-base leading-relaxed group-hover:text-white transition-colors">
                                    {feature}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-px w-12 bg-white/20"></div>
                            <Tag className="w-5 h-5 text-white/60" />
                            <h2 className="text-2xl font-light text-white uppercase tracking-wider">
                                Technologies
                            </h2>
                            <div className="h-px flex-1 bg-white/20"></div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 rounded-full bg-zinc-900/50 text-white/80 text-sm border border-white/10 hover:border-white/20 hover:text-white transition-all"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* External Link */}
                {project.link && project.link !== '#' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="pt-12 border-t border-white/10"
                    >
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-all shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-105"
                        >
                            Visit Live Site <ExternalLink className="w-4 h-4" />
                        </a>
                    </motion.div>
                )}

                {/* Back to Home Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 pt-12 border-t border-white/10"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>
                </motion.div>
            </article>
        </div>
    );
}

