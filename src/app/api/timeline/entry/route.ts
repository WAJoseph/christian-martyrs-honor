import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

// GET all timeline entries with century info
export async function GET() {
  const entries = await prisma.timelineEntry.findMany({
    include: { century: true },
    orderBy: [{ century: { century: "asc" } }, { year: "asc" }],
  });
  return NextResponse.json(entries);
}

// POST create a new timeline entry (admin only)
export async function POST(req: Request) {
  const { getUserFromRequest, isAdmin } = await import(
    "../../../../../lib/supabaseAdmin"
  );
  const user = await getUserFromRequest(req);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  // Basic input validation
  const name = (data.name || "").toString().trim().slice(0, 128);
  const year = Number(data.year);
  const description = (data.description || "").toString().trim().slice(0, 2000);
  const centuryId = Number(data.centuryId);
  if (!name || isNaN(year) || !description || isNaN(centuryId)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const entry = await prisma.timelineEntry.create({
    data: {
      name,
      year: Number(year),
      description,
      centuryId,
    },
  });
  return NextResponse.json(entry);
}
