// src/app/martyr/[id]/page.tsx

import Navigation from "@/components/ui/Navigation";
import dynamic from "next/dynamic";

interface MartyrDetailProps {
  martyr: {
    id: number;
    name: string;
    era: string;
    iconUrl: string;
    prayer: string;
    story: string;
    iconDescription: string;
    intercessoryPrayer: string;
    feastDay?: string;
  };
}

import ActionButtons from "../_components/ActionButtons";

function MartyrDetail({ martyr }: MartyrDetailProps) {
  return (
    <div className="min-h-screen pt-30 pb-12 px-6">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Icon Section */}
          <div className="space-y-6">
            <div className="icon-frame p-6">
              <div className="icon-inner overflow-hidden">
                {martyr.iconUrl && (
                  <img
                    src={martyr.iconUrl}
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
              {martyr.feastDay && (
                <p className="text-gold-300 text-lg">
                  Feast Day: {martyr.feastDay}
                </p>
              )}
            </div>
            <div className="scroll-panel p-8">
              <h2 className="font-liturgical text-2xl font-semibold gold-text mb-6">
                Learn Their Story
              </h2>
              <div className="prose prose-invert max-w-none">
                {martyr.story
                  ? martyr.story
                      .split("\n\n")
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
                      ))
                  : null}
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
                  {martyr.intercessoryPrayer || martyr.prayer}
                </p>
              </div>
            </div>
            {/* Action Buttons */}
            <ActionButtons martyrName={martyr.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function MartyrPage({
  params,
}: {
  params: { id: string };
}) {
  // Server component: fetch data on the server
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/martyrs/${params.id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return (
      <div className="min-h-screen pt-30 pb-12 px-6">
        <Navigation />
        <div className="max-w-7xl mx-auto text-center text-2xl text-red-400 mt-20">
          Martyr not found.
        </div>
      </div>
    );
  }
  const martyr = await res.json();
  return <MartyrDetail martyr={martyr} />;
}
