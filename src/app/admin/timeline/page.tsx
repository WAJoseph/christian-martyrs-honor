// src/app/admin/timeline/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
// Helper to get access token
const getAccessToken = async () => {
  const session = (await supabase.auth.getSession()).data.session;
  return session?.access_token || "";
};

interface TimelineCentury {
  id: number;
  century: string;
}

interface TimelineEntry {
  id: number;
  name: string;
  year: string;
  description: string;
  centuryId: number;
  century: { century: string };
  martyrId?: number;
  martyr?: { id: number; name: string };
}

export default function AdminTimelinePage() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [centuries, setCenturies] = useState<TimelineCentury[]>([]);
  const [martyrs, setMartyrs] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<TimelineEntry>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [showCenturyForm, setShowCenturyForm] = useState(false);
  const [centuryForm, setCenturyForm] = useState<Partial<TimelineCentury>>({});

  useEffect(() => {
    fetchAll();
    fetchMartyrs();
  }, []);

  async function fetchAll() {
    setLoading(true);
    const token = await getAccessToken();
    const [entriesRes, centuriesRes] = await Promise.all([
      fetch("/api/timeline/entry", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("/api/timeline/century", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);
    setEntries(await entriesRes.json());
    setCenturies(await centuriesRes.json());
    setLoading(false);
  }

  async function fetchMartyrs() {
    const res = await fetch("/api/martyrs");
    if (res.ok) {
      const data: { id: number; name: string }[] = await res.json();
      setMartyrs(data.map((m) => ({ id: m.id, name: m.name })));
    }
  }

  function startEdit(entry: TimelineEntry) {
    setEditingId(entry.id);
    setForm({ ...entry });
    setShowEntryForm(true);
  }

  function startAdd() {
    setEditingId(null);
    setForm({});
    setShowEntryForm(true);
  }

  async function handleEntrySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.year || !form.description || !form.centuryId)
      return;
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `/api/timeline/entry/${editingId}`
      : "/api/timeline/entry";
    const token = await getAccessToken();
    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    setShowEntryForm(false);
    setForm({});
    setEditingId(null);
    fetchAll();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this entry?")) return;
    const token = await getAccessToken();
    await fetch(`/api/timeline/entry/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAll();
  }

  function startCenturyAdd() {
    setCenturyForm({});
    setShowCenturyForm(true);
  }

  async function handleCenturySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!centuryForm.century) return;
    const token = await getAccessToken();
    await fetch("/api/timeline/century", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(centuryForm),
    });
    setShowCenturyForm(false);
    setCenturyForm({});
    fetchAll();
  }

  async function handleCenturyDelete(id: number) {
    if (
      !confirm("Delete this century? All entries in it will also be deleted.")
    )
      return;
    const token = await getAccessToken();
    await fetch(`/api/timeline/century/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAll();
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-10 flex-1 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-amber-500/30 to-amber-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-800/80 backdrop-blur-md rounded-3xl p-8 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-3xl font-liturgical font-bold text-amber-300 drop-shadow-lg">
              Timeline Entries
            </h1>
            <div className="flex gap-4">
              <button
                onClick={startAdd}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-100 px-4 py-2 rounded-xl font-medium shadow-lg shadow-amber-500/25 transition transform hover:scale-105"
              >
                Add Entry
              </button>
              <button
                onClick={startCenturyAdd}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-100 px-4 py-2 rounded-xl font-medium shadow-lg shadow-amber-500/25 transition transform hover:scale-105"
              >
                Add Century
              </button>
            </div>
          </div>
        </div>

        {/* Entry Form */}
        {showEntryForm && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-slate-900/90 backdrop-blur-lg rounded-3xl p-8 border border-amber-500/30 shadow-2xl">
              <h2 className="text-2xl font-liturgical font-semibold text-amber-200 mb-4">
                {editingId ? "Edit Entry" : "Add Entry"}
              </h2>
              <form
                onSubmit={handleEntrySubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-amber-300 font-medium">Name</label>
                  <input
                    className="bg-slate-800 text-amber-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={form.name || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-amber-300 font-medium">Year</label>
                  <input
                    className="bg-slate-800 text-amber-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={form.year || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, year: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-amber-300 font-medium">
                    Description
                  </label>
                  <textarea
                    className="bg-slate-800 text-amber-100 rounded-lg px-4 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={form.description || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-amber-300 font-medium">Century</label>
                  <select
                    className="bg-slate-800 text-amber-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={form.centuryId || ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        centuryId: Number(e.target.value),
                      }))
                    }
                    required
                  >
                    <option value="">Select century</option>
                    {centuries.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.century}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-amber-300 font-medium">
                    Linked Martyr (Gallery)
                  </label>
                  <select
                    className="bg-slate-800 text-amber-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={form.martyrId || ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        martyrId: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      }))
                    }
                  >
                    <option value="">None</option>
                    {martyrs.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-100 px-6 py-2 rounded-xl font-medium shadow-lg shadow-amber-500/25 transition transform hover:scale-105"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEntryForm(false);
                      setEditingId(null);
                    }}
                    className="bg-slate-800 text-amber-200 px-6 py-2 rounded-xl font-medium border border-amber-500/30 hover:bg-slate-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Century Form */}
        {showCenturyForm && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-slate-900/90 backdrop-blur-lg rounded-3xl p-8 border border-amber-500/30 shadow-2xl max-w-md">
              <h2 className="text-2xl font-liturgical font-semibold text-amber-200 mb-4">
                Add Century
              </h2>
              <form onSubmit={handleCenturySubmit} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-amber-300 font-medium">
                    Century Name
                  </label>
                  <input
                    className="bg-slate-800 text-amber-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={centuryForm.century || ""}
                    onChange={(e) =>
                      setCenturyForm((f) => ({ ...f, century: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-100 px-6 py-2 rounded-xl font-medium shadow-lg shadow-amber-500/25 transition transform hover:scale-105"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCenturyForm(false)}
                    className="bg-slate-800 text-amber-200 px-6 py-2 rounded-xl font-medium border border-amber-500/30 hover:bg-slate-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tables */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full animate-pulse"></div>
          </div>
        ) : (
          <>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-amber-500/20 to-amber-600/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-900/90 to-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-amber-900">
                    <thead className="bg-slate-900/95">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                          Century
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                          Year
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-amber-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-900/80 divide-y divide-amber-900">
                      {entries.map((entry) => (
                        <tr key={entry.id} className="hover:bg-amber-900/20">
                          <td className="px-6 py-4 whitespace-nowrap text-amber-100">
                            {entry.century.century}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-amber-100">
                            {entry.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-amber-100">
                            {entry.year}
                          </td>
                          <td className="px-6 py-4 text-sm text-amber-100">
                            {entry.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-amber-100">
                            {entry.martyr ? entry.martyr.name : "-"}
                          </td>
                          <td className="px-6 py-4 text-right space-x-4">
                            <button
                              onClick={() => startEdit(entry)}
                              className="text-amber-300 hover:text-amber-100 underline underline-offset-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(entry.id)}
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
                <div className="px-6 py-4 border-t border-amber-900">
                  <h2 className="text-xl font-liturgical font-semibold text-amber-100 drop-shadow">
                    Centuries
                  </h2>
                  <ul className="space-y-2 mt-4">
                    {centuries.map((c) => (
                      <li
                        key={c.id}
                        className="flex items-center justify-between text-amber-100"
                      >
                        <span>{c.century}</span>
                        <button
                          onClick={() => handleCenturyDelete(c.id)}
                          className="text-red-400 hover:text-red-600 underline underline-offset-2"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
