// src/app/timeline/page.tsx
"use client";

import Navigation from "@/components/ui/Navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react"; // Optional: if you want an icon for “Read Full Story”
import { usePageTransitionContext } from "@/components/Providers";

interface TimelineMartyr {
  name: string;
  year: string;
  description: string;
}

interface TimelineCentury {
  century: string;
  martyrs: TimelineMartyr[];
}

export default function TimelinePage() {
  const [timeline, setTimeline] = useState<TimelineCentury[]>([]);
  const [selectedCentury, setSelectedCentury] = useState<string | null>(null);
  const { setLoading } = usePageTransitionContext();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    async function fetchTimeline() {
      const res = await fetch("/api/timeline");
      const data: TimelineCentury[] = await res.json();
      setTimeline(data);
    }
    fetchTimeline();
  }, []);

  return (
    <div className="min-h-screen pt-30 pb-12 px-6">
      <Navigation />
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="font-liturgical text-5xl font-bold gold-text mb-4">
          Timeline of Martyrdom
        </h1>
        <p className="text-slate-300 text-lg">
          Journey through the centuries of Christian witness and sacrifice
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-timeline-gradient" />

        {timeline.map((period, idx) => (
          <div key={period.century} className="relative mb-16 last:mb-0">
            {/* Century Marker */}
            <div className="flex items-center mb-6">
              <div
                className="icon-frame p-2 mr-6 animate-float"
                style={{ animationDelay: `${idx * 0.5}s` }}
              >
                <div className="icon-inner w-12 h-12 flex items-center justify-center">
                  <div className="w-4 h-4 bg-gold rounded-full halo-glow" />
                </div>
              </div>
              <h2 className="font-liturgical text-3xl font-bold gold-text">
                {period.century}
              </h2>
            </div>

            {/* Martyrs Cards */}
            <div className="ml-20 space-y-4">
              {period.martyrs.map((martyr) => {
                const isOpen = selectedCentury === period.century;
                return (
                  <div
                    key={martyr.name}
                    className={`scroll-panel p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isOpen ? "animate-glow" : ""
                    }`}
                    onClick={() =>
                      setSelectedCentury(isOpen ? null : period.century)
                    }
                  >
                    <div className="flex items-start space-x-4">
                      <div className="icon-frame p-2 flex-shrink-0">
                        <div className="icon-inner w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                          <span className="gold-text font-liturgical font-bold text-sm">
                            {martyr.year.replace("AD ", "")}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-liturgical text-xl font-semibold gold-text mb-2">
                          {martyr.name}
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                          {martyr.description}
                        </p>
                        {isOpen && (
                          <div className="mt-4 pt-4 border-t border-gold-400/30 animate-fade-in">
                            <button className="flex items-center text-gold-300 hover:gold-text transition-colors duration-300 font-medium">
                              Read Full Story
                              <ArrowRight className="ml-2" size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="scroll-panel p-8 max-w-2xl mx-auto">
          <h3 className="font-liturgical text-2xl font-semibold gold-text mb-4">
            Continue the Legacy
          </h3>
          <p className="text-slate-300 mb-6 leading-relaxed">
            The witness of the martyrs continues to inspire faith across
            generations. Discover how their courage can strengthen your own
            spiritual journey.
          </p>
          <button className="icon-frame px-6 py-3 transition-all duration-300 hover:scale-105">
            <div className="icon-inner px-4 py-2">
              <span className="font-liturgical text-lg gold-text font-medium">
                Explore More Stories
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
