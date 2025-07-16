import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

// GET a single martyr by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("GET /api/martyrs/[id] called with id:", params.id);
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const martyr = await prisma.martyr.findUnique({
      where: { id },
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
  { params }: { params: { id: string } }
) {
  console.log("PUT /api/martyrs/[id] called with id:", params.id);
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
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
      where: { id },
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
  { params }: { params: { id: string } }
) {
  console.log("DELETE /api/martyrs/[id] called with id:", params.id);
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    await prisma.martyr.delete({
      where: { id },
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
