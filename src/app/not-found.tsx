import Link from "next/link";
import Navigation from "@/components/ui/Navigation";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center pt-30 pb-12 px-6">
        <div className="max-w-2xl w-full mx-auto text-center">
          {/* Orthodox Cross Icon */}
          <div className="mb-10 flex justify-center">
            <div className="icon-frame w-28 h-28 bg-gradient-to-br from-gold-300/20 to-gold-400/30 rounded-full flex items-center justify-center border border-gold-400/30 animate-glow">
              <div className="icon-inner w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-300 rounded-full flex items-center justify-center opacity-80">
                {/* Orthodox Cross SVG from main page */}
                <svg
                  width="28"
                  height="32"
                  viewBox="0 0 32 32"
                  className="gold-text"
                >
                  {/* Vertical beam */}
                  <rect
                    x="14"
                    y="2"
                    width="4"
                    height="28"
                    fill="currentColor"
                  />
                  {/* Top horizontal beam */}
                  <rect
                    x="10"
                    y="4"
                    width="12"
                    height="3"
                    fill="currentColor"
                  />
                  {/* Main horizontal beam */}
                  <rect
                    x="6"
                    y="10"
                    width="20"
                    height="4"
                    fill="currentColor"
                  />
                  {/* Diagonal beam (Orthodox style) */}
                  <rect
                    x="8"
                    y="22"
                    width="16"
                    height="3"
                    fill="currentColor"
                    transform="rotate(-15 16 23.5)"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="font-liturgical text-6xl md:text-7xl font-bold text-gold-400 mb-6 tracking-wide">
            404
          </h1>
          <h2 className="font-liturgical text-2xl md:text-3xl text-slate-300 mb-4">
            Page Not Found
          </h2>
          {/* Decorative Separator */}
          {/* <div className="mb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent max-w-md mx-auto opacity-60"></div>
            <div className="flex justify-center mt-4">
              <div className="w-2 h-2 bg-gold-400 rounded-full opacity-60"></div>
            </div>
          </div> */}
          {/* Inspirational Quote */}
          <div className="scroll-panel bg-slate-800/40 border border-gold-400/20 rounded-lg p-8 mb-10 max-w-xl mx-auto backdrop-blur-sm">
            <blockquote className="font-liturgical text-xl text-gold-300 italic mb-4">
              &quot;Be faithful unto death, and I will give you the crown of
              life.&quot;
            </blockquote>
            <cite className="text-slate-400 text-sm">— Revelation 2:10</cite>
          </div>
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="border-2 border-gold-400 text-gold-400 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold-400/25 min-w-[200px]"
            >
              Return Home
            </Link>
            <Link
              href="/timeline"
              className="border-2 border-gold-400 text-gold-400 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gold-400 hover:text-slate-900 hover:scale-105 min-w-[200px]"
            >
              Explore Timeline
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
