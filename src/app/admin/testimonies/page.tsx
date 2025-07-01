// src/app/admin/testimonies/page.tsx
"use client";

import { useState, useEffect } from "react";

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
  const [showForm, setShowForm] = useState(false);
  const [editingTestimony, setEditingTestimony] = useState<Testimony | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    content: "",
    date: "",
  });

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      const response = await fetch("/api/testimonies");
      if (response.ok) {
        const data = await response.json();
        setTestimonies(data);
      }
    } catch (error) {
      console.error("Error fetching testimonies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingTestimony
        ? `/api/testimonies/${editingTestimony.id}`
        : "/api/testimonies";
      const method = editingTestimony ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchTestimonies();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving testimony:", error);
    }
  };

  const handleEdit = (testimony: Testimony) => {
    setEditingTestimony(testimony);
    setFormData({
      name: testimony.name,
      title: testimony.title,
      content: testimony.content,
      date: new Date(testimony.date).toISOString().split("T")[0],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this testimony?")) {
      try {
        const response = await fetch(`/api/testimonies/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchTestimonies();
        }
      } catch (error) {
        console.error("Error deleting testimony:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      content: "",
      date: "",
    });
    setEditingTestimony(null);
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
        <h1 className="text-3xl font-bold gold-text">Testimonies Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-200"
        >
          {showForm ? "Cancel" : "Add New Testimony"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="orthodox-border bg-white/90 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingTestimony ? "Edit Testimony" : "Add New Testimony"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Testimony title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your testimony..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition duration-200"
              >
                {editingTestimony ? "Update" : "Create"} Testimony
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

      {/* Testimonies List */}
      <div className="orthodox-border bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            All Testimonies ({testimonies.length})
          </h2>
        </div>

        {testimonies.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No testimonies found. Add your first testimony to get started.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {testimonies.map((testimony) => (
              <div key={testimony.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {testimony.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(testimony)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(testimony.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>By {testimony.name}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(testimony.date)}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed line-clamp-3">
                      {testimony.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
