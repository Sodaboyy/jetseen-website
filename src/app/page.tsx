"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import DashboardMockup from "@/components/DashboardMockup";
import NotificationCard from "@/components/NotificationCard";
import FeatureCard from "@/components/FeatureCard";
import FlagCarousel from "@/components/FlagCarousel";
import FloatingFlags from "@/components/FloatingFlags";

/* ─────────── Icons ─────────── */
const GlobeIcon = (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const EyeIcon = (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const MapIcon = (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ═══════ HERO — Mobbin style ═══════ */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
          <div className="mx-auto w-full max-w-4xl pt-28 text-center">
            {/* Rotating flag icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <FlagCarousel />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-[2.75rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary md:text-[3.5rem] lg:text-[4.25rem]"
            >
              Know exactly where
              <br />
              you stand. In every
              <br />
              country. Every day.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg"
            >
              Jetseen tracks your days across borders so you never accidentally
              trigger tax residency, overstay a visa, or fail an audit.
              <br className="hidden md:block" />
              No GPS. No guesswork. Just clarity.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                Start tracking free
              </Link>
              <a
                href="#how-it-works"
                className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-primary transition-all hover:border-slate-300 hover:shadow-sm"
              >
                See how it works
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Trusted by strip — at bottom of hero viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-auto w-full pb-12 pt-20"
          >
            <p className="mb-6 text-center text-xs font-medium tracking-wider text-text-secondary/60 uppercase">
              Trusted by digital nomads tracking days in
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-slate-300 md:gap-x-12">
              {[
                "Schengen Zone",
                "United States",
                "United Kingdom",
                "UAE",
                "Portugal",
                "Thailand",
                "Canada",
                "Australia",
              ].map((name) => (
                <span key={name} className="whitespace-nowrap">{name}</span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══════ PRODUCT SHOWCASE ═══════ */}
        <section className="bg-surface px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <DashboardMockup />
          </div>
        </section>

        {/* ═══════ FLOATING FLAGS + STATS ═══════ */}
        <FloatingFlags />

        {/* ═══════ STATS BAR ═══════ */}
        <section className="border-y border-slate-200 bg-primary">
          <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8">
            <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
              {[
                { value: "183", label: "The day count that changes everything" },
                { value: "90", label: "The Schengen rule that trips up thousands", suffix: "/180" },
                { value: "$10,000", label: "Average cost of a residency tax audit", suffix: "+" },
              ].map((stat, i) => (
                <AnimatedSection key={i} delay={0.1 * i}>
                  <div className="text-3xl font-extrabold text-white md:text-4xl">
                    <CountUp value={stat.value} />
                    {stat.suffix && (
                      <span className="text-slate-500">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ PROBLEM ═══════ */}
        <section id="problem" className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
                Tracking days across borders shouldn&apos;t feel like defusing a
                bomb.
              </h2>
            </AnimatedSection>
            <div className="mt-10 space-y-6">
              <AnimatedSection delay={0.1}>
                <p className="text-base leading-[1.75] text-text-secondary md:text-lg">
                  You&apos;re building a life across countries. But every destination
                  comes with a countdown you can&apos;t afford to lose track of. Tax
                  residency thresholds. Visa limits. Rolling windows that reset one
                  day at a time, not in bulk. Miss the count by a single day and the
                  consequences are real — tax audits, overstay fines, entry bans, or
                  years of visa progress wiped clean.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="text-base leading-[1.75] text-text-secondary md:text-lg">
                  So you built a spreadsheet. And now you&apos;re too scared to touch it
                  in case you break a formula.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <p className="text-base leading-[1.75] text-text-secondary md:text-lg">
                  Or you tried an auto-tracking app. And discovered it logged 18 days
                  over 8 months.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <p className="mt-4 font-display text-xl font-bold text-primary md:text-2xl">
                  There has to be a better way.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ═══════ SOLUTION CARDS ═══════ */}
        <section id="how-it-works" className="bg-surface py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
                Jetseen gives you something no spreadsheet or GPS tracker can:
                confidence.
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FeatureCard
                index={0}
                icon={GlobeIcon}
                title="Track with precision"
                description="Add your trips manually — the way you already prefer. Jetseen handles the math that spreadsheets get wrong: rolling window drop-offs (day by day, not bulk), multi-country transit days, transition-day exclusions, and leap years. Every calculation is transparent and verifiable."
              />
              <FeatureCard
                index={1}
                icon={EyeIcon}
                title="See your status at a glance"
                description="A color-coded calendar dashboard shows exactly where you stand in every jurisdiction. Red means danger. Green means safe. No cognitive translation needed. Spot patterns, see your runway, and identify safe travel windows instantly."
              />
              <FeatureCard
                index={2}
                icon={MapIcon}
                title="Plan ahead without the anxiety"
                description="Test future trips before you book them. Jetseen's scenario planner shows exactly how a planned trip affects your day counts — without touching your real data. And when a trip would cause an overstay, Jetseen doesn't just warn you. It tells you how to fix it."
              />
            </div>
          </div>
        </section>

        {/* ═══════ PROACTIVE GUIDANCE ═══════ */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div>
                <AnimatedSection>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
                    Other apps tell you there&apos;s a problem. Jetseen tells you how
                    to fix it.
                  </h2>
                </AnimatedSection>
                <AnimatedSection delay={0.1}>
                  <p className="mt-6 text-base leading-[1.75] text-text-secondary md:text-lg">
                    Planning a trip that would push you over a threshold? Jetseen
                    won&apos;t just flash a red warning. It will tell you:
                  </p>
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                  <p className="mt-8 font-display text-lg font-bold text-primary">
                    This turns a day counter into a compliance advisor.
                  </p>
                </AnimatedSection>
              </div>

              <div className="space-y-4">
                <NotificationCard
                  index={0}
                  icon="delay"
                  message="Delay your trip by 5 days to stay compliant"
                />
                <NotificationCard
                  index={1}
                  icon="window"
                  message="On April 20, your October trip drops off the rolling window, freeing 14 days"
                />
                <NotificationCard
                  index={2}
                  icon="suggest"
                  message="Start April 21 instead of April 15 and you'll have 19 days of capacity"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ TRUST & EXPORT ═══════ */}
        <section className="bg-surface py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              {/* Visual */}
              <AnimatedSection className="order-2 lg:order-1">
                <div className="flex items-center justify-center gap-8">
                  {/* PDF mock */}
                  <div className="flex h-52 w-40 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-red-500">
                        PDF
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-16 rounded bg-slate-200" />
                        <div className="h-1.5 w-11 rounded bg-slate-100" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-1.5 w-full rounded bg-slate-100" />
                      <div className="h-1.5 w-full rounded bg-slate-100" />
                      <div className="h-1.5 w-3/4 rounded bg-slate-100" />
                      <div className="mt-3 h-1.5 w-full rounded bg-slate-100" />
                      <div className="h-1.5 w-full rounded bg-slate-100" />
                      <div className="h-1.5 w-2/3 rounded bg-slate-100" />
                    </div>
                  </div>
                  {/* CSV mock */}
                  <div className="flex h-52 w-40 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-500">
                        CSV
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-16 rounded bg-slate-200" />
                        <div className="h-1.5 w-11 rounded bg-slate-100" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex gap-1">
                          <div className="h-1.5 w-1/3 rounded bg-slate-200" />
                          <div className="h-1.5 w-1/3 rounded bg-slate-100" />
                          <div className="h-1.5 w-1/3 rounded bg-slate-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Copy */}
              <AnimatedSection className="order-1 lg:order-2">
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
                  Built for the people who actually check your numbers.
                </h2>
                <p className="mt-6 text-base leading-[1.75] text-text-secondary md:text-lg">
                  Your travel data exists to satisfy immigration officers, tax
                  authorities, and advisors — not just you. Jetseen exports
                  audit-ready PDFs that look professional at passport control, and
                  CSVs your tax advisor can actually work with. Every entry includes
                  the detail auditors demand: dates, locations, entry/exit records,
                  purpose, and source documentation.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ═══════ PRICING ═══════ */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl lg:text-[2.75rem]">
                One plan. Everything included.
                <br />
                No surprises.
              </h2>
              <p className="mt-4 text-base text-text-secondary md:text-lg">
                Other apps lock core features behind confusing tier upgrades. Jetseen
                doesn&apos;t.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="mx-auto max-w-md">
              <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
                <div className="text-center">
                  <h3 className="font-display text-xl font-bold text-primary">
                    Jetseen
                  </h3>
                  <div className="mt-5">
                    <span className="font-display text-5xl font-extrabold tracking-tight text-primary">
                      $59.99
                    </span>
                    <span className="text-base text-text-secondary">/year</span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">$4.96/mo</p>
                </div>

                <ul className="mt-8 space-y-3.5">
                  {[
                    "Full day tracking across unlimited countries and states",
                    "Visual compliance calendar",
                    "Proactive alerts and guidance",
                    "Scenario planning for future trips",
                    "Audit-ready PDF and CSV exports",
                    "Unlimited jurisdictions and rules",
                    "Cloud-based — your data is always safe",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm leading-relaxed text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/login"
                  className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Start tracking free
                </Link>
              </div>

              <p className="mt-6 text-center text-sm text-text-secondary">
                That&apos;s less than one coworking day per month. And a fraction of
                what a single tax audit costs.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════ FINAL CTA ═══════ */}
        <section className="bg-primary py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                Stop counting days in your head.
                <br />
                Start knowing.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base text-slate-400 md:text-lg">
                Jetseen gives you the one thing spreadsheets and GPS trackers never
                could: peace of mind.
              </p>
              <Link
                href="/login"
                className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg"
              >
                Start tracking free
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
