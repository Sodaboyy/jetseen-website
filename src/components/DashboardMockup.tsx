"use client";

import { motion } from "framer-motion";

const DAYS_IN_MONTH = [31, 28, 31]; // Jan, Feb, Mar
const MONTH_LABELS = ["January", "February", "March"];

// Mock data: color-coded days
// g = green (safe), r = red (danger), a = amber (warning), n = neutral/empty
const dayColors: Record<string, Record<number, string>> = {
  "0": { 3: "g", 4: "g", 5: "g", 6: "g", 7: "g", 8: "g", 9: "g", 10: "g", 11: "g", 12: "g", 15: "a", 16: "a", 17: "a", 18: "a", 22: "g", 23: "g", 24: "g", 25: "g", 26: "g", 27: "g", 28: "g" },
  "1": { 1: "g", 2: "g", 3: "g", 4: "g", 8: "r", 9: "r", 10: "r", 11: "r", 12: "r", 13: "r", 14: "r", 15: "r", 16: "r", 17: "r", 18: "r", 22: "a", 23: "a", 24: "a", 25: "a", 26: "a" },
  "2": { 1: "g", 2: "g", 3: "g", 5: "g", 6: "g", 7: "g", 8: "g", 9: "g", 10: "g", 14: "a", 15: "a", 16: "a", 20: "g", 21: "g", 22: "g", 23: "g", 24: "g", 25: "g", 26: "g", 27: "g", 28: "g" },
};

const countryLabels: Record<string, { month: number; day: number; label: string; color: string }[]> = {
  tags: [
    { month: 0, day: 5, label: "DE", color: "bg-emerald-500" },
    { month: 0, day: 16, label: "FR", color: "bg-amber-500" },
    { month: 1, day: 10, label: "ES", color: "bg-red-500" },
    { month: 1, day: 23, label: "PT", color: "bg-amber-500" },
    { month: 2, day: 3, label: "NL", color: "bg-emerald-500" },
    { month: 2, day: 15, label: "IT", color: "bg-amber-500" },
    { month: 2, day: 22, label: "DE", color: "bg-emerald-500" },
  ],
};

function getColor(monthIdx: number, day: number): string {
  const c = dayColors[String(monthIdx)]?.[day];
  if (c === "g") return "bg-emerald-400/80";
  if (c === "r") return "bg-red-400/80";
  if (c === "a") return "bg-amber-400/80";
  return "bg-slate-100";
}

export default function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative mx-auto mt-16 w-full max-w-4xl"
    >
      {/* Browser frame */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="mx-auto rounded-md bg-slate-200 px-4 py-1 text-xs text-slate-500">
            app.jetseen.com
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6">
          {/* Top bar */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Compliance Dashboard</p>
              <p className="text-xs text-slate-500">2026 — Schengen Zone</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-700">47 days remaining</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-xs font-medium text-red-700">43 / 90 used</span>
              </div>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {MONTH_LABELS.map((month, monthIdx) => (
              <div key={month} className="rounded-lg border border-slate-100 p-3">
                <p className="mb-2 text-xs font-semibold text-slate-700">{month}</p>
                <div className="grid grid-cols-7 gap-1">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <div key={i} className="text-center text-[9px] font-medium text-slate-400">
                      {d}
                    </div>
                  ))}
                  {/* Offset for first day (simplified: Jan starts Wed, Feb starts Sat, Mar starts Sat) */}
                  {Array.from({ length: [2, 5, 5][monthIdx] }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: DAYS_IN_MONTH[monthIdx] }).map((_, i) => {
                    const day = i + 1;
                    const tag = countryLabels.tags.find(
                      (t) => t.month === monthIdx && t.day === day
                    );
                    return (
                      <div
                        key={day}
                        className={`relative flex h-5 w-full items-center justify-center rounded text-[9px] font-medium ${getColor(
                          monthIdx,
                          day
                        )} ${
                          dayColors[String(monthIdx)]?.[day]
                            ? "text-white"
                            : "text-slate-400"
                        }`}
                      >
                        {day}
                        {tag && (
                          <span
                            className={`absolute -top-1.5 -right-1 rounded px-0.5 text-[6px] font-bold text-white ${tag.color}`}
                          >
                            {tag.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom stats row */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[
              { label: "Schengen (90/180)", value: "43 / 90", status: "text-amber-600 bg-amber-50" },
              { label: "UK SRT", value: "12 / 183", status: "text-emerald-600 bg-emerald-50" },
              { label: "US SPT", value: "28 / 183", status: "text-emerald-600 bg-emerald-50" },
              { label: "Portugal NHR", value: "61 / 183", status: "text-amber-600 bg-amber-50" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-slate-100 p-2.5 text-center"
              >
                <p className="text-[10px] text-slate-500">{stat.label}</p>
                <p className={`mt-1 rounded-full px-2 py-0.5 text-xs font-bold ${stat.status}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-b from-accent/5 to-transparent blur-2xl" />
    </motion.div>
  );
}
