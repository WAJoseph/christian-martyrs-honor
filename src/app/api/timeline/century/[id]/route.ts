import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

// GET, PUT, DELETE for a single TimelineCentury by id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const idNum = Number(id);
  const century = await prisma.timelineCentury.findUnique({
    where: { id: idNum },
  });
  if (!century)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(century);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { getUserFromRequest, isAdmin } = await import(
    "../../../../../../lib/supabaseAdmin"
  );
  const user = await getUserFromRequest(req);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const idNum = Number(id);
  const data = await req.json();
  const century = Number(data.century);
  if (isNaN(century)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const result = await prisma.timelineCentury.update({
    where: { id: idNum },
    data: {
      century: String(century),
    },
  });
  return NextResponse.json(result);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { getUserFromRequest, isAdmin } = await import(
    "../../../../../../lib/supabaseAdmin"
  );
  const user = await getUserFromRequest(req);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const idNum = Number(id);
  await prisma.timelineCentury.delete({ where: { id: idNum } });
  return NextResponse.json({ success: true });
}
