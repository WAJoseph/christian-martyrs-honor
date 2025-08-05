"use client";

import { useState, useEffect } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import { useRouter } from "next/navigation";
import { usePageTransitionContext } from "@/components/Providers";
import OrthodoxCross from "./_components/OrthodoxCross";
import AboutSection from "./_components/AboutSection";

const churchImages = [
  {
    id: 1,
    url: "/Church-ceiling2.jpg",
    alt: "Orthodox Church Interior with Iconostasis",
    description: "Traditional Orthodox church interior",
  },
  {
    id: 2,
    url: "/Church-ceiling.jpg",
    alt: "Orthodox Icons",
    description: "Sacred iconography preserves divine truth",
  },
];

const siteContent = {
  hero: {
    title: "Sacred Martyrs",
    subtitle:
      "A digital sanctuary honoring the holy martyrs through the sacred tradition of Eastern Orthodox iconography",
    quote:
      "Holy Martyrs, who shed your blood for Christ, intercede for us before the throne of the Almighty...",
    quoteSource: "Orthodox Prayer",
  },
  sections: {
    about: {
      title: "Preserving Sacred Memory",
      content: [
        "Throughout the centuries, countless faithful souls have offered their lives as the ultimate testimony to their unwavering faith in Christ. These holy martyrs, through their sacrifice, have become beacons of divine love and courage.",
        "Each icon is more than art. It is a window to heaven, a sacred portal through which we commune with the saints who have gone before us. Their stories continue to inspire and strengthen the faithful across generations.",
      ],
    },
    stats: [
      { label: "Documented Martyrs", value: "300+", key: "martyrs_count" },
      { label: "Years of Witness", value: "33-1453", key: "years_span" },
      { label: "One Faith", value: "☩", key: "orthodox_faith" },
    ],
  },
};

export default function HomePage() {
  // const router = useRouter();
  const { setLoading } = usePageTransitionContext();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handleScrollDown = () => {
    // Scroll to the next section (about)
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background Layers */}
        <div className="absolute inset-0 bg-slate-900" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${churchImages[0].url}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/70" />

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          {/* Enhanced Title with Staggered Animation */}
          <div className="mb-8">
            <h1 className="font-liturgical text-6xl md:text-8xl lg:text-9xl font-bold gold-text text-shadow-gold animate-float">
              {siteContent.hero.title}
            </h1>
            <div className="w-32 h-1 bg-timeline-gradient mx-auto mb-6 animate-glow" />
          </div>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 mb-10 font-light leading-relaxed max-w-3xl mx-auto animate-fade-in">
            {siteContent.hero.subtitle.split("Eastern Orthodox iconography")[0]}
            <span className="gold-text font-medium">
              Eastern Orthodox iconography
            </span>
            {siteContent.hero.subtitle.split("Eastern Orthodox iconography")[1]}
          </p>

          {/* Enhanced Quote Panel */}
          <div className="scroll-panel p-8 mb-10 max-w-3xl mx-auto animate-glow">
            <div className="flex items-start space-x-4">
              {/* Orthodox Cross */}
              <div className="flex-shrink-0 mt-1">
                <OrthodoxCross size={28} className="gold-text" />
              </div>
              <div>
                <p className="font-liturgical text-lg md:text-xl text-gold-300 leading-relaxed italic mb-2">
                  &quot;{siteContent.hero.quote}&quot;
                </p>
                <p className="text-slate-400 text-sm">
                  — {siteContent.hero.quoteSource}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="space-y-6 mb-8">
            <div className="flex justify-center animate-bounce">
              <button
                className="icon-frame p-1"
                onClick={handleScrollDown}
                aria-label="Scroll Down"
              >
                <div className="icon-inner p-2">
                  <ArrowDown className="gold-text" size={28} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Introduction Section */}
      <AboutSection
        title={siteContent.sections.about.title}
        content={siteContent.sections.about.content}
        stats={siteContent.sections.stats}
        image={{
          url: churchImages[1].url,
          description: churchImages[1].description,
        }}
      />

    </div>
  );
}
