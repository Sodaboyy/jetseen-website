"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const beliefs = [
  {
    title: "Accuracy is non-negotiable.",
    body: "When one miscounted day can trigger a tax audit or an entry ban, \"pretty close\" isn't good enough. Jetseen calculates rolling windows day-by-day, handles multi-country transit days correctly, excludes transition days properly, and accounts for leap years. Every calculation is transparent so you can verify it yourself.",
  },
  {
    title: "You should control your own data.",
    body: "We don't track your GPS. We don't need your location permissions. We don't quietly stop working when your battery drops below 20% or your phone hasn't opened the app in two months. You enter your trips. You verify your data. You own it.",
  },
  {
    title: "A compliance tool should reduce anxiety, not create it.",
    body: "Confusing pricing tiers, hidden feature gates, unreliable automation — these aren't just bad product design. They're dangerous when the stakes are tax audits, visa violations, and years of residency progress. Jetseen is one plan, one price, full transparency.",
  },
  {
    title: "Telling you there's a problem isn't enough.",
    body: "Any calculator can flag that you'll overstay. Jetseen tells you what to do about it — exactly how many days to delay, when old trips drop off your rolling window, and which dates give you capacity. That's the difference between a tool and an advisor.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ═══════ HERO ═══════ */}
        <section className="relative overflow-hidden pb-20 pt-32 md:pb-24 md:pt-40">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-primary md:text-5xl"
            >
              We built Jetseen because the alternatives kept failing.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10 space-y-6"
            >
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                Every existing solution for tracking residency days has the same
                problem: you can&apos;t trust it when it matters most.
              </p>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                Spreadsheets break silently. One wrong formula and five years of
                visa progress is fiction. GPS tracking apps promise &quot;set and
                forget&quot; but deliver gaps, miscounts, and months of missing data.
                And when an app shuts down — like TravelTracker did — your records
                disappear with it.
              </p>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                We watched digital nomads build their own tracking tools out of
                desperation. We read forum posts from expats who discovered at the
                border that their &quot;40 remaining days&quot; was actually 36. We
                talked to people who paid $30 for an app only to find the features
                they tested were locked behind a second upgrade.
              </p>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                Jetseen exists because the people who need accurate day tracking the
                most are the ones being served the worst.
              </p>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/60 via-white to-white" />
        </section>

        {/* ═══════ BELIEFS ═══════ */}
        <section className="bg-surface py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                What we believe
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {beliefs.map((belief, i) => (
                <AnimatedSection key={i} delay={0.1 * i}>
                  <div className="h-full rounded-xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg md:p-10">
                    <h3 className="font-display text-xl font-bold text-primary">
                      {belief.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                      {belief.body}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section className="bg-primary py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Built for the way you actually track your days.
              </h2>
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
