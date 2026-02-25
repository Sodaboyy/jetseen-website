"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 * index, ease: [0.25, 0.1, 0.25, 1] }}
      className="group rounded-2xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-10"
    >
      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>
      <h3 className="mb-3 text-base font-bold text-primary">{title}</h3>
      <p className="text-sm leading-[1.7] text-text-secondary">{description}</p>
    </motion.div>
  );
}
