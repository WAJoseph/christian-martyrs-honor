// src/app/community/page.tsx
'use client'

import Navigation from '@/components/ui/Navigation'  // adjust if yours lives in ui/Navigation
import { useState } from 'react'

const testimonies = [
  {
    id: 1,
    name: 'Maria S.',
    title: 'Finding Strength in St. Perpetua',
    content:
      "As a young mother facing difficulties, reading about St. Perpetua's courage gave me the strength to persevere through my trials. Her faith reminds me that no sacrifice is too great when made for love of Christ.",
    date: 'December 2024',
  },
  {
    id: 2,
    name: 'Father Michael',
    title: 'The Witness of Polycarp',
    content:
      "In my 30 years of ministry, I've often returned to the example of St. Polycarp. His final words, 'Eighty-six years I have served Him,' remind me of the beauty of lifelong devotion to our Lord.",
    date: 'November 2024',
  },
  {
    id: 3,
    name: 'David K.',
    title: "Stephen's Forgiveness",
    content:
      "Learning about St. Stephen's prayer for his persecutors transformed how I handle conflict. If he could forgive while being stoned, surely I can forgive smaller offenses in my daily life.",
    date: 'November 2024',
  },
  {
    id: 4,
    name: 'Sister Catherine',
    title: 'Agnes and Pure Love',
    content:
      "St. Agnes shows us that age is no barrier to heroic sanctity. Her complete dedication to Christ at such a young age inspires our youth group to take their faith seriously.",
    date: 'October 2024',
  },
]

export default function Community() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen pt-30 pb-12 px-6">

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-liturgical text-5xl font-bold gold-text mb-4">
            Community Testimonies
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Stories of how the martyrs continue to inspire and guide believers today
          </p>
        </div>

        {/* Share Testimony Button */}
        <div className="text-center mb-12">
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
        </div>

        {/* Testimony Form */}
        {showForm && (
          <div className="mb-12 animate-fade-in">
            <div className="scroll-panel p-8 max-w-2xl mx-auto">
              <h3 className="font-liturgical text-2xl font-semibold gold-text mb-6">
                Share How a Martyr Inspired You
              </h3>

              <form className="space-y-6">
                <div>
                  <label className="block text-gold-300 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-gold-400/30 rounded-lg px-4 py-3 text-slate-200 focus:border-gold-400 focus:outline-none transition-colors duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gold-300 font-medium mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-gold-400/30 rounded-lg px-4 py-3 text-slate-200 focus:border-gold-400 focus:outline-none transition-colors duration-300"
                    placeholder="Give your testimony a title"
                  />
                </div>

                <div>
                  <label className="block text-gold-300 font-medium mb-2">Your Story</label>
                  <textarea
                    rows={6}
                    className="w-full bg-slate-800 border border-gold-400/30 rounded-lg px-4 py-3 text-slate-200 focus:border-gold-400 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Share how a martyr's story has impacted your faith journey..."
                  ></textarea>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="icon-frame px-6 py-3 flex-1 transition-all duration-300 hover:scale-105"
                  >
                    <div className="icon-inner px-4 py-2">
                      <span className="font-liturgical text-lg gold-text font-medium">
                        Submit Testimony
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
                  by {testimony.name} • {testimony.date}
                </p>
              </div>

              <p className="text-slate-300 leading-relaxed mb-4">
                <span className="drop-cap">{testimony.content.charAt(0)}</span>
                {testimony.content.slice(1)}
              </p>

              <div className="flex justify-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Stats */}
        <div className="mt-16">
          <div className="scroll-panel p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-liturgical font-bold gold-text mb-2">247</div>
                <div className="text-slate-300">Stories Shared</div>
              </div>
              <div>
                <div className="text-3xl font-liturgical font-bold gold-text mb-2">1,842</div>
                <div className="text-slate-300">Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-liturgical font-bold gold-text mb-2">89</div>
                <div className="text-slate-300">Martyrs Featured</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
