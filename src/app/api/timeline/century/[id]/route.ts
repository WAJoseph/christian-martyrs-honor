import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

// GET, PUT, DELETE for a single TimelineCentury by id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const century = await prisma.timelineCentury.findUnique({
    where: { id },
  });
  if (!century)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(century);
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
  const century = Number(data.century);
  if (isNaN(century)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const result = await prisma.timelineCentury.update({
    where: { id },
    data: {
      century: Number(century),
    },
  });
  return NextResponse.json(result);
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
  await prisma.timelineCentury.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
