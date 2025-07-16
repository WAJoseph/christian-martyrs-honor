// src/app/not-found.tsx

import Navigation from "@/components/ui/Navigation";
import Link from "next/link";

export default function NotFoundPage() {
  // Only log on the server to avoid hydration errors
  if (typeof window === "undefined") {
    // eslint-disable-next-line no-console
    console.error("404: Page not found — server");
  }

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12 px-6">
      <Navigation />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-liturgical text-6xl font-bold gold-text">404</h1>
          <p className="text-xl text-slate-300">
            Oops! We couldn’t find the page you were looking for.
          </p>
          <Link
            href="/"
            className="inline-block icon-frame px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="icon-inner px-4 py-2">
              <span className="font-liturgical text-lg gold-text font-medium">
                Return to Home
              </span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
