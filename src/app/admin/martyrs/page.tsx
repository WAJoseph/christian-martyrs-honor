// src/app/admin/martyrs/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Era } from "../../../../generated/prisma";

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
  });

  useEffect(() => {
    fetchMartyrs();
  }, []);

  const fetchMartyrs = async () => {
    try {
      const response = await fetch("/api/martyrs");
      if (response.ok) {
        const data = await response.json();
        setMartyrs(data);
      }
    } catch (error) {
      console.error("Error fetching martyrs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingMartyr
        ? `/api/martyrs/${editingMartyr.id}`
        : "/api/martyrs";
      const method = editingMartyr ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchMartyrs();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving martyr:", error);
    }
  };

  const handleEdit = (martyr: Martyr) => {
    setEditingMartyr(martyr);
    setFormData({
      name: martyr.name,
      title: martyr.title || "",
      feastDay: martyr.feastDay,
      year: martyr.year,
      era: martyr.era,
      iconUrl: martyr.iconUrl,
      description: martyr.description,
      prayer: martyr.prayer,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this martyr?")) {
      try {
        const response = await fetch(`/api/martyrs/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchMartyrs();
        }
      } catch (error) {
        console.error("Error deleting martyr:", error);
      }
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
    });
    setEditingMartyr(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gold-text">Martyrs Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-medium transition duration-200"
        >
          {showForm ? "Cancel" : "Add New Martyr"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="orthodox-border bg-white/90 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingMartyr ? "Edit Martyr" : "Add New Martyr"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feast Day *
              </label>
              <input
                type="text"
                value={formData.feastDay}
                onChange={(e) =>
                  setFormData({ ...formData, feastDay: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="e.g., December 26"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="e.g., 34 AD"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Era *
              </label>
              <select
                value={formData.era}
                onChange={(e) =>
                  setFormData({ ...formData, era: e.target.value as Era })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="Apostolic">Apostolic</option>
                <option value="Patristic">Patristic</option>
                <option value="Medieval">Medieval</option>
                <option value="Modern">Modern</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon URL *
              </label>
              <input
                type="url"
                value={formData.iconUrl}
                onChange={(e) =>
                  setFormData({ ...formData, iconUrl: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="https://example.com/icon.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prayer *
              </label>
              <textarea
                value={formData.prayer}
                onChange={(e) =>
                  setFormData({ ...formData, prayer: e.target.value })
                }
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-2 flex space-x-4">
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-medium transition duration-200"
              >
                {editingMartyr ? "Update" : "Create"} Martyr
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-medium transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Martyrs List */}
      <div className="orthodox-border bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            All Martyrs ({martyrs.length})
          </h2>
        </div>

        {martyrs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No martyrs found. Add your first martyr to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Era
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feast Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {martyrs.map((martyr) => (
                  <tr key={martyr.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={martyr.iconUrl}
                          alt={martyr.name}
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-icon.jpg";
                          }}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {martyr.name}
                          </div>
                          {martyr.title && (
                            <div className="text-sm text-gray-500">
                              {martyr.title}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                        {martyr.era}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {martyr.feastDay}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {martyr.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(martyr)}
                        className="text-amber-600 hover:text-amber-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(martyr.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
