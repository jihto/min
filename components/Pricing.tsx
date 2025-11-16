"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { staggerParent, fadeInUp, scaleIn, hoverTap } from "../utils/animation";


type Plan = {
  name: string;
  timeFrame: string;
  monthly: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
};

const rawPlans: Plan[] = [
  {
    name: "Cơ bản",
    timeFrame: "Thời gian hoàn thành 1-3 ngày",
    monthly: "2.000.000",
    description: "Gói website landing page chuyên nghiệp",
    features: [
      "Giao diện có sẵn template chỉnh sửa theo yêu cầu tối đa 3 lần",
      "Cấu trúc chuẩn SEO",
      "Dễ dàng nâng cấp",
      "Tùy chỉnh giao diện kéo thả",
      "Bảo mật SSL",
      "Tặng hosting lưu trữ miễn phí năm đầu",
      "Form thu thập thông tin khách hàng",
      "Hỗ trợ nhúng mã Facebook Pixel, Google Ads, Google Analytics",
      "Bảo hành 1 năm, hỗ trợ kĩ thuật 24/7",
    ],
    cta: "Chọn gói này",
  },
  {
    name: "Tiêu chuẩn",
    timeFrame: "Thời gian hoàn thành 7-10 ngày",
    monthly: "8.000.000",
    description: "Gói website cơ bản với đầy đủ tính năng",
    features: [
      "Bao gồm các tính năng của gói cơ bản",
      "Giao diện có sẵn demo và có thiết kế riêng chỉnh sửa theo yêu cầu",
      "Hỗ trợ upload 10 bài viết và sản phẩm",
      "Giao diện admin quản lý nội dung",
      "Bảo hành website năm đầu",
      "Tặng tên miền phù hợp trong 01 năm đầu tiên",
      "Tặng hosting 4GB trong 01 năm đầu tiên",
      "Hỗ trợ xây dựng nội dung 5 trang chính",
      "Website đa ngôn ngữ",
    ],
    cta: "Chọn gói này",
    highlighted: true,
    badge: "Phổ Biến",
  },
  {
    name: "Nâng Cao",
    timeFrame: "Thời gian hoàn thành > 10 ngày",
    monthly: "Contact",
    description: "Gói website với tính năng toàn diện",
    features: [
      "Bao gồm các tính năng của gói tiêu chuẩn",
      "Tính năng quản lý bán hàng, doanh thu...",
      "Tặng hosting 8GB trong 01 năm đầu tiên",
      "Tư vấn Marketing (nếu có yêu cầu)",
      "Giao diện admin quản lý bán hàng, doanh thu...",
      "Hỗ trợ xây dựng nội dung > 5 trang chính",
      "Website đa ngôn ngữ",
      "Chỉnh sửa tùy chỉnh theo yêu cầu",
    ],
    cta: "Liên hệ",
  },
  {
    name: "AI",
    timeFrame: "Thời gian hoàn thành > 10 ngày",
    monthly: "Contact",
    description: "Gói website tích hợp tính năng AI",
    features: [
      "Tất cả tính năng gói Nâng Cao",
      "Chatbot AI thông minh tự động trả lời khách hàng",
      "Hệ thống đề xuất sản phẩm thông minh dựa trên AI",
      "Tự động tạo nội dung và mô tả sản phẩm",
      "Hệ thống báo cáo và phân tích dữ liệu thông minh",
      "Tích hợp AI để tối ưu trải nghiệm người dùng",
      "Hỗ trợ đa ngôn ngữ với AI translation",
    ],
    cta: "Liên hệ",
  },
];

export default function Pricing() {
  const plans = useMemo(() => rawPlans, []);

  return (
    <section id="pricing" className="relative w-full overflow-hidden bg-[var(--section-bg)] px-6 py-28 text-[var(--text-primary)]">
      {/* Full dotted background */}
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--text-primary)_0.21_1px,transparent_1px)] bg-size-[12px_12px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <motion.p
            className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--text-tertiary)]"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Pricing
          </motion.p>
          <motion.h2
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Chọn Gói Phù Hợp
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Bảng giá linh hoạt phù hợp với nhu cầu của bạn. Liên hệ để được tư vấn chi tiết.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((plan) => {
            const price = plan.monthly;
            const per = plan.monthly.toLowerCase() === "contact" ? "" : "VNĐ";
            const highlighted = Boolean(plan.highlighted);
            return (
              <motion.div key={plan.name} variants={scaleIn} className="group relative h-full flex flex-col">
                {/* Gradient border wrapper for highlighted */}
                <div
                  className={
                    "relative rounded-2xl p-px h-full flex flex-col" +
                    (highlighted
                      ? " bg-[linear-gradient(120deg,var(--text-primary)_0.35,var(--text-primary)_0.08)] shadow-[0_0_40px_-10px_var(--text-primary)_0.25]"
                      : " bg-[var(--card-bg)]")
                  }
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-4 rounded-full border border-[var(--border-color)] bg-[var(--text-primary)] px-2 py-0.5 text-xs font-medium capitalize tracking-wide text-[var(--background)]">
                      {plan.badge}
                    </div>
                  )}

                  {/* Card */}
                  <div
                    className={
                      "relative flex h-full flex-col rounded-2xl border p-4 transition-transform duration-200 group-hover:-translate-y-0.5" +
                      (highlighted
                        ? " border-[var(--card-border)] bg-[var(--card-bg)]"
                        : " border-[var(--card-border)] bg-[var(--card-bg)]")
                    }
                  >
                    <div className="mb-2 text-sm text-[var(--text-secondary)]">{plan.name}</div>
                    <div className="mb-1 flex items-baseline gap-2">
                      <div className="text-3xl font-semibold text-[var(--text-primary)]">{price}</div>
                      <div className="text-sm text-[var(--text-tertiary)]">{per}</div>
                    </div>
                    <div className="mb-2 text-xs text-[var(--text-tertiary)]">{plan.timeFrame}</div>
                    <div className="mb-6 text-sm text-[var(--text-tertiary)]">{plan.description}</div>

                    <ul className="flex flex-1 list-none flex-col gap-2 text-sm text-[var(--text-secondary)] items-start justify-start">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          {/* Check icon */} -
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-8 text-center text-xs text-[var(--text-tertiary)]">
          Giá đã bao gồm VAT. Liên hệ để được tư vấn chi tiết và báo giá chính xác.
        </div> 
        <div className="flex justify-center mt-4 items-center gap-3">
          <motion.a
            href="#contact"
            className={
              "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-[var(--text-primary)] text-[var(--background)] hover:opacity-90" 
            }
            whileHover={hoverTap.whileHover}
            whileTap={hoverTap.whileTap}
          >
            Liên hệ ngay
          </motion.a>
        </div>
      </div>
    </section>
  );
}


