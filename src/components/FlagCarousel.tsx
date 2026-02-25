"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const flags = [
  { src: "/flags/clean/us.png", alt: "United States" },
  { src: "/flags/clean/de.png", alt: "Germany" },
  { src: "/flags/clean/fr.png", alt: "France" },
  { src: "/flags/clean/es.png", alt: "Spain" },
  { src: "/flags/clean/pt.png", alt: "Portugal" },
  { src: "/flags/clean/gb.png", alt: "United Kingdom" },
  { src: "/flags/clean/ae.png", alt: "UAE" },
  { src: "/flags/clean/au.png", alt: "Australia" },
  { src: "/flags/clean/ca.png", alt: "Canada" },
  { src: "/flags/clean/sg.png", alt: "Singapore" },
  { src: "/flags/clean/th.png", alt: "Thailand" },
  { src: "/flags/clean/jp.png", alt: "Japan" },
  { src: "/flags/clean/id.png", alt: "Indonesia" },
  { src: "/flags/clean/mx.png", alt: "Mexico" },
];

// How many icons visible in the stack at once (front + behind)
const VISIBLE_COUNT = 3;

export default function FlagCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % flags.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, 2200);
    return () => clearInterval(interval);
  }, [advance]);

  // Build the visible stack: current + next VISIBLE_COUNT-1 items
  const visibleFlags = Array.from({ length: VISIBLE_COUNT }, (_, i) => {
    const idx = (currentIndex + i) % flags.length;
    return { ...flags[idx], stackIndex: i, key: `${currentIndex}-${i}` };
  });

  return (
    <div className="relative mx-auto mb-8 h-[72px] w-[72px] md:mb-10 md:h-[88px] md:w-[88px]">
      {/* Render back-to-front so front icon is on top */}
      {visibleFlags
        .slice()
        .reverse()
        .map((flag) => {
          const i = flag.stackIndex;
          // Front icon (i=0): full size, full opacity
          // Behind icons: progressively smaller, more transparent, shifted down
          const scale = 1 - i * 0.08;
          const yOffset = i * -6;
          const opacity = i === 0 ? 1 : 0.4 - i * 0.15;

          return (
            <motion.div
              key={flag.key}
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: VISIBLE_COUNT - i }}
              initial={
                i === 0
                  ? { scale: 0.84, y: -12, opacity: 0.25 }
                  : undefined
              }
              animate={{
                scale,
                y: yOffset,
                opacity,
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="h-full w-full overflow-hidden rounded-[18px] bg-white shadow-md md:rounded-[22px]">
                <Image
                  src={flag.src}
                  alt={flag.alt}
                  width={88}
                  height={88}
                  className="h-full w-full object-cover"
                  priority={i === 0}
                />
              </div>
            </motion.div>
          );
        })}

      {/* Exiting front icon — fades and scales up/out */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: VISIBLE_COUNT + 1 }}
          initial={{ scale: 1, opacity: 1 }}
          exit={{
            scale: 1.15,
            opacity: 0,
            transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
          }}
        >
          <div className="h-full w-full overflow-hidden rounded-[18px] bg-white shadow-md md:rounded-[22px]">
            <Image
              src={flags[currentIndex].src}
              alt={flags[currentIndex].alt}
              width={88}
              height={88}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
