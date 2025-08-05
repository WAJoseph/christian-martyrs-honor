import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getUserFromRequest, isAdmin } from "../../../../../lib/supabaseAdmin";

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Require admin
  const user = await getUserFromRequest(request);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { params } = await Promise.resolve(context);
    const id = parseInt(params.id);
    const body = await request.json();
    let { name, title, content, date, status, featured } = body;
    name = (name || "").toString().trim().slice(0, 64);
    title = (title || "").toString().trim().slice(0, 128);
    content = (content || "").toString().trim().slice(0, 2000);
    status = (status || "pending").toString().trim();
    featured = typeof featured === "boolean" ? featured : false;
    if (!name || !title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const testimony = await prisma.testimony.update({
      where: { id },
      data: {
        name,
        title,
        content,
        date: new Date(date),
        status,
        featured,
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
  context: { params: { id: string } }
) {
  // Require admin
  const user = await getUserFromRequest(request);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { params } = await Promise.resolve(context);
    const id = parseInt(params.id);
    await prisma.testimony.delete({
      where: { id },
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
