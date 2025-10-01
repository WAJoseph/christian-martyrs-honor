"use client";

import Navigation from "@/components/ui/Navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePageTransitionContext } from "@/components/Providers";
import Image from "next/image";

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
  const [search, setSearch] = useState("");
  const { setLoading: setGlobalLoading } = usePageTransitionContext();

  useEffect(() => {
    fetch("/api/martyrs")
      .then((res) => res.json())
      .then((data) => {
        setMartyrs(data);
        setLoading(false);
        setGlobalLoading(false); // Hide global loader
      });
  }, [setGlobalLoading]);

  // Pagination logic
  const itemsPerPage = 3;
  const filtered = martyrs.filter((m) => {
    const matchesEra = selectedEra === "All" || m.era === selectedEra;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchesEra && matchesSearch;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedEra, search]);

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
        {/* Search Bar & Filter */}
        <div className="scroll-panel p-4 mb-8 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search martyrs by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gold-500 bg-slate-800 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 focus:bg-slate-800 transition"
          />
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
            : paginated.map((m) => (
                <Link
                  key={m.id}
                  href={`/martyr/${m.id}`}
                  className="icon-frame p-3 transition-all duration-300 hover:scale-105 group block"
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="icon-inner overflow-hidden">
                    <div className="relative">
                      <Image
                        src={m.iconUrl || "/placeholder-icon.jpg"}
                        alt={m.name}
                        width={400}
                        height={400}
                        className="w-full h-140 object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
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

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg font-medium border border-gold-500 bg-slate-800 text-gold-300 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg font-medium border border-gold-500 transition ${
                  currentPage === i + 1
                    ? "bg-gold-500 text-slate-900"
                    : "bg-slate-800 text-gold-300 hover:bg-gold-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg font-medium border border-gold-500 bg-slate-800 text-gold-300 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Next
            </button>
          </div>
        )}
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
