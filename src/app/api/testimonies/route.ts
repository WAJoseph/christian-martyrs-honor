// src/app/api/testimonies/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getUserFromRequest } from "../../../../lib/supabaseAdmin";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const showAll = url.searchParams.get("all");
    const where = showAll ? {} : { status: "approved" };
    const testimonies = await prisma.testimony.findMany({
      where,
      orderBy: { date: "desc" },
    });
    return NextResponse.json(testimonies);
  } catch (error) {
    console.error("Error fetching testimonies:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Require authentication
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    let { name, title, content } = body;
    const { date } = body;
    // Basic input validation and sanitization
    name = (name || "").toString().trim().slice(0, 64);
    title = (title || "").toString().trim().slice(0, 128);
    content = (content || "").toString().trim().slice(0, 2000);
    // Validate date
    let parsedDate: Date;
    if (!date || isNaN(Date.parse(date))) {
      parsedDate = new Date();
    } else {
      parsedDate = new Date(date);
    }
    if (!name || !title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const testimony = await prisma.testimony.create({
      data: {
        name,
        title,
        content,
        date: parsedDate,
        status: "pending", // All new testimonies are pending
      },
    });

    return NextResponse.json(testimony, { status: 201 });
  } catch (error) {
    console.error("Error creating testimony:", error);
    return NextResponse.json(
      { error: "Failed to create testimony" },
      { status: 500 }
    );
  }
}

// src/app/api/testimonies/[id]/route.ts

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Require authentication (or admin if needed)
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await context.params;
    const idNum = Number(id);
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const body = await request.json();
    const { name, title, content, date } = body;
    const normName = (name || "").toString().trim().slice(0, 64);
    const normTitle = (title || "").toString().trim().slice(0, 128);
    const normContent = (content || "").toString().trim().slice(0, 2000);
    const normDate =
      date && !isNaN(Date.parse(date)) ? new Date(date) : new Date();
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
        date: normDate,
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
  // Require authentication (or admin if needed)
  const user = await getUserFromRequest(request);
  if (!user) {
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
