import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const idNum = Number(id);
  if (isNaN(idNum)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  const entry = await prisma.timelineEntry.findUnique({
    where: { id: idNum },
    include: { century: true },
  });
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(entry);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const idNum = Number(id);
  const { getUserFromRequest, isAdmin } = await import(
    "../../../../../../lib/supabaseAdmin"
  );
  const user = await getUserFromRequest(req);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (isNaN(idNum)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  const data = await req.json();
  // Basic input validation
  const normName = (data.name || "").toString().trim().slice(0, 128);
  const normYear = (data.year || "").toString().trim().slice(0, 16);
  const normDescription = (data.description || "")
    .toString()
    .trim()
    .slice(0, 2000);
  const centuryId = Number(data.centuryId);
  const martyrId =
    data.martyrId !== undefined &&
    data.martyrId !== null &&
    data.martyrId !== ""
      ? Number(data.martyrId)
      : null;
  if (!normName || !normYear || !normDescription || isNaN(centuryId)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const entry = await prisma.timelineEntry.update({
    where: { id: idNum },
    data: {
      name: normName,
      year: normYear,
      description: normDescription,
      centuryId,
      martyrId,
    },
  });
  return NextResponse.json(entry);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const idNum = Number(id);
  const { getUserFromRequest, isAdmin } = await import(
    "../../../../../../lib/supabaseAdmin"
  );
  const user = await getUserFromRequest(req);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (isNaN(idNum)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  try {
    await prisma.timelineEntry.delete({ where: { id: idNum } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Not found or already deleted" },
      { status: 404 }
    );
  }
}
