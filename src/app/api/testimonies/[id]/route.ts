import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getUserFromRequest, isAdmin } from "../../../../../lib/supabaseAdmin";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const idNum = Number(id);
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const testimony = await prisma.testimony.findUnique({
      where: { id: idNum },
    });
    if (!testimony) {
      return NextResponse.json(
        { error: "Testimony not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(testimony);
  } catch (error) {
    console.error("Error fetching testimony:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimony" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Require admin
  const user = await getUserFromRequest(request);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await context.params;
    const idNum = Number(id);
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const body = await request.json();
    const { name, title, content, status, featured, date } = body;
    const normName = (name || "").toString().trim().slice(0, 64);
    const normTitle = (title || "").toString().trim().slice(0, 128);
    const normContent = (content || "").toString().trim().slice(0, 2000);
    const normStatus = (status || "pending").toString().trim();
    const normFeatured = typeof featured === "boolean" ? featured : false;
    if (!normName || !normTitle || !normContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const testimony = await prisma.testimony.update({
      where: { id: idNum },
      data: {
        name: normName,
        title: normTitle,
        content: normContent,
        date: date ? new Date(date) : undefined,
        status: normStatus,
        featured: normFeatured,
      },
    });
    return NextResponse.json(testimony);
  } catch (error) {
    console.error("Error updating testimony:", error);
    return NextResponse.json(
      { error: "Failed to update testimony" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Require admin
  const user = await getUserFromRequest(request);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await context.params;
    const idNum = Number(id);
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    await prisma.testimony.delete({
      where: { id: idNum },
    });
    return NextResponse.json({ message: "Testimony deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimony:", error);
    return NextResponse.json(
      { error: "Failed to delete testimony" },
      { status: 500 }
    );
  }
}
