import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const centuries = await prisma.timelineCentury.findMany({
      include: {
        entries: true,
      },
      orderBy: { century: "asc" },
    });
    // Format data to match the previous timelineData structure
    const timeline = centuries.map((century) => ({
      century: century.century,
      martyrs: century.entries.map((entry) => ({
        name: entry.name,
        year: entry.year,
        description: entry.description,
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
