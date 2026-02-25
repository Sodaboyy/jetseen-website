"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const flags = [
  { src: "/flags/app/us.png", alt: "United States" },
  { src: "/flags/app/de.png", alt: "Germany" },
  { src: "/flags/app/fr.png", alt: "France" },
  { src: "/flags/app/es.png", alt: "Spain" },
  { src: "/flags/app/pt.png", alt: "Portugal" },
  { src: "/flags/app/gb.png", alt: "United Kingdom" },
  { src: "/flags/app/ae.png", alt: "UAE" },
  { src: "/flags/app/au.png", alt: "Australia" },
  { src: "/flags/app/ca.png", alt: "Canada" },
  { src: "/flags/app/sg.png", alt: "Singapore" },
  { src: "/flags/app/th.png", alt: "Thailand" },
  { src: "/flags/app/jp.png", alt: "Japan" },
  { src: "/flags/app/id.png", alt: "Indonesia" },
  { src: "/flags/app/mx.png", alt: "Mexico" },
];

const variants = {
  enter: { y: "-100%", opacity: 0, scale: 0.8 },
  center: { y: "0%", opacity: 1, scale: 1 },
  exit: { y: "100%", opacity: 0, scale: 0.8 },
};

export default function FlagCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % flags.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, 2400);
    return () => clearInterval(interval);
  }, [advance]);

  return (
    <div className="relative mx-auto mb-8 h-[80px] w-[80px] overflow-hidden md:mb-10 md:h-[96px] md:w-[96px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 280, damping: 26, mass: 0.8 },
            opacity: { duration: 0.25 },
            scale: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={flags[currentIndex].src}
            alt={flags[currentIndex].alt}
            width={96}
            height={96}
            className="h-full w-full object-contain"
            priority={currentIndex < 3}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
