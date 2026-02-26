import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/jetseen-logo.png"
              alt="Jetseen"
              width={200}
              height={161}
              className="h-2.5 w-auto brightness-0 invert"
            />
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Residency day tracking
              <br />
              for digital nomads.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-400 transition-colors hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/login" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Jetseen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
