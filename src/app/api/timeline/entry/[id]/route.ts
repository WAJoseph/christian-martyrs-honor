import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

// GET, PUT, DELETE for a single TimelineEntry by id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const entry = await prisma.timelineEntry.findUnique({
    where: { id },
    include: { century: true },
  });
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(entry);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { getUserFromRequest, isAdmin } = await import(
    "../../../../../../lib/supabaseAdmin"
  );
  const user = await getUserFromRequest(req);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(params.id);
  const data = await req.json();
  // Basic input validation
  const name = (data.name || "").toString().trim().slice(0, 128);
  const year = Number(data.year);
  const description = (data.description || "").toString().trim().slice(0, 2000);
  const centuryId = Number(data.centuryId);
  if (!name || isNaN(year) || !description || isNaN(centuryId)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const entry = await prisma.timelineEntry.update({
    where: { id },
    data: {
      name,
      year: Number(year),
      description,
      centuryId,
    },
  });
  return NextResponse.json(entry);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { getUserFromRequest, isAdmin } = await import(
    "../../../../../../lib/supabaseAdmin"
  );
  const user = await getUserFromRequest(req);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(params.id);
  await prisma.timelineEntry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
