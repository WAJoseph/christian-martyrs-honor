// PUT update a timeline entry (admin only)
export async function PUT(req: Request) {
  const { getUserFromRequest, isAdmin } = await import(
    "../../../../../lib/supabaseAdmin"
  );
  const user = await getUserFromRequest(req);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const id = Number(data.id);
  const name = (data.name || "").toString().trim().slice(0, 128);
  const year = (data.year || "").toString().trim().slice(0, 16);
  const description = (data.description || "").toString().trim().slice(0, 2000);
  const centuryId = Number(data.centuryId);
  const martyrId =
    data.martyrId !== undefined &&
    data.martyrId !== null &&
    data.martyrId !== ""
      ? Number(data.martyrId)
      : null;
  if (!id || !name || !year || !description || isNaN(centuryId)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  try {
    const entry = await prisma.timelineEntry.update({
      where: { id },
      data: {
        name,
        year,
        description,
        centuryId,
        martyrId,
      },
      include: { century: true, martyr: true },
    });
    return NextResponse.json(entry);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

// GET all timeline entries with century info
export async function GET() {
  const entries = await prisma.timelineEntry.findMany({
    include: { century: true, martyr: true },
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
  const year = (data.year || "").toString().trim().slice(0, 16);
  const description = (data.description || "").toString().trim().slice(0, 2000);
  const centuryId = Number(data.centuryId);
  if (!name || !year || !description || isNaN(centuryId)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const entry = await prisma.timelineEntry.create({
    data: {
      name,
      year,
      description,
      centuryId,
    },
  });
  return NextResponse.json(entry);
}
