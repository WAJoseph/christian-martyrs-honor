"use client";

import Navigation from "@/components/ui/Navigation";
import { useEffect, useState } from "react";

interface Testimony {
  id: number;
  name: string;
  title: string;
  content: string;
  date: string;
}

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonies() {
      try {
        const res = await fetch("/api/testimonies");
        if (res.ok) {
          const data = await res.json();
          setTestimonies(data);
        }
      } catch (err) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonies();
  }, []);

  return (
    <div className="min-h-screen pt-30 pb-12 px-6">
      <Navigation />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-liturgical text-5xl font-bold gold-text mb-4">
            Community Testimonies
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Stories of how the martyrs continue to inspire and guide believers
            today
          </p>
        </div>
        {loading ? (
          <div className="text-center text-slate-400">
            Loading testimonies...
          </div>
        ) : testimonies.length === 0 ? (
          <div className="text-center text-slate-400">
            No testimonies found.
          </div>
        ) : (
          <div className="space-y-8">
            {testimonies.map((t) => (
              <div key={t.id} className="scroll-panel p-8">
                <h3 className="font-liturgical text-2xl font-semibold gold-text mb-2">
                  {t.title}
                </h3>
                <p className="text-slate-300 mb-2">{t.content}</p>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>By {t.name}</span>
                  <span>{new Date(t.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
