import React from "react";
import { useRouter } from "next/navigation";
import StatsGrid from "./StatsGrid";
import OrthodoxCross from "./OrthodoxCross";

interface AboutSectionProps {
  title: string;
  content: string[];
  stats: { label: string; value: string; key: string }[];
  image: { url: string; description: string };
}

export default function AboutSection({
  // title,
  // content,
  stats,
  image,
}: AboutSectionProps) {
  const router = useRouter();

  const handleExploreStories = () => {
    router.push("/gallery");
  };

  const handleViewTimeline = () => {
    router.push("/timeline");
  };

  return (
    <section className="py-24 px-6 relative" id="about-section">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-800/30 to-slate-900/20" />
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-liturgical text-5xl md:text-6xl font-bold gold-text mb-4">
            Witnesses of the Light
          </h2>
          <div className="w-24 h-1 bg-timeline-gradient mx-auto" />
        </div>

        {/* Main Content Grid - Made Symmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* First Content Panel */}
            <div className="scroll-panel p-8 h-full">
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                <span className="drop-cap">T</span>
                hroughout the ages, the Church has been sanctified by the blood
                of her children who chose death over denial. These holy martyrs,
                crowned with victory, transformed persecution into triumph,
                darkness into light, and death into eternal life.
              </p>
            </div>

            {/* Second Content Panel */}
            <div className="scroll-panel p-8 h-full">
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                Their sacred icons are not mere portraits, but{" "}
                <span className="gold-text font-medium">
                  windows into heaven
                </span>{" "}
                itself. Each face radiating the uncreated light of God, each
                story a testament to love stronger than death. Through their
                intercession, the faithful find courage to bear their own
                crosses.
              </p>
            </div>

            {/* Sacred Quote Panel */}
            <div className="scroll-panel p-6 animate-glow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <OrthodoxCross size={24} className="gold-text" />
                </div>
                <div>
                  <p className="font-liturgical text-lg text-gold-300 leading-relaxed italic mb-2">
                    &quot;I am wheat of God, and I am ground by the teeth of
                    wild beasts that I may become pure bread.&quot;
                  </p>
                  <p className="text-slate-200 text-sm">
                    ~ Saint Ignatius of Antioch, before his martyrdom
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="icon-frame p-4 animate-float">
              <div
                className="icon-inner h-80 md:h-96 bg-cover bg-center overflow-hidden relative"
                style={{ backgroundImage: `url('${image.url}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-liturgical text-gold-300 text-sm md:text-base">
                    &quot;Icons are theology in color, witnesses painted in gold
                    and prayer&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <StatsGrid stats={stats} />

            {/* Second Sacred Quote Panel */}
            <div className="scroll-panel p-6 animate-glow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <OrthodoxCross size={24} className="gold-text" />
                </div>
                <div>
                  <p className="font-liturgical text-lg text-gold-300 leading-relaxed italic mb-2">
                    &quot;The blood of martyrs is the seed of Christians. Your
                    cruelties are our glory.&quot;
                  </p>
                  <p className="text-slate-200 text-sm">
                    ~ Tertullian, reflecting on the witness of the martyrs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row - Centered and Balanced */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <button
            className="icon-frame px-6 py-3 transition-all duration-300 hover:scale-105 group"
            onClick={handleExploreStories}
          >
            <div className="icon-inner px-4 py-2 flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gold-400 rounded-full halo-glow group-hover:animate-pulse" />
              <span className="font-liturgical text-lg gold-text font-medium">
                Explore Their Stories
              </span>
            </div>
          </button>

          {/* <div className="hidden md:block w-16 h-px bg-timeline-gradient" /> */}

          <button
            className="icon-frame px-6 py-3 transition-all duration-300 hover:scale-105 group"
            onClick={handleViewTimeline}
          >
            <div className="icon-inner px-4 py-2 flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gold-400 rounded-full halo-glow group-hover:animate-pulse" />
              <span className="font-liturgical text-lg gold-text font-medium">
                View Timeline
              </span>
            </div>
          </button>
        </div>

        {/* Final Sacred Message - Centered and Elegant */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <div className="scroll-panel p-8 animate-glow">
            <div className="flex justify-center mb-6">
              <OrthodoxCross size={40} className="gold-text animate-float" />
            </div>

            <p className="font-liturgical text-xl md:text-2xl text-gold-300 leading-relaxed italic mb-4">
              &quot;Death cannot touch the soul that has already died to the
              world and lives in Christ. The martyrs discovered this secret.
              That love makes us immortal.&quot;
            </p>
            <p className="text-slate-400 text-sm">
              ~ From the Orthodox Tradition
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
