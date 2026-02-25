"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface FlagItem {
  code: string;
  src: string;
  alt: string;
  size: number;
  /** Position as % from left */
  x: number;
  /** Position as % from top */
  y: number;
  /** Float animation duration in seconds */
  floatDuration: number;
  /** Float animation delay in seconds */
  floatDelay: number;
  /** Degrees of subtle rotation swing (0 = none) */
  rotate: number;
  /** Whether this flag sits behind the text */
  behind: boolean;
  /** Mobile-specific overrides (null = hidden on mobile) */
  mobile: { x: number; y: number; size: number } | null;
  /** Tablet-specific overrides (null = hidden on tablet) */
  tablet: { x: number; y: number; size: number } | null;
}

const flags: FlagItem[] = [
  // ── TOP AREA ──
  {
    code: "US",
    src: "/flags/clean/us.png",
    alt: "United States",
    size: 90,
    x: 78,
    y: 8,
    floatDuration: 4.2,
    floatDelay: 0,
    rotate: 2,
    behind: false,
    mobile: { x: 80, y: 5, size: 56 },
    tablet: { x: 80, y: 8, size: 72 },
  },
  {
    code: "ES",
    src: "/flags/clean/es.png",
    alt: "Spain",
    size: 85,
    x: 6,
    y: 10,
    floatDuration: 5.1,
    floatDelay: 0.8,
    rotate: -2,
    behind: false,
    mobile: { x: 5, y: 6, size: 52 },
    tablet: { x: 6, y: 10, size: 68 },
  },
  {
    code: "GB",
    src: "/flags/clean/gb.png",
    alt: "United Kingdom",
    size: 70,
    x: 25,
    y: 5,
    floatDuration: 3.8,
    floatDelay: 1.4,
    rotate: 0,
    behind: true,
    mobile: null,
    tablet: { x: 28, y: 5, size: 58 },
  },
  {
    code: "CA",
    src: "/flags/clean/ca.png",
    alt: "Canada",
    size: 70,
    x: 62,
    y: 4,
    floatDuration: 4.6,
    floatDelay: 0.3,
    rotate: 1.5,
    behind: false,
    mobile: null,
    tablet: { x: 65, y: 4, size: 56 },
  },

  // ── LEFT SIDE ──
  {
    code: "FR",
    src: "/flags/clean/fr.png",
    alt: "France",
    size: 55,
    x: 3,
    y: 30,
    floatDuration: 3.4,
    floatDelay: 1.8,
    rotate: 0,
    behind: true,
    mobile: { x: 2, y: 28, size: 40 },
    tablet: { x: 3, y: 30, size: 48 },
  },
  {
    code: "PT",
    src: "/flags/clean/pt.png",
    alt: "Portugal",
    size: 50,
    x: 8,
    y: 50,
    floatDuration: 5.5,
    floatDelay: 0.6,
    rotate: 2.5,
    behind: false,
    mobile: null,
    tablet: { x: 5, y: 48, size: 45 },
  },
  {
    code: "MX",
    src: "/flags/clean/mx.png",
    alt: "Mexico",
    size: 65,
    x: 4,
    y: 70,
    floatDuration: 4.8,
    floatDelay: 1.1,
    rotate: -1.5,
    behind: false,
    mobile: { x: 3, y: 75, size: 48 },
    tablet: { x: 4, y: 70, size: 55 },
  },

  // ── RIGHT SIDE ──
  {
    code: "DE",
    src: "/flags/clean/de.png",
    alt: "Germany",
    size: 55,
    x: 90,
    y: 26,
    floatDuration: 3.6,
    floatDelay: 0.4,
    rotate: 0,
    behind: true,
    mobile: null,
    tablet: { x: 90, y: 26, size: 48 },
  },
  {
    code: "AE",
    src: "/flags/clean/ae.png",
    alt: "UAE",
    size: 80,
    x: 88,
    y: 48,
    floatDuration: 4.4,
    floatDelay: 1.6,
    rotate: -2,
    behind: false,
    mobile: { x: 82, y: 50, size: 52 },
    tablet: { x: 88, y: 48, size: 65 },
  },

  // ── BOTTOM AREA ──
  {
    code: "TH",
    src: "/flags/clean/th.png",
    alt: "Thailand",
    size: 65,
    x: 14,
    y: 85,
    floatDuration: 4.0,
    floatDelay: 0.9,
    rotate: 1,
    behind: false,
    mobile: { x: 10, y: 88, size: 44 },
    tablet: { x: 14, y: 85, size: 55 },
  },
  {
    code: "SG",
    src: "/flags/clean/sg.png",
    alt: "Singapore",
    size: 50,
    x: 30,
    y: 82,
    floatDuration: 3.2,
    floatDelay: 1.3,
    rotate: 0,
    behind: true,
    mobile: null,
    tablet: { x: 30, y: 82, size: 45 },
  },
  {
    code: "JP",
    src: "/flags/clean/jp.png",
    alt: "Japan",
    size: 70,
    x: 84,
    y: 78,
    floatDuration: 5.0,
    floatDelay: 0.2,
    rotate: 2,
    behind: false,
    mobile: { x: 78, y: 82, size: 50 },
    tablet: { x: 84, y: 78, size: 58 },
  },
  {
    code: "AU",
    src: "/flags/clean/au.png",
    alt: "Australia",
    size: 85,
    x: 60,
    y: 84,
    floatDuration: 4.7,
    floatDelay: 0.7,
    rotate: -1,
    behind: false,
    mobile: { x: 60, y: 86, size: 54 },
    tablet: { x: 60, y: 84, size: 68 },
  },
  {
    code: "ID",
    src: "/flags/clean/id.png",
    alt: "Indonesia",
    size: 60,
    x: 20,
    y: 92,
    floatDuration: 3.9,
    floatDelay: 1.7,
    rotate: 0,
    behind: false,
    mobile: null,
    tablet: null,
  },
];

function FlagIcon({ flag }: { flag: FlagItem }) {
  return (
    <motion.div
      className={`absolute will-change-transform ${flag.behind ? "z-0 opacity-65" : "z-20"}`}
      style={{
        left: `${flag.x}%`,
        top: `${flag.y}%`,
        width: flag.size,
        height: flag.size,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: flag.behind ? 0.65 : 1,
        scale: 1,
        y: [0, -14, 0],
        rotate: flag.rotate !== 0 ? [0, flag.rotate, 0, -flag.rotate, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.8, delay: flag.floatDelay * 0.5 },
        scale: { duration: 0.8, delay: flag.floatDelay * 0.5, ease: "easeOut" },
        y: {
          duration: flag.floatDuration,
          delay: flag.floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: flag.rotate !== 0
          ? {
              duration: flag.floatDuration * 1.5,
              delay: flag.floatDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined,
      }}
    >
      <Image
        src={flag.src}
        alt={flag.alt}
        width={flag.size}
        height={flag.size}
        className="pointer-events-none h-full w-full select-none rounded-lg object-contain drop-shadow-lg"
        draggable={false}
      />
    </motion.div>
  );
}

function ResponsiveFlagIcon({ flag }: { flag: FlagItem }) {
  // Desktop: original, Tablet: tablet overrides, Mobile: mobile overrides
  // If mobile/tablet is null, hide on that breakpoint
  const hasMobile = flag.mobile !== null;
  const hasTablet = flag.tablet !== null;

  return (
    <>
      {/* Desktop (lg+) */}
      <div className="hidden lg:block">
        <FlagIcon flag={flag} />
      </div>

      {/* Tablet (md to lg) */}
      {hasTablet && (
        <div className="hidden md:block lg:hidden">
          <FlagIcon
            flag={{
              ...flag,
              x: flag.tablet!.x,
              y: flag.tablet!.y,
              size: flag.tablet!.size,
            }}
          />
        </div>
      )}

      {/* Mobile (<md) */}
      {hasMobile && (
        <div className="block md:hidden">
          <FlagIcon
            flag={{
              ...flag,
              x: flag.mobile!.x,
              y: flag.mobile!.y,
              size: flag.mobile!.size,
            }}
          />
        </div>
      )}
    </>
  );
}

export default function FloatingFlags() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6"
    >
      {/* Floating flags layer */}
      <div className="pointer-events-none absolute inset-0">
        {flags.map((flag) => (
          <ResponsiveFlagIcon key={flag.code} flag={flag} />
        ))}
      </div>

      {/* Centered text — z-10 sits between behind (z-0) and front (z-20) flags */}
      <div className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={textInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base font-normal text-text-secondary md:text-lg"
        >
          Precision day-tracking across
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={textInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-3 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-primary sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]"
        >
          195 countries
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={textInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-primary sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]"
        >
          50 US states
        </motion.h2>
      </div>
    </section>
  );
}
