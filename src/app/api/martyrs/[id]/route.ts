import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  console.log("GET /api/martyrs/[id] called with id:", id);
  try {
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const martyr = await prisma.martyr.findUnique({
      where: { id: idNum },
    });
    if (!martyr) {
      return NextResponse.json({ error: "Martyr not found" }, { status: 404 });
    }
    return NextResponse.json(martyr);
  } catch (error) {
    console.error("Error fetching martyr:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT update a martyr by ID
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  console.log("PUT /api/martyrs/[id] called with id:", id);
  try {
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const data = await request.json();
    // Ensure new fields are included, with defaults if missing
    const {
      name,
      title,
      feastDay,
      year,
      era,
      iconUrl,
      description,
      prayer,
      story = "",
      iconDescription = "",
      intercessoryPrayer = "",
    } = data;
    const updatedMartyr = await prisma.martyr.update({
      where: { id: idNum },
      data: {
        name,
        title,
        feastDay,
        year,
        era,
        iconUrl,
        description,
        prayer,
        story,
        iconDescription,
        intercessoryPrayer,
      },
    });
    return NextResponse.json(updatedMartyr);
  } catch (error) {
    console.error("Error updating martyr:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE a martyr by ID
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  console.log("DELETE /api/martyrs/[id] called with id:", id);
  try {
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    await prisma.martyr.delete({
      where: { id: idNum },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting martyr:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
