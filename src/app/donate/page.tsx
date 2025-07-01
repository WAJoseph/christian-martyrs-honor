'use client'

import Navigation from '@/components/ui/Navigation'
import { useState } from 'react'

export default function Donate() {
  const [type, setType] = useState<'one-time' | 'monthly'>('one-time')
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState('')

  const suggested = [25, 50, 100, 250, 500, 1000]

  return (
    <div className="min-h-screen pt-30 pb-12 px-6">
      <Navigation />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-liturgical text-5xl font-bold gold-text mb-4">
            Support Our Mission
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Help us preserve and share the sacred stories of Christian martyrs for future generations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="scroll-panel p-8">
            <h2 className="font-liturgical text-2xl font-semibold gold-text mb-6">
              Make a Donation
            </h2>

            {/* Type */}
            <div className="mb-6">
              <label className="block text-gold-300 font-medium mb-3">
                Donation Type
              </label>
              <div className="flex space-x-4">
                {['one-time', 'monthly'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t as any)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      type === t
                        ? 'bg-gold-500 text-slate-900'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {t === 'one-time' ? 'One-Time' : 'Monthly'}
                  </button>
                ))}
              </div>
            </div>

            {/* Amounts */}
            <div className="mb-6">
              <label className="block text-gold-300 font-medium mb-3">
                Select Amount
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {suggested.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setSelected(amt)
                      setCustom('')
                    }}
                    className={`icon-frame p-1 transition-all duration-300 hover:scale-105 ${
                      selected === amt ? 'animate-glow' : ''
                    }`}
                  >
                    <div className="icon-inner px-4 py-3 text-center">
                      <span className="font-liturgical text-lg gold-text font-medium">
                        ${amt}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-gold-300 font-medium mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 gold-text font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value)
                      setSelected(null)
                    }}
                    className="w-full bg-slate-800 border border-gold-400/30 rounded-lg pl-8 pr-4 py-3 text-slate-200 focus:border-gold-400 focus:outline-none transition-colors duration-300"
                    placeholder="Enter custom amount"
                  />
                </div>
              </div>
            </div>

            {/* Donor Info */}
            <div className="space-y-4 mb-6">
              <h3 className="font-liturgical text-xl font-semibold gold-text">
                Donor Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['First Name', 'Last Name', 'Email'].map((label) => (
                  <div key={label}>
                    <label className="block text-gold-300 font-medium mb-2">
                      {label}
                    </label>
                    <input
                      type={label === 'Email' ? 'email' : 'text'}
                      className="w-full bg-slate-800 border border-gold-400/30 rounded-lg px-4 py-3 text-slate-200 focus:border-gold-400 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-500"
                    style={{ width: '68%' }}
                  />
                </div>
                <span className="gold-text font-medium">68%</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                $68,420 raised of $100,000 goal
              </p>
            </div>

            {/* Submit */}
            <button className="w-full icon-frame p-1 transition-all duration-300 hover:scale-105 hover:animate-glow">
              <div className="icon-inner px-6 py-4">
                <span className="font-liturgical text-xl gold-text font-semibold">
                  Complete Donation
                </span>
              </div>
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-slate-400">
                🔒 Secure checkout powered by industry-leading encryption
              </p>
            </div>
          </div>

          {/* Impact */}
          <div className="space-y-8">
            <div className="scroll-panel p-8">
              <h3 className="font-liturgical text-2xl font-semibold gold-text mb-6">
                Your Impact
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-gold-400 pl-4">
                  <h4 className="font-liturgical text-xl font-semibold text-gold-300 mb-2">
                    $25 – Preserve One Story
                  </h4>
                  <p className="text-slate-300">
                    Fund the research and digital preservation of one martyr’s complete biography and iconography.
                  </p>
                </div>
                <div className="border-l-4 border-crimson-400 pl-4">
                  <h4 className="font-liturgical text-xl font-semibold text-gold-300 mb-2">
                    $100 – Commission an Icon
                  </h4>
                  <p className="text-slate-300">
                    Support traditional iconographers in creating new sacred art for our digital gallery.
                  </p>
                </div>
                <div className="border-l-4 border-emerald-400 pl-4">
                  <h4 className="font-liturgical text-xl font-semibold text-gold-300 mb-2">
                    $500 – Educational Outreach
                  </h4>
                  <p className="text-slate-300">
                    Sponsor educational programs that bring martyr stories to schools and parishes worldwide.
                  </p>
                </div>
              </div>
            </div>

            <div className="scroll-panel p-8">
              <h3 className="font-liturgical text-2xl font-semibold gold-text mb-6">
                Our Mission
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                <span className="drop-cap">E</span>
                very donation helps us continue our sacred work of preserving and sharing the testimonies of Christian martyrs through the beautiful tradition of Eastern Orthodox iconography.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Your generosity ensures that these powerful stories of faith, courage, and sacrifice will inspire future generations of believers around the world.
              </p>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
