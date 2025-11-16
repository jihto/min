"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { staggerParent, fadeInUp } from "../utils/animation";

const faqs = [
  {
    q: "How long does a project typically take?",
    a: "Project timelines vary based on scope and complexity. Most standard web applications launch within 2–6 weeks from kickoff. For more complex projects involving custom integrations, advanced features, or large-scale systems, timelines can extend to 8–12 weeks. We work in agile sprints, providing regular updates and demos throughout the development process. During our initial discovery phase, we'll provide a detailed timeline breakdown specific to your project needs.",
  },
  {
    q: "Do you provide ongoing support and maintenance?",
    a: "Yes, we offer comprehensive ongoing support packages tailored to your needs. Our support services include regular updates, security patches, performance monitoring, content management, and feature enhancements. We offer flexible retainer agreements for continuous iteration, content updates, and growth optimization. Additionally, we provide 24/7 monitoring for critical systems and emergency support for urgent issues. Support packages can be customized based on your business requirements and budget.",
  },
  {
    q: "Can you integrate with our existing systems and data?",
    a: "Absolutely. We specialize in integrating with a wide range of systems including CRMs (Salesforce, HubSpot, Pipedrive), CMS platforms (WordPress, Contentful, Strapi), payment gateways (Stripe, PayPal, Square), e-commerce platforms (Shopify, WooCommerce), analytics tools (Google Analytics, Mixpanel), and custom APIs. We also work with databases, cloud services, and third-party APIs. Our team will assess your current tech stack during discovery and create a seamless integration plan that maintains data integrity and workflow efficiency.",
  },
  {
    q: "What technologies and frameworks do you use?",
    a: "We work with modern, industry-standard technologies to ensure scalability, performance, and maintainability. For frontend development, we use React, Next.js, Vue.js, and TypeScript. Our backend expertise includes Node.js, Python (Django, FastAPI), and cloud platforms like AWS, Vercel, and Railway. We're proficient with databases including PostgreSQL, MongoDB, and Redis. We also work with design tools like Figma and implement responsive, accessible designs. We choose technologies based on your project requirements, team preferences, and long-term scalability needs.",
  },
  {
    q: "How do you handle project communication and collaboration?",
    a: "Communication is central to our process. We use Slack or your preferred communication platform for daily updates and quick questions. We schedule weekly sync meetings to review progress, discuss priorities, and address any concerns. All project documentation, designs, and code are shared through collaborative platforms like Notion, GitHub, or your preferred tools. We provide regular demos and progress reports, and you'll have direct access to the development team. We're flexible and can adapt to your preferred communication style and tools.",
  },
  {
    q: "What is your pricing model?",
    a: "We offer flexible pricing models to suit different project types and budgets. For fixed-scope projects, we provide detailed proposals with fixed pricing. For ongoing work or evolving requirements, we offer hourly rates or monthly retainers. We also provide project-based pricing for specific deliverables. During our initial consultation, we'll discuss your project scope, timeline, and budget to recommend the best pricing structure. All pricing is transparent with no hidden fees, and we provide detailed invoices and time tracking when applicable.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Yes, we work with businesses of all sizes, from startups to enterprise clients. We understand that startups often have unique needs including rapid iteration, budget constraints, and the need to validate ideas quickly. We offer flexible engagement models, MVP development services, and can work within various budget ranges. We've helped numerous startups launch their first products and scale as they grow. We're also experienced with enterprise clients who need robust, scalable solutions with comprehensive support.",
  },
  {
    q: "What happens after the project is launched?",
    a: "After launch, we provide a transition period where we monitor the system, fix any immediate issues, and ensure everything is running smoothly. We offer comprehensive documentation including technical documentation, user guides, and maintenance procedures. We can transfer all code, assets, and credentials to your team. Many clients choose to continue with our support and maintenance services, while others take over management internally. We're always available for future enhancements, additional features, or new projects. We ensure a smooth handoff regardless of your chosen path forward.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative w-full overflow-hidden bg-[var(--section-bg)] px-6 py-24 text-[var(--text-primary)]">
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-lg text-[var(--text-tertiary)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about working with us
          </motion.p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 gap-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                variants={fadeInUp}
                className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm"
                whileHover={{ borderColor: "var(--card-border)", scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  className="flex w-full items-center justify-between bg-[var(--card-bg)] px-6 py-4 text-left transition-all hover:bg-[var(--card-bg)]"
                  onClick={() => setOpen(isOpen ? null : i)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="pr-8 text-base font-semibold text-[var(--text-primary)] sm:text-sm">
                    {f.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-[var(--text-tertiary)]" />
                  </motion.div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="px-6 pb-4 pt-2 text-[var(--text-secondary)] leading-relaxed"
                      >
                        <div className="space-y-3">
                          {f.a.split(". ").map((sentence, idx) => (
                            <motion.p
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.15 + idx * 0.05 }}
                              className="text-sm sm:text-base"
                            >
                              {sentence.trim()}
                              {idx < f.a.split(". ").length - 1 && "."}
                            </motion.p>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}


