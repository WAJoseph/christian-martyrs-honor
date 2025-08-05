import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

// GET all centuries
export async function GET() {
  const centuries = await prisma.timelineCentury.findMany({
    orderBy: { century: "asc" },
  });
  return NextResponse.json(centuries);
}

// POST create a new century (admin only)
export async function POST(req: Request) {
  const { getUserFromRequest, isAdmin } = await import(
    "../../../../../lib/supabaseAdmin"
  );
  const user = await getUserFromRequest(req);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const century = (data.century || "").toString().trim().slice(0, 32);
  if (!century) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const result = await prisma.timelineCentury.create({
    data: {
      century,
    },
  });
  return NextResponse.json(result);
}
