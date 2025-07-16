// src/app/community/page.tsx
"use client";

import Navigation from "@/components/ui/Navigation";
import { useState, useEffect } from "react";
import { usePageTransitionContext } from "@/components/Providers";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

interface Testimony {
  id: number;
  name: string;
  title: string;
  content: string;
  date: string;
}

export default function Community() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", title: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { setLoading: setPageLoading } = usePageTransitionContext();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  useEffect(() => {
    async function fetchTestimonies() {
      setLoading(true);
      try {
        const res = await fetch("/api/testimonies");
        if (res.ok) {
          const data = await res.json();
          setTestimonies(data);
        }
      } catch {
        setError("Failed to load testimonies.");
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/testimonies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          title: form.title,
          content: form.content,
          date: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        const newTestimony = await res.json();
        setTestimonies([newTestimony, ...testimonies]);
        setForm({ name: "", title: "", content: "" });
        setShowForm(false);
      } else {
        setError("Failed to submit testimony.");
      }
    } catch {
      setError("Failed to submit testimony.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-30 pb-12 px-6">
      <Navigation />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-liturgical text-5xl font-bold gold-text mb-4">
            Community Testimonies
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Stories of how the martyrs continue to inspire and guide believers
            today
          </p>
        </div>
        {/* Share Testimony Button */}
        <div className="text-center mb-12">
          {user ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="icon-frame px-8 py-4 transition-all duration-300 hover:scale-105 hover:animate-glow"
            >
              <div className="icon-inner px-6 py-3">
                <span className="font-liturgical text-xl gold-text font-semibold">
                  Share Your Testimony
                </span>
              </div>
            </button>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-slate-300 text-lg">
                You must be signed in to share your testimony.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="icon-frame px-8 py-4 transition-all duration-300 hover:scale-105 hover:animate-glow"
              >
                <div className="icon-inner px-6 py-3">
                  <span className="font-liturgical text-xl gold-text font-semibold">
                    Sign In / Create Account
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
        {/* Testimony Form */}
        {user && showForm && (
          <div className="mb-12 animate-fade-in">
            <div className="scroll-panel p-8 max-w-2xl mx-auto">
              <h3 className="font-liturgical text-2xl font-semibold gold-text mb-6">
                Share How a Martyr Inspired You
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gold-300 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-gold-400/30 rounded-lg px-4 py-3 text-slate-200 focus:border-gold-400 focus:outline-none transition-colors duration-300"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gold-300 font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-gold-400/30 rounded-lg px-4 py-3 text-slate-200 focus:border-gold-400 focus:outline-none transition-colors duration-300"
                    placeholder="Give your testimony a title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-gold-300 font-medium mb-2">
                    Your Story
                  </label>
                  <textarea
                    rows={6}
                    className="w-full bg-slate-800 border border-gold-400/30 rounded-lg px-4 py-3 text-slate-200 focus:border-gold-400 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Share how a martyr's story has impacted your faith journey..."
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
                {error && (
                  <div className="text-red-500 text-center">{error}</div>
                )}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="icon-frame px-6 py-3 flex-1 transition-all duration-300 hover:scale-105"
                    disabled={submitting}
                  >
                    <div className="icon-inner px-4 py-2">
                      <span className="font-liturgical text-lg gold-text font-medium">
                        {submitting ? "Submitting..." : "Submit Testimony"}
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Testimonies Grid */}
        {loading ? (
          <div className="text-center text-slate-400">
            Loading testimonies...
          </div>
        ) : testimonies.length === 0 ? (
          <div className="text-center text-slate-400">
            No testimonies found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonies.map((testimony, idx) => (
              <div
                key={testimony.id}
                className="scroll-panel p-6 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="border-l-4 border-gold-400 pl-4 mb-4">
                  <h3 className="font-liturgical text-xl font-semibold gold-text mb-2">
                    {testimony.title}
                  </h3>
                  <p className="text-sm text-gold-300 mb-3">
                    by {testimony.name} •{" "}
                    {new Date(testimony.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <span className="drop-cap">
                    {testimony.content.charAt(0)}
                  </span>
                  {testimony.content.slice(1)}
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Community Stats */}
        <div className="mt-16">
          <div className="scroll-panel p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-liturgical font-bold gold-text mb-2">
                  {testimonies.length}
                </div>
                <div className="text-slate-300">Stories Shared</div>
              </div>
              <div>
                <div className="text-3xl font-liturgical font-bold gold-text mb-2">
                  1,842
                </div>
                <div className="text-slate-300">Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-liturgical font-bold gold-text mb-2">
                  12
                </div>
                <div className="text-slate-300">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
