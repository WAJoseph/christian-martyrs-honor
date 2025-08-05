"use client";

import Navigation from "@/components/ui/Navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePageTransitionContext } from "@/components/Providers";

interface Martyr {
  id: number;
  name: string;
  era: string;
  iconUrl: string;
  prayer: string;
  story: string;
  iconDescription: string;
  intercessoryPrayer: string;
}

const eras = ["All", "Apostolic", "Patristic", "Medieval", "Modern"];

export default function Gallery() {
  const [selectedEra, setSelectedEra] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [martyrs, setMartyrs] = useState<Martyr[]>([]);
  const [loading, setLoading] = useState(true);
  const { setLoading: setGlobalLoading } = usePageTransitionContext();

  useEffect(() => {
    fetch("/api/martyrs")
      .then((res) => res.json())
      .then((data) => {
        setMartyrs(data);
        setLoading(false);
        setGlobalLoading(false); // Hide global loader
      });
  }, []);

  const filtered =
    selectedEra === "All"
      ? martyrs
      : martyrs.filter((m) => m.era === selectedEra);

  return (
    <div className="min-h-screen pt-30 pb-12 px-6">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-liturgical text-5xl font-bold gold-text mb-4">
            Gallery of Holy Martyrs
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Discover the sacred icons and stories of those who gave their lives
            for Christ
          </p>
        </div>
        {/* Filter */}
        <div className="scroll-panel p-4 mb-8 max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {eras.map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  selectedEra === era
                    ? "bg-gold-500 text-slate-900"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {era}
              </button>
            ))}
          </div>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="icon-frame p-3 animate-pulse bg-slate-800/60 rounded-xl h-80 flex items-center justify-center"
                >
                  <div className="icon-inner w-full h-full flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-slate-700 rounded-full mb-4" />
                    <div className="w-24 h-4 bg-slate-700 rounded mb-2" />
                    <div className="w-16 h-3 bg-slate-700 rounded" />
                  </div>
                </div>
              ))
            : filtered.map((m) => (
                <Link
                  key={m.id}
                  href={`/martyr/${m.id}`}
                  className="icon-frame p-3 transition-all duration-300 hover:scale-105 group block"
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="icon-inner overflow-hidden">
                    <div className="relative">
                      <img
                        src={m.iconUrl}
                        alt={m.name}
                        className="w-full h-140 object-fit transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent transition-opacity duration-300 ${
                          hoveredId === m.id ? "opacity-90" : "opacity-60"
                        }`}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-liturgical text-xl font-semibold gold-text mb-1">
                          {m.name}
                        </h3>
                        <p className="text-sm text-slate-300 mb-2">
                          {m.era} Era
                        </p>
                        {hoveredId === m.id && (
                          <p className="text-sm italic text-gold-200 animate-fade-in">
                            {m.prayer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
        {/* CTA */}
        <div className="text-center mt-12">
          <button
            className="icon-frame px-6 py-3 transition-all duration-300 hover:scale-105"
            onClick={() => (window.location.href = "/timeline")}
          >
            <div className="icon-inner px-4 py-2">
              <span className="font-liturgical text-lg gold-text font-medium">
                Explore More Stories in the Timeline
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
