'use client'

import { useState } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// const martyrs = await prisma.martyr.findMany()
// const centuries = await prisma.timelineCentury.findMany({ include: { entries: true } })

const churchImages = [
  {
    id: 1,
    url: "/Church-ceiling2.jpg",
    alt: "Orthodox Church Interior with Iconostasis",
    description: "Traditional Orthodox church interior"
  },
  {
    id: 2,
    url: "/Church-ceiling.jpg",
    alt: "Orthodox Icons",
    description: "Sacred iconography preserves divine truth"
  }
]

const siteContent = {
  hero: {
    title: "",
    subtitle: "A digital sanctuary honoring the holy martyrs through the sacred tradition of Eastern Orthodox iconography",
    quote: "Holy Martyrs, who shed your blood for Christ, intercede for us before the throne of the Almighty...",
    quoteSource: "Orthodox Prayer"
  },
  sections: {
    about: {
      title: "Preserving Sacred Memory",
      content: [
        "Throughout the centuries, countless faithful souls have offered their lives as the ultimate testimony to their unwavering faith in Christ. These holy martyrs, through their sacrifice, have become beacons of divine love and courage.",
        "Each icon is more than art—it is a window to heaven, a sacred portal through which we commune with the saints who have gone before us. Their stories continue to inspire and strengthen the faithful across generations."
      ]
    },
    stats: [
      { label: "Holy Martyrs", value: "100+", key: "martyrs_count" },
      { label: "Centuries", value: "4", key: "centuries_span" },
      { label: "Divine Grace", value: "∞", key: "divine_grace" }
    ]
  }
}

export default function HomePage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Event handlers for database integration
  const handleViewMartyr = (martyrId: number) => {
    console.log(`Viewing martyr ${martyrId}`)
    // Will navigate to /martyr/${martyrId}
  }

  const handleEnterSanctuary = () => {
    console.log('Entering sanctuary')
    // Will navigate to /gallery
  }

  const handleViewTimeline = () => {
    console.log('Viewing timeline')
    // Will navigate to /timeline
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background Layers */}
        <div className="absolute inset-0 bg-slate-900" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${churchImages[0].url}')`,
          }}
        />
        
        {/* Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/70" />

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          {/* Enhanced Title with Staggered Animation */}
          <div className="mb-8">
            <h1 className="font-liturgical text-6xl md:text-8xl lg:text-9xl font-bold mb-16 gold-text text-shadow-gold animate-float">
              {siteContent.hero.title}
            </h1>
            <div className="w-32 h-1 bg-timeline-gradient mx-auto mb-6 animate-glow" />
          </div>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 mb-10 font-light leading-relaxed max-w-3xl mx-auto animate-fade-in">
            {siteContent.hero.subtitle.split('Eastern Orthodox iconography')[0]}
            <span className="gold-text font-medium">Eastern Orthodox iconography</span>
            {siteContent.hero.subtitle.split('Eastern Orthodox iconography')[1]}
          </p>

          {/* Enhanced Quote Panel */}
          <div className="scroll-panel p-8 mb-10 max-w-3xl mx-auto animate-glow">
            <div className="flex items-start space-x-4">
              {/* Orthodox Cross */}
              <div className="flex-shrink-0 mt-1">
                <svg width="20" height="26" viewBox="0 0 20 26" className="gold-text">
                  <rect x="8" y="0" width="4" height="24" fill="currentColor" />
                  <rect x="2" y="6" width="16" height="3" fill="currentColor" />
                  <rect x="4" y="12" width="12" height="4" fill="currentColor" />
                  <rect x="6" y="20" width="8" height="3" fill="currentColor" transform="rotate(-15 10 21.5)" />
                </svg>
              </div>
              <div>
                <p className="font-liturgical text-lg md:text-xl text-gold-300 leading-relaxed italic mb-2">
                  "{siteContent.hero.quote}"
                </p>
                <p className="text-slate-400 text-sm">— {siteContent.hero.quoteSource}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="space-y-6 mb-8">
            <button 
              onClick={handleEnterSanctuary}
              className="icon-frame px-10 py-5 transition-all duration-500 hover:scale-110 group animate-float"
            >
              <div className="icon-inner px-8 py-4 flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-gold-400 rounded-full halo-glow group-hover:animate-pulse" />
                <span className="font-liturgical text-xl md:text-2xl gold-text font-semibold">
                  Enter the Sanctuary
                </span>
              </div>
            </button>

            <div className="flex justify-center animate-bounce">
              <div className="icon-frame p-2">
                <div className="icon-inner p-2">
                  <ArrowDown className="gold-text" size={28} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Introduction Section */}
      <section className="py-24 px-6 relative">
        {/* Section Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-liturgical text-5xl md:text-6xl font-bold gold-text mb-4">
              {siteContent.sections.about.title}
            </h2>
            <div className="w-24 h-1 bg-timeline-gradient mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Text Content */}
            <div className="space-y-8">
              {siteContent.sections.about.content.map((paragraph, index) => (
                <div key={index} className="scroll-panel p-8">
                  <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                    {index === 0 && (
                      <span className="drop-cap">T</span>
                    )}
                    {paragraph.includes('window to heaven') ? (
                      <>
                        {paragraph.split('window to heaven')[0]}
                        <span className="gold-text font-medium">window to heaven</span>
                        {paragraph.split('window to heaven')[1]}
                      </>
                    ) : paragraph}
                  </p>
                </div>
              ))}

              {/* Call to Action */}
              <div className="pt-6">
                <button 
                  onClick={() => handleViewMartyr(0)}
                  className="icon-frame px-6 py-3 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="icon-inner px-4 py-2 flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gold rounded-full halo-glow group-hover:animate-spin" />
                    <span className="font-liturgical text-lg gold-text font-medium">
                      Explore Their Stories
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Enhanced Image with Multiple Frames */}
            <div className="space-y-6">
              <div className="icon-frame p-4 animate-float">
                <div
                  className="icon-inner h-80 md:h-96 bg-cover bg-center overflow-hidden relative"
                  style={{
                    backgroundImage: `url('${churchImages[1].url}')`,
                  }}
                >
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-liturgical text-gold-300 text-sm md:text-base">
                      {churchImages[1].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats/Features */}
              <div className="grid grid-cols-3 gap-4">
                {siteContent.sections.stats.map((stat) => (
                  <div key={stat.key} className="scroll-panel p-4 text-center">
                    <div className="gold-text font-liturgical text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-panel p-12 animate-glow">
            {/* Orthodox Cross */}
            <div className="flex justify-center mb-6">
              <svg width="48" height="64" viewBox="0 0 48 64" className="gold-text animate-float">
                <rect x="20" y="0" width="8" height="60" fill="currentColor" />
                <rect x="8" y="12" width="32" height="6" fill="currentColor" />
                <rect x="4" y="24" width="40" height="8" fill="currentColor" />
                <rect x="12" y="48" width="24" height="6" fill="currentColor" transform="rotate(-15 24 51)" />
              </svg>
            </div>
            <h3 className="font-liturgical text-3xl md:text-4xl font-bold gold-text mb-6">
              Begin Your Sacred Journey
            </h3>
            <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed">
              Discover the profound stories of faith, courage, and divine love that 
              continue to inspire believers across the world.
            </p>
            <button 
              onClick={handleViewTimeline}
              className="icon-frame px-8 py-4 transition-all duration-300 hover:scale-105 group"
            >
              <div className="icon-inner px-6 py-3 flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-gold-400 rounded-full halo-glow group-hover:animate-pulse" />
                <span className="font-liturgical text-xl gold-text font-semibold">
                  View Timeline
                </span>
                <ArrowRight className="gold-text group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}