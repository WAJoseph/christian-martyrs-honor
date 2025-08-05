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
  martyr?: {
    id: number;
    story?: string;
    intercessoryPrayer?: string;
    iconUrl?: string;
  } | null;
}

interface TimelineCentury {
  century: string;
  martyrs: TimelineMartyr[];
}

export default function TimelinePage() {
  const [timeline, setTimeline] = useState<TimelineCentury[]>([]);
  const [selectedMartyr, setSelectedMartyr] = useState<string | null>(null);
  const [loading, setLoadingState] = useState(true);
  const { setLoading } = usePageTransitionContext();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    async function fetchTimeline() {
      setLoadingState(true);
      const res = await fetch("/api/timeline");
      const data: TimelineCentury[] = await res.json();
      setTimeline(data);
      setLoadingState(false);
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

        {loading ? (
          <div className="space-y-10 py-10">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="relative mb-16 last:mb-0 animate-pulse">
                <div className="flex items-center mb-6">
                  <div className="icon-frame p-2 mr-6 animate-float">
                    <div className="icon-inner w-12 h-12 flex items-center justify-center">
                      <div className="w-4 h-4 bg-gold/30 rounded-full halo-glow" />
                    </div>
                  </div>
                  <div className="h-8 w-32 bg-slate-700/40 rounded" />
                </div>
                <div className="ml-20 space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="scroll-panel p-6 bg-slate-800/40 rounded animate-pulse"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="icon-frame p-2 flex-shrink-0">
                          <div className="icon-inner w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center" />
                        </div>
                        <div className="flex-1">
                          <div className="h-6 w-40 bg-slate-700/40 rounded mb-2" />
                          <div className="h-4 w-64 bg-slate-700/30 rounded mb-2" />
                          <div className="h-4 w-48 bg-slate-700/20 rounded" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          timeline.map((period, idx) => (
            <div
              key={period.century}
              className="relative mb-16 last:mb-0 fade-in-up"
              style={{
                animationDelay: `${idx * 0.2}s`,
                animationDuration: "0.7s",
                animationFillMode: "both",
              }}
            >
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
                {period.martyrs.map((martyr, mIdx) => {
                  const isOpen = selectedMartyr === martyr.name;
                  const hasGallery =
                    martyr.martyr &&
                    (martyr.martyr.story ||
                      martyr.martyr.intercessoryPrayer ||
                      martyr.martyr.iconUrl);
                  return (
                    <div
                      key={martyr.name}
                      className={`scroll-panel p-6 fade-in-up ${
                        hasGallery
                          ? "cursor-pointer transition-all duration-500 hover:scale-105"
                          : "cursor-default"
                      } ${isOpen ? "animate-glow" : ""}`}
                      style={{
                        animationDelay: `${(idx + mIdx) * 0.15 + 0.3}s`,
                        animationDuration: "0.7s",
                        animationFillMode: "both",
                      }}
                      onClick={() => {
                        if (hasGallery)
                          setSelectedMartyr(isOpen ? null : martyr.name);
                      }}
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
                          <div
                            style={{
                              maxHeight: isOpen && hasGallery ? 200 : 0,
                              opacity: isOpen && hasGallery ? 1 : 0,
                              overflow: "hidden",
                              transition:
                                "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s",
                            }}
                            className="mt-4 pt-4 border-t border-gold-400/30"
                          >
                            {hasGallery && (
                              <a
                                href={
                                  martyr.martyr?.id
                                    ? `/martyr/${martyr.martyr.id}`
                                    : "#"
                                }
                                className="flex items-center text-gold-300 hover:gold-text transition-colors duration-300 font-medium"
                                style={{
                                  pointerEvents: isOpen ? "auto" : "none",
                                  opacity: isOpen ? 1 : 0,
                                  transition: "opacity 0.4s",
                                }}
                              >
                                Read Full Story
                                <ArrowRight className="ml-2" size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
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
          <a href="/gallery">
            <button className="icon-frame px-6 py-3 transition-all duration-300 hover:scale-105">
              <div className="icon-inner px-4 py-2">
                <span className="font-liturgical text-lg gold-text font-medium">
                  Explore More Stories
                </span>
              </div>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
