"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`w-full max-w-3xl rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "border-slate-200 bg-white/80 shadow-lg backdrop-blur-xl"
            : "border-slate-200/60 bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-base font-extrabold tracking-tight text-primary"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
              <rect width="20" height="20" rx="4" fill="#111827" />
              <path d="M5 10l3.5 3.5L15 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Jetseen
          </Link>

          {/* Desktop Links + Auth */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === "/about"
                  ? "text-primary"
                  : "text-text-secondary hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              Log in
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="flex flex-col gap-[5px] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 7, background: "#111827" }
                  : { rotate: 0, y: 0, background: "#111827" }
              }
              className="block h-[2px] w-5 rounded-full bg-primary"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[2px] w-5 rounded-full bg-primary"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -7, background: "#111827" }
                  : { rotate: 0, y: 0, background: "#111827" }
              }
              className="block h-[2px] w-5 rounded-full bg-primary"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-slate-100"
            >
              <div className="space-y-1 px-4 pb-4 pt-3">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-slate-50 hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-slate-50 hover:text-primary"
                >
                  About
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-slate-50 hover:text-primary"
                >
                  Log in
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
