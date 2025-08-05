// src/app/admin/martyrs/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";
// Helper to get access token
const getAccessToken = async () => {
  const session = (await supabase.auth.getSession()).data.session;
  return session?.access_token || "";
};
import { Era } from "../../../../generated/prisma";
import Image from "next/image";

interface Martyr {
  id: number;
  name: string;
  title: string | null;
  feastDay: string;
  year: string;
  era: Era;
  iconUrl: string;
  description: string;
  prayer: string;
  story: string;
  iconDescription: string;
  intercessoryPrayer: string;
}

export default function MartyrsPage() {
  const [martyrs, setMartyrs] = useState<Martyr[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMartyr, setEditingMartyr] = useState<Martyr | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    feastDay: "",
    year: "",
    era: "Apostolic" as Era,
    iconUrl: "",
    description: "",
    prayer: "",
    story: "",
    iconDescription: "",
    intercessoryPrayer: "",
  });

  useEffect(() => {
    fetchMartyrs();
  }, []);

  const fetchMartyrs = async () => {
    try {
      const response = await fetch("/api/martyrs");
      if (response.ok) {
        setMartyrs(await response.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingMartyr
      ? `/api/martyrs/${editingMartyr.id}`
      : "/api/martyrs";
    const method = editingMartyr ? "PUT" : "POST";
    try {
      const token = await getAccessToken();
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchMartyrs();
        resetForm();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (m: Martyr) => {
    setEditingMartyr(m);
    setFormData({
      name: m.name,
      title: m.title || "",
      feastDay: m.feastDay,
      year: m.year,
      era: m.era,
      iconUrl: m.iconUrl,
      description: m.description,
      prayer: m.prayer,
      story: m.story || "",
      iconDescription: m.iconDescription || "",
      intercessoryPrayer: m.intercessoryPrayer || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this martyr?")) {
      const token = await getAccessToken();
      await fetch(`/api/martyrs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMartyrs();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      feastDay: "",
      year: "",
      era: "Apostolic" as Era,
      iconUrl: "",
      description: "",
      prayer: "",
      story: "",
      iconDescription: "",
      intercessoryPrayer: "",
    });
    setEditingMartyr(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Layers inherited from AdminLayout */}
      <div className="relative z-10 flex-1 px-4 sm:px-6 lg:px-8 py-10 space-y-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-amber-500/30 to-amber-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-800/80 backdrop-blur-md rounded-3xl p-8 border border-amber-500/30 shadow-2xl flex justify-between items-center">
            <h1 className="text-3xl font-liturgical font-bold text-amber-300 drop-shadow-lg">
              Martyrs Management
            </h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-100 px-4 py-2 rounded-xl font-medium shadow-lg shadow-amber-500/25 transition transform hover:scale-105"
            >
              {showForm ? "Cancel" : "Add New Martyr"}
            </button>
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-slate-900/90 backdrop-blur-lg rounded-3xl p-8 border border-amber-500/30 shadow-2xl">
              <h2 className="text-2xl font-liturgical font-semibold text-amber-200 mb-4">
                {editingMartyr ? "Edit Martyr" : "Add New Martyr"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                {/* Feast Day */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Feast Day *
                  </label>
                  <input
                    type="text"
                    value={formData.feastDay}
                    onChange={(e) =>
                      setFormData({ ...formData, feastDay: e.target.value })
                    }
                    required
                    placeholder="e.g., December 26"
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Year *
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    required
                    placeholder="e.g., 34 AD"
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                {/* Era */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Era *
                  </label>
                  <select
                    value={formData.era}
                    onChange={(e) =>
                      setFormData({ ...formData, era: e.target.value as Era })
                    }
                    required
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="Apostolic">Apostolic</option>
                    <option value="Patristic">Patristic</option>
                    <option value="Medieval">Medieval</option>
                    <option value="Modern">Modern</option>
                  </select>
                </div>
                {/* Icon URL */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Icon URL *
                  </label>
                  <input
                    type="text"
                    value={formData.iconUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, iconUrl: e.target.value })
                    }
                    required
                    placeholder="https://... or /icon.jpg"
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                {/* Prayer */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Prayer *
                  </label>
                  <textarea
                    value={formData.prayer}
                    onChange={(e) =>
                      setFormData({ ...formData, prayer: e.target.value })
                    }
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                {/* Story */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Full Story
                  </label>
                  <textarea
                    value={formData.story}
                    onChange={(e) =>
                      setFormData({ ...formData, story: e.target.value })
                    }
                    rows={4}
                    placeholder="The full story of the saint's martyrdom, life, and witness."
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                {/* Iconography Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Iconography Tradition
                  </label>
                  <textarea
                    value={formData.iconDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        iconDescription: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Describe the iconographic tradition for this saint."
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                {/* Intercessory Prayer */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Intercessory Prayer
                  </label>
                  <textarea
                    value={formData.intercessoryPrayer}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        intercessoryPrayer: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Prayer for the saint's intercession."
                    className="w-full px-3 py-2 border border-amber-700 bg-slate-900/70 text-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                {/* Buttons */}
                <div className="md:col-span-2 flex space-x-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-100 px-6 py-2 rounded-xl font-medium shadow-lg shadow-amber-500/25 transition transform hover:scale-105"
                  >
                    {editingMartyr ? "Update" : "Create"} Martyr
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-slate-700 hover:bg-slate-800 text-amber-100 px-6 py-2 rounded-xl font-medium shadow-lg transition transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* List Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-amber-500/20 to-amber-600/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-900/90 to-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
            <div className="px-6 py-4 border-b border-amber-900">
              <h2 className="text-xl font-liturgical font-semibold text-amber-100 drop-shadow">
                All Martyrs ({martyrs.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-900 rounded-b-2xl overflow-hidden">
                <thead className="bg-slate-900/95">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                      Era
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                      Feast Day
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-amber-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-slate-900/80 divide-y divide-amber-900">
                  {martyrs.map((m) => (
                    <tr
                      key={m.id}
                      className="hover:bg-amber-900/20 last:rounded-b-2xl"
                    >
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <Image
                          src={m.iconUrl || "/placeholder-icon.jpg"}
                          alt={m.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full border-2 border-amber-700 object-cover"
                          onError={(e) => {
                            if (
                              e.currentTarget.src !== "/placeholder-icon.jpg"
                            ) {
                              e.currentTarget.src = "/placeholder-icon.jpg";
                            }
                          }}
                          unoptimized
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-amber-100">
                            {m.name}
                          </div>
                          {m.title && (
                            <div className="text-sm text-amber-300">
                              {m.title}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-800 text-amber-100">
                          {m.era}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-100">
                        {m.feastDay}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-100">
                        {m.year}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium space-x-4">
                        <button
                          onClick={() => handleEdit(m)}
                          className="text-amber-300 hover:text-amber-100 underline underline-offset-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(m.id)}
                          className="text-red-400 hover:text-red-600 underline underline-offset-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
