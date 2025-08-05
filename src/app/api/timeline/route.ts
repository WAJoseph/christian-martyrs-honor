import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const centuries = await prisma.timelineCentury.findMany({
      include: {
        entries: {
          include: {
            martyr: true,
          },
          orderBy: { year: "asc" },
        },
      },
      orderBy: { century: "asc" },
    });
    // Format data to include martyr gallery info for frontend
    const timeline = centuries.map((century) => ({
      century: century.century,
      martyrs: century.entries.map((entry) => ({
        name: entry.name,
        year: entry.year,
        description: entry.description,
        martyr: entry.martyr
          ? {
              id: entry.martyr.id,
              story: entry.martyr.story,
              intercessoryPrayer: entry.martyr.intercessoryPrayer,
              iconUrl: entry.martyr.iconUrl,
            }
          : null,
      })),
    }));
    return NextResponse.json(timeline);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch timeline" },
      { status: 500 }
    );
  }
}
