"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flags.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto mb-10 h-[88px] w-[88px]">
      {/* Notch / slot at top */}
      <div className="absolute -top-1.5 left-1/2 z-10 h-3 w-8 -translate-x-1/2 rounded-b-md bg-slate-200/80" />

      {/* Flag container */}
      <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-slate-100 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex h-full w-full items-center justify-center"
            style={{ perspective: 600 }}
          >
            <Image
              src={flags[currentIndex].src}
              alt={flags[currentIndex].alt}
              width={72}
              height={72}
              className="h-[72px] w-[72px] object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
