'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.newArrivals': 'New Arrivals',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.projects': "Projects",
    
    // Hero
    'hero.title': 'Solutions for web & AI businesses',
    'hero.subtitle': 'We design and build fast web experiences and integrate AI to automate, personalize, and scale your business.',
    'hero.cta.primary': 'Get in touch',
    'hero.cta.secondary': 'Our work',
    
    // Features
    'features.title': 'What you get',
    'features.performance.title': 'Performance-first',
    'features.performance.desc': 'Fast, accessible, and optimized for Core Web Vitals.',
    'features.ai.title': 'AI-native',
    'features.ai.desc': 'Integrations for automation, personalization, and insights.',
    'features.design.title': 'Design minimalism',
    'features.design.desc': 'Clean UI that emphasizes clarity and purpose.',
    'features.scalable.title': 'Scalable architecture',
    'features.scalable.desc': 'Best practices for reliability and long-term growth.',
    
    // Services
    'services.title': 'Services',
    'services.web.title': 'Web Experiences',
    'services.web.desc': 'Sites and apps that are fast, accessible, and beautiful.',
    'services.web.items.1': 'Next.js frontends',
    'services.web.items.2': 'Design systems',
    'services.web.items.3': 'SEO & analytics',
    'services.ai.title': 'AI Solutions',
    'services.ai.desc': 'Automations, assistants, and intelligent products.',
    'services.ai.items.1': 'Chatbots & RAG',
    'services.ai.items.2': 'Workflow automation',
    'services.ai.items.3': 'Personalization',
    
    // Process
    'process.title': 'How we work',
    'process.step1.number': '01',
    'process.step1.title': 'Discovery',
    'process.step1.desc': 'We start by understanding your vision, goals, and challenges. Through collaborative discussions, we define the scope and align on outcomes.',
    'process.step2.number': '02',
    'process.step2.title': 'Design & Build',
    'process.step2.desc': 'We craft elegant solutions and bring them to life. Every detail is considered—from user experience to technical architecture.',
    'process.step3.number': '03',
    'process.step3.title': 'Launch & Iterate',
    'process.step3.desc': 'We deploy with confidence and monitor performance. Continuous refinement ensures your product evolves with your needs.',
    
    // Testimonials
    'testimonials.title': 'What clients say',
    'testimonials.1.quote': 'They delivered a stunning site and automated our intake with AI.',
    'testimonials.1.author': 'Ava M.',
    'testimonials.1.role': 'Founder, Nimbus',
    'testimonials.2.quote': 'Performance jumped and our users love the new experience.',
    'testimonials.2.author': 'Leo P.',
    'testimonials.2.role': 'PM, Atlas',
    'testimonials.3.quote': 'A partner who ships quickly and cares about details.',
    'testimonials.3.author': 'Riya S.',
    'testimonials.3.role': 'CTO, Helix',
    
    // Pricing
    'pricing.subtitle': 'Choose the Right Plan',
    'pricing.desc': 'Flexible pricing options to suit your business needs.',
    'pricing.basic.name': 'Basic',
    'pricing.basic.timeFrame': 'Completion time 1-3 days',
    'pricing.basic.desc': 'Professional landing page website package',
    'pricing.standard.name': 'Standard',
    'pricing.standard.timeFrame': 'Completion time 7-10 days',
    'pricing.standard.desc': 'Basic website package with full features',
    'pricing.premium.name': 'Premium',
    'pricing.premium.timeFrame': 'Completion time 14-21 days',
    'pricing.premium.desc': 'Advanced website package with custom features',
    'pricing.cta': 'Contact now',
    'pricing.note': 'Prices include VAT. Contact us for detailed consultation and accurate pricing.',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about our services.',
    
    // CTA
    'cta.title': 'Ready to build something exceptional?',
    'cta.desc': 'Tell us about your goals. We\'ll propose a minimal, impactful plan.',
    'cta.primary': 'Start a project',
    'cta.secondary': 'See pricing',
    
    // Footer
    'footer.brand.desc': 'Minimal, fast, and thoughtful solutions for web and AI products.',
    'footer.company.title': 'Company',
    'footer.company.work': 'Our work',
    'footer.company.services': 'Services',
    'footer.company.process': 'Process',
    'footer.company.pricing': 'Pricing',
    'footer.resources.title': 'Resources',
    'footer.resources.faq': 'FAQ',
    'footer.resources.testimonials': 'Testimonials',
    'footer.resources.contact': 'Contact',
    'footer.newsletter.title': 'Stay in the loop',
    'footer.newsletter.desc': 'Monthly updates on features, releases, and practical AI tips.',
    'footer.newsletter.placeholder': 'you@company.com',
    'footer.newsletter.button': 'Subscribe',
    'footer.newsletter.note': 'No spam. Unsubscribe anytime.',
    'footer.copyright': 'All rights reserved.',
  },
  vi: {
    // Navbar
    'nav.home': "Trang chủˆ",
    'nav.collections': 'Bộ sưu tập',
    'nav.newArrivals': 'Hàng mới',
    'nav.about': 'Giới thiệu',
    'nav.contact': 'Liên hệ', 
    'nav.projects': "Dự án",
    
    // Hero
    'hero.title': 'Giải pháp cho doanh nghiệp web & AI',
    'hero.subtitle': 'Chúng tôi thiết kế và xây dựng trải nghiệm web nhanh chóng và tích hợp AI để tự động hóa, cá nhân hóa và mở rộng quy mô doanh nghiệp của bạn.',
    'hero.cta.primary': 'Liên hệ ngay',
    'hero.cta.secondary': 'Dự án của chúng tôi',
    
    // Features
    'features.title': 'Những gì bạn nhận được',
    'features.performance.title': 'Hiệu suất hàng đầu',
    'features.performance.desc': 'Nhanh, dễ tiếp cận và tối ưu hóa cho Core Web Vitals.',
    'features.ai.title': 'Tích hợp AI',
    'features.ai.desc': 'Tích hợp cho tự động hóa, cá nhân hóa và phân tích.',
    'features.design.title': 'Thiết kế tối giản',
    'features.design.desc': 'Giao diện sạch sẽ nhấn mạnh sự rõ ràng và mục đích.',
    'features.scalable.title': 'Kiến trúc mở rộng',
    'features.scalable.desc': 'Thực hành tốt nhất cho độ tin cậy và tăng trưởng dài hạn.',
    
    // Services
    'services.title': 'Dịch vụ',
    'services.web.title': 'Trải nghiệm Web',
    'services.web.desc': 'Trang web và ứng dụng nhanh, dễ tiếp cận và đẹp mắt.',
    'services.web.items.1': 'Frontend Next.js',
    'services.web.items.2': 'Hệ thống thiết kế',
    'services.web.items.3': 'SEO & phân tích',
    'services.ai.title': 'Giải pháp AI',
    'services.ai.desc': 'Tự động hóa, trợ lý và sản phẩm thông minh.',
    'services.ai.items.1': 'Chatbot & RAG',
    'services.ai.items.2': 'Tự động hóa quy trình',
    'services.ai.items.3': 'Cá nhân hóa',
    
    // Process
    'process.title': 'Cách chúng tôi làm việc',
    'process.step1.number': '01',
    'process.step1.title': 'Khám phá',
    'process.step1.desc': 'Chúng tôi bắt đầu bằng việc hiểu tầm nhìn, mục tiêu và thách thức của bạn. Thông qua các cuộc thảo luận hợp tác, chúng tôi xác định phạm vi và thống nhất về kết quả.',
    'process.step2.number': '02',
    'process.step2.title': 'Thiết kế & Xây dựng',
    'process.step2.desc': 'Chúng tôi tạo ra các giải pháp tinh tế và biến chúng thành hiện thực. Mọi chi tiết đều được xem xét—từ trải nghiệm người dùng đến kiến trúc kỹ thuật.',
    'process.step3.number': '03',
    'process.step3.title': 'Ra mắt & Cải tiến',
    'process.step3.desc': 'Chúng tôi triển khai với sự tự tin và theo dõi hiệu suất. Cải tiến liên tục đảm bảo sản phẩm của bạn phát triển theo nhu cầu của bạn.',
    
    // Testimonials
    'testimonials.title': 'Khách hàng nói gì',
    'testimonials.1.quote': 'Họ đã tạo ra một trang web tuyệt đẹp và tự động hóa quy trình của chúng tôi bằng AI.',
    'testimonials.1.author': 'Ava M.',
    'testimonials.1.role': 'Người sáng lập, Nimbus',
    'testimonials.2.quote': 'Hiệu suất tăng vọt và người dùng của chúng tôi yêu thích trải nghiệm mới.',
    'testimonials.2.author': 'Leo P.',
    'testimonials.2.role': 'PM, Atlas',
    'testimonials.3.quote': 'Một đối tác giao hàng nhanh chóng và quan tâm đến chi tiết.',
    'testimonials.3.author': 'Riya S.',
    'testimonials.3.role': 'CTO, Helix',
    
    // Pricing
    'pricing.subtitle': 'Chọn Gói Phù Hợp',
    'pricing.desc': 'Các tùy chọn giá linh hoạt phù hợp với nhu cầu kinh doanh của bạn.',
    'pricing.basic.name': 'Cơ bản',
    'pricing.basic.timeFrame': 'Thời gian hoàn thành 1-3 ngày',
    'pricing.basic.desc': 'Gói website landing page chuyên nghiệp',
    'pricing.standard.name': 'Tiêu chuẩn',
    'pricing.standard.timeFrame': 'Thời gian hoàn thành 7-10 ngày',
    'pricing.standard.desc': 'Gói website cơ bản với đầy đủ tính năng',
    'pricing.premium.name': 'Cao cấp',
    'pricing.premium.timeFrame': 'Thời gian hoàn thành 14-21 ngày',
    'pricing.premium.desc': 'Gói website nâng cao với tính năng tùy chỉnh',
    'pricing.cta': 'Liên hệ ngay',
    'pricing.note': 'Giá đã bao gồm VAT. Liên hệ để được tư vấn chi tiết và báo giá chính xác.',
    
    // FAQ
    'faq.title': 'Câu hỏi thường gặp',
    'faq.subtitle': 'Mọi thứ bạn cần biết về dịch vụ của chúng tôi.',
    
    // CTA
    'cta.title': 'Sẵn sàng xây dựng điều gì đó đặc biệt?',
    'cta.desc': 'Hãy cho chúng tôi biết về mục tiêu của bạn. Chúng tôi sẽ đề xuất một kế hoạch tối giản và có tác động.',
    'cta.primary': 'Bắt đầu dự án',
    'cta.secondary': 'Xem giá',
    
    // Footer
    'footer.brand.desc': 'Giải pháp tối giản, nhanh chóng và chu đáo cho sản phẩm web và AI.',
    'footer.company.title': 'Công ty',
    'footer.company.work': 'Dự án của chúng tôi',
    'footer.company.services': 'Dịch vụ',
    'footer.company.process': 'Quy trình',
    'footer.company.pricing': 'Giá cả',
    'footer.resources.title': 'Tài nguyên',
    'footer.resources.faq': 'FAQ',
    'footer.resources.testimonials': 'Đánh giá',
    'footer.resources.contact': 'Liên hệ',
    'footer.newsletter.title': 'Cập nhật tin tức',
    'footer.newsletter.desc': 'Cập nhật hàng tháng về tính năng, phát hành và mẹo AI thực tế.',
    'footer.newsletter.placeholder': 'you@company.com',
    'footer.newsletter.button': 'Đăng ký',
    'footer.newsletter.note': 'Không spam. Hủy đăng ký bất cứ lúc nào.',
    'footer.copyright': 'Tất cả các quyền được bảo lưu.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage or default to browser language
    try {
      const savedLang = localStorage.getItem('language') as Language | null;
      if (savedLang && (savedLang === 'en' || savedLang === 'vi')) {
        setLanguageState(savedLang);
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('vi')) {
          setLanguageState('vi');
        } else {
          setLanguageState('en');
        }
      }
    } catch (e) {
      setLanguageState('en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (e) {
      // Ignore localStorage errors
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

