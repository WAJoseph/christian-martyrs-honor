// src/app/admin/testimonies/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";
// Helper to get access token
const getAccessToken = async () => {
  const session = (await supabase.auth.getSession()).data.session;
  return session?.access_token || "";
};
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";

interface AdminUser {
  email?: string;
  role?: string;
  app_metadata?: {
    role?: string;
    [key: string]: unknown;
  };
}

interface Testimony {
  id: number;
  name: string;
  title: string;
  content?: string; // for new schema
  testimony?: string; // for legacy/testimony field
  date?: string;
  created_at?: string;
  status?: string;
  email?: string;
  featured?: boolean;
}

export default function TestimoniesPage() {
  const [showFeaturedOnly] = useState(false);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const { user, loading: authLoading } = useAuth() as {
    user: AdminUser | null;
    loading: boolean;
  };
  const router = useRouter();

  useEffect(() => {
    if (
      !authLoading &&
      (!user || (user.role !== "admin" && user.app_metadata?.role !== "admin"))
    ) {
      router.replace("/");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    // Fetch testimonies from backend (all, including pending/approved)
    const fetchTestimonies = async () => {
      setLoading(true);
      try {
        const token = await getAccessToken();
        const res = await fetch("/api/testimonies?all=1", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTestimonies(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonies();
  }, []);

  // Approve/reject testimony
  const handleStatusChange = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      const testimony = testimonies.find((t) => t.id === Number(id));
      if (!testimony) return;
      const token = await getAccessToken();
      const res = await fetch(`/api/testimonies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...testimony, status: newStatus }),
      });
      if (res.ok) {
        setTestimonies((prev) =>
          prev.map((t) =>
            t.id === Number(id) ? { ...t, status: newStatus } : t
          )
        );
      }
    } catch {}
  };

  // Delete testimony
  const handleDeleteTestimony = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimony?")) return;
    const token = await getAccessToken();
    const res = await fetch(`/api/testimonies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setTestimonies((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleFeatureToggle = (id: number) => {
    (async () => {
      const token = await getAccessToken();
      const testimony = testimonies.find((t) => t.id === id);
      if (!testimony) return;
      const res = await fetch(`/api/testimonies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: testimony.name,
          title: testimony.title,
          content: testimony.content || testimony.testimony || "",
          date:
            testimony.date || testimony.created_at || new Date().toISOString(),
          status: testimony.status,
          featured: !testimony.featured,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTestimonies((prev) => prev.map((t) => (t.id === id ? updated : t)));
      }
    })();
  };

  const filteredTestimonies = testimonies.filter((testimony) => {
    const matchesSearch =
      testimony.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimony.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimony.testimony?.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesTab = false;
    if (activeTab === "all") matchesTab = true;
    else if (activeTab === "featured") matchesTab = !!testimony.featured;
    else matchesTab = testimony.status === activeTab;
    const matchesFeatured = !showFeaturedOnly || testimony.featured;
    return matchesSearch && matchesTab && matchesFeatured;
  });

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-ping opacity-30"></div>
          <p className="text-amber-300 text-center mt-4 font-liturgical">
            Loading Divine Testimonies...
          </p>
        </div>
      </div>
    );
  }

  if (!user || (user.role !== "admin" && user.app_metadata?.role !== "admin")) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Divine Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-amber-500/30 to-amber-600/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-gradient-to-r from-slate-800/80 via-slate-900/90 to-slate-800/80 backdrop-blur-md rounded-3xl p-8 border border-amber-500/30 shadow-2xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-4 shadow-lg shadow-amber-500/25">
              <svg
                className="w-8 h-8 text-slate-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-liturgical font-bold text-amber-300 mb-2">
              Divine Testimonies
            </h2>
            <p className="text-amber-200/80 text-lg">
              Voices of Faith & Witnesses of Grace
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative transform hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 shadow-xl">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                <svg
                  className="w-7 h-7 text-slate-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-amber-200/80 mb-1">
                  Total Testimonies
                </p>
                <p className="text-3xl font-bold text-amber-300 font-liturgical">
                  {testimonies.length}
                </p>
                <p className="text-xs text-amber-300/60 mt-1">Sacred Voices</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative transform hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-green-500/30 shadow-xl">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <svg
                  className="w-7 h-7 text-slate-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-200/80 mb-1">
                  Approved
                </p>
                <p className="text-3xl font-bold text-green-300 font-liturgical">
                  {testimonies.filter((t) => t.status === "approved").length}
                </p>
                <p className="text-xs text-green-300/60 mt-1">Blessed Voices</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative transform hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-xl">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/25">
                <svg
                  className="w-7 h-7 text-slate-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-yellow-200/80 mb-1">
                  Pending
                </p>
                <p className="text-3xl font-bold text-yellow-300 font-liturgical">
                  {testimonies.filter((t) => t.status === "pending").length}
                </p>
                <p className="text-xs text-yellow-300/60 mt-1">
                  Awaiting Review
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative transform hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 shadow-xl">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <svg
                  className="w-7 h-7 text-slate-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-200/80 mb-1">
                  Featured
                </p>
                <p className="text-3xl font-bold text-purple-300 font-liturgical">
                  {testimonies.filter((t) => t.featured).length}
                </p>
                <p className="text-xs text-purple-300/60 mt-1">
                  Divine Highlights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-amber-500/20 to-amber-600/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-800/80 backdrop-blur-md rounded-3xl p-6 border border-amber-500/30 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search testimonies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-amber-500/30 rounded-2xl text-amber-100 placeholder-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              {["all", "approved", "pending", "rejected", "featured"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 capitalize ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-lg shadow-amber-500/25"
                        : "bg-slate-800/50 text-amber-300 hover:bg-amber-600/20"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonies List */}
      <div className="space-y-6">
        {filteredTestimonies.map((testimony) => (
          <div key={testimony.id} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/25">
                      <span className="text-slate-900 font-bold text-lg">
                        {testimony.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-300">
                        {testimony.name}
                      </h3>
                      <p className="text-sm text-amber-200/70">
                        {testimony.email}
                      </p>
                    </div>
                    {testimony.featured && (
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        ✨ Featured
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-900/50 rounded-xl p-4 mb-4 border border-amber-500/20">
                    <p className="text-amber-100 leading-relaxed italic">
                      &quot;{testimony.content || testimony.testimony}&quot;
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-amber-300/70">
                    <span>
                      Submitted:{" "}
                      {new Date(
                        testimony.date || testimony.created_at || ""
                      ).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          testimony.status === "approved"
                            ? "bg-green-500/20 text-green-300"
                            : testimony.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {testimony.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedTestimony(testimony);
                      setShowModal(true);
                    }}
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-100 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDeleteTestimony(testimony.id)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-red-100 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Delete
                  </button>

                  {testimony.status === "pending" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleStatusChange(
                            testimony.id.toString(),
                            "approved"
                          )
                        }
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-green-100 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(
                            testimony.id.toString(),
                            "rejected"
                          )
                        }
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-red-100 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => handleFeatureToggle(testimony.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                      testimony.featured
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-purple-100"
                        : "bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100"
                    }`}
                  >
                    {testimony.featured ? "Unfeature" : "Feature"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonies.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-4 shadow-lg shadow-amber-500/25">
            <svg
              className="w-8 h-8 text-slate-900"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-xl font-liturgical text-amber-300 mb-2">
            No Testimonies Found
          </h3>
          <p className="text-amber-200/70">
            No testimonies match your current filters.
          </p>
        </div>
      )}

      {/* Divine Blessing Footer */}
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-4 text-amber-300/60">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
          <span className="text-2xl">✠</span>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
        </div>
        <p className="text-amber-300/70 mt-4 font-liturgical italic">
          &quot;Let everything that has breath praise the Lord&quot;
        </p>
      </div>

      {/* Modal for viewing testimony details */}
      {showModal && selectedTestimony && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md rounded-3xl p-8 border border-amber-500/30 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-liturgical font-bold text-amber-300">
                Testimony Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-amber-300 hover:text-amber-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <span className="text-slate-900 font-bold text-xl">
                    {selectedTestimony.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-amber-300">
                    {selectedTestimony.name}
                  </h4>
                  <p className="text-amber-200/70">{selectedTestimony.email}</p>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-500/20">
                <p className="text-amber-100 leading-relaxed text-lg italic">
                  &quot;
                  {selectedTestimony.content || selectedTestimony.testimony}
                  &quot;
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-amber-300/70 pt-4 border-t border-amber-500/20">
                <span>
                  Submitted:{" "}
                  {(() => {
                    const dateStr =
                      selectedTestimony.date || selectedTestimony.created_at;
                    if (!dateStr) return "Unknown";
                    const dateObj = new Date(dateStr);
                    return isNaN(dateObj.getTime())
                      ? "Unknown"
                      : dateObj.toLocaleDateString();
                  })()}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedTestimony.status === "approved"
                      ? "bg-green-500/20 text-green-300"
                      : selectedTestimony.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {selectedTestimony.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
