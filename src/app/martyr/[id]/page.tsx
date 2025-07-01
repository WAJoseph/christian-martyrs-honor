// src/app/martyr/[id]/page.tsx

import Navigation from '@/components/ui/Navigation'

// (Optional) If you want this page to fetch data on the client
// import { useEffect, useState } from 'react'

interface PageProps {
  params: { id: string }
}

export default async function MartyrPage({ params }: PageProps) {
  const { id } = await params

  // Mock data lookup (replace with real fetch if you have an API)
  const mockData: Record<string, any> = {
    stephen: {
      name: "St. Stephen the Protomartyr",
      feast: "December 27",
      image:
        "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      story: `Stephen, whose name means "crown," was one of the seven deacons…`,
      prayer:
        `Holy Stephen, first witness of Christ's passion…`,
      iconDescription:
        "St. Stephen is traditionally depicted as a young deacon…",
    },
    // add other martyrs keyed by `[id]` here
  }

  // Fallback if `id` not found
  const martyr = mockData[id] || {
    name: 'Unknown Martyr',
    feast: '',
    image: '',
    story: '',
    prayer: '',
    iconDescription: '',
  }

  return (
    <div className="min-h-screen pt-30 pb-12 px-6">
      <Navigation />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Icon Section */}
          <div className="space-y-6">
            <div className="icon-frame p-6">
              <div className="icon-inner overflow-hidden">
                {martyr.image && (
                  <img
                    src={martyr.image}
                    alt={martyr.name}
                    className="w-full h-[600px] object-cover"
                  />
                )}
              </div>
            </div>

            <div className="scroll-panel p-6">
              <h3 className="font-liturgical text-xl font-semibold gold-text mb-3">
                Iconographic Tradition
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {martyr.iconDescription}
              </p>
            </div>
          </div>

          {/* Biography Section */}
          <div className="space-y-8">
            <div>
              <h1 className="font-liturgical text-5xl font-bold gold-text mb-2">
                {martyr.name}
              </h1>
              {martyr.feast && (
                <p className="text-gold-300 text-lg">
                  Feast Day: {martyr.feast}
                </p>
              )}
            </div>

            <div className="scroll-panel p-8">
              <h2 className="font-liturgical text-2xl font-semibold gold-text mb-6">
                Learn Their Story
              </h2>

              <div className="prose prose-invert max-w-none">
                {martyr.story
                  .split('\n\n')
                  .map((paragraph: string, idx: number) => (
                    <p
                      key={idx}
                      className="text-slate-300 leading-relaxed mb-4"
                    >
                      {idx === 0 ? (
                        <>
                          <span className="drop-cap">
                            {paragraph.charAt(0)}
                          </span>
                          {paragraph.slice(1)}
                        </>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
              </div>

              {/* Decorative Separator */}
              <div className="flex justify-center my-8">
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-lg border border-gold-400/30">
                <h3 className="font-liturgical text-xl font-semibold gold-text mb-4">
                  Intercessory Prayer
                </h3>
                <p className="text-gold-200 italic leading-relaxed">
                  {martyr.prayer}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="icon-frame px-6 py-3 flex-1 transition-all duration-300 hover:scale-105">
                <div className="icon-inner px-4 py-2">
                  <span className="font-liturgical text-lg gold-text font-medium">
                    Read More Saints
                  </span>
                </div>
              </button>

              <button className="icon-frame px-6 py-3 flex-1 transition-all duration-300 hover:scale-105">
                <div className="icon-inner px-4 py-2">
                  <span className="font-liturgical text-lg gold-text font-medium">
                    Share Story
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
