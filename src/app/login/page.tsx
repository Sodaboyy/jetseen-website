"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type Tab = "signup" | "login";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<Tab>("signup");

  return (
    <div className="flex min-h-screen">
      {/* ═══════ LEFT PANEL ═══════ */}
      <div className="hidden w-[40%] flex-col justify-between bg-primary p-12 lg:flex">
        <Link href="/" className="inline-block">
          <Image
            src="/jetseen-logo.png"
            alt="Jetseen"
            width={200}
            height={161}
            className="h-9 w-auto brightness-0 invert"
          />
        </Link>

        <div>
          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white">
            Your compliance dashboard is waiting.
          </h1>

          <ul className="mt-10 space-y-6">
            {[
              "See your day counts across every jurisdiction at a glance",
              "Get proactive alerts before you hit a threshold",
              "Export audit-ready reports in seconds",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm leading-relaxed text-slate-400">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Jetseen
        </p>
      </div>

      {/* ═══════ RIGHT PANEL ═══════ */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="mb-8 inline-block lg:hidden">
          <Image
            src="/jetseen-logo.png"
            alt="Jetseen"
            width={200}
            height={161}
            className="h-9 w-auto"
          />
        </Link>

        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="mb-8 flex rounded-lg border border-slate-200 bg-surface p-1">
            {(["signup", "login"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-white text-primary shadow-sm"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                {tab === "signup" ? "Sign Up" : "Log In"}
              </button>
            ))}
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {activeTab === "signup" ? (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Create a password"
                    minLength={6}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Create free account
                </button>

                <p className="text-center text-sm text-text-secondary">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="font-medium text-accent hover:text-accent-hover"
                  >
                    Log in
                  </button>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs font-medium text-accent hover:text-accent-hover"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Log in
                </button>

                <p className="text-center text-sm text-text-secondary">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("signup")}
                    className="font-medium text-accent hover:text-accent-hover"
                  >
                    Sign up free
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Trust text */}
          <div className="mt-8 flex items-center gap-2 rounded-lg bg-surface px-4 py-3">
            <svg
              className="h-4 w-4 shrink-0 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-xs text-text-secondary">
              Your data is encrypted and stored securely. We never track your GPS
              or share your information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
