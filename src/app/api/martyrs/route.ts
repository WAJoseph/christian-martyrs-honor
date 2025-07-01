// src/app/api/martyrs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const martyrs = await prisma.martyr.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(martyrs);
  } catch (error) {
    console.error("Error fetching martyrs:", error);
    return NextResponse.json(
      { error: "Failed to fetch martyrs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, title, feastDay, year, era, iconUrl, description, prayer } =
      body;

    const martyr = await prisma.martyr.create({
      data: {
        name,
        title,
        feastDay,
        year,
        era,
        iconUrl,
        description,
        prayer,
      },
    });

    return NextResponse.json(martyr, { status: 201 });
  } catch (error) {
    console.error("Error creating martyr:", error);
    return NextResponse.json(
      { error: "Failed to create martyr" },
      { status: 500 }
    );
  }
}

// src/app/api/martyrs/[id]/route.ts
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { name, title, feastDay, year, era, iconUrl, description, prayer } =
      body;

    const martyr = await prisma.martyr.update({
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
      },
    });

    return NextResponse.json(martyr);
  } catch (error) {
    console.error("Error updating martyr:", error);
    return NextResponse.json(
      { error: "Failed to update martyr" },
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

    await prisma.martyr.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Martyr deleted successfully" });
  } catch (error) {
    console.error("Error deleting martyr:", error);
    return NextResponse.json(
      { error: "Failed to delete martyr" },
      { status: 500 }
    );
  }
}
