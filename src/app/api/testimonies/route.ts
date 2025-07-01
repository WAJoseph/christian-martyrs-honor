// src/app/api/testimonies/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const testimonies = await prisma.testimony.findMany({
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
  try {
    const body = await request.json();
    const { name, title, content, date } = body;

    const testimony = await prisma.testimony.create({
      data: {
        name,
        title,
        content,
        date: new Date(date),
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
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { name, title, content, date } = body;

    const testimony = await prisma.testimony.update({
      where: { id },
      data: {
        name,
        title,
        content,
        date: new Date(date),
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
  { params }: { params: { id: string } }
) {
  try {
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
