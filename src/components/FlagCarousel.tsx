"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const flags = [
  { src: "/flags/usa.svg", alt: "United States" },
  { src: "/flags/germany.svg", alt: "Germany" },
  { src: "/flags/france.svg", alt: "France" },
  { src: "/flags/spain.svg", alt: "Spain" },
  { src: "/flags/portugal.svg", alt: "Portugal" },
  { src: "/flags/italy.svg", alt: "Italy" },
  { src: "/flags/netherlands.svg", alt: "Netherlands" },
  { src: "/flags/united-arab-emirates.svg", alt: "UAE" },
  { src: "/flags/great-britain.svg", alt: "United Kingdom" },
  { src: "/flags/australia.svg", alt: "Australia" },
  { src: "/flags/canada.svg", alt: "Canada" },
  { src: "/flags/singapore.svg", alt: "Singapore" },
  { src: "/flags/thailand.svg", alt: "Thailand" },
  { src: "/flags/japan.svg", alt: "Japan" },
  { src: "/flags/brazil.svg", alt: "Brazil" },
  { src: "/flags/ireland.svg", alt: "Ireland" },
  { src: "/flags/sweden.svg", alt: "Sweden" },
  { src: "/flags/switzerland.svg", alt: "Switzerland" },
];

export default function FlagCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = downward

  const advance = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % flags.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, 2400);
    return () => clearInterval(interval);
  }, [advance]);

  // Vertical slide-through like Mobbin's slot-machine effect:
  // New icon enters from above, old icon exits downward
  const variants = {
    enter: {
      y: "-100%",
      opacity: 0,
      scale: 0.8,
    },
    center: {
      y: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: {
      y: "100%",
      opacity: 0,
      scale: 0.8,
    },
  };

  return (
    <div className="relative mx-auto mb-8 h-[80px] w-[80px] md:mb-10 md:h-[96px] md:w-[96px]">
      {/* Top slot/notch — the "dispenser" slit */}
      <div
        className="absolute left-1/2 z-20 -translate-x-1/2"
        style={{ top: -6 }}
      >
        <div className="h-[10px] w-[28px] rounded-b-[6px] bg-[#e8e8ec]" />
      </div>

      {/* Squircle icon container */}
      <div
        className="relative h-full w-full overflow-hidden bg-[#f5f5f7]"
        style={{
          borderRadius: "22px",
          // iOS squircle approximation via mask
          WebkitMaskImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' ry='22' fill='black'/%3E%3C/svg%3E\")",
          WebkitMaskSize: "100% 100%",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
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
              width={64}
              height={64}
              className="h-[52px] w-[52px] object-contain md:h-[64px] md:w-[64px]"
              priority={currentIndex < 3}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle shadow beneath the container */}
      <div
        className="absolute -bottom-2 left-1/2 -z-10 h-6 w-[70%] -translate-x-1/2 rounded-full bg-black/[0.04] blur-md"
      />
    </div>
  );
}
