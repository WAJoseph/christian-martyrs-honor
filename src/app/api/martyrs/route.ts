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
  // Authenticate admin
  const { getUserFromRequest } = await import("../../../../lib/supabaseAdmin");
  const user = await getUserFromRequest(request);
  // Debug log for admin detection
  console.log("API user:", user);
  const isAdmin =
    user && (user.role === "admin" || user.app_metadata?.role === "admin");
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
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
    } = body;

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
        story,
        iconDescription,
        intercessoryPrayer,
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
  { params }: { params: Promise<{ id: string }> }
) {
  // Authenticate admin
  const { getUserFromRequest } = await import("../../../../lib/supabaseAdmin");
  const user = await getUserFromRequest(request);
  // Debug log for admin detection
  console.log("API user:", user);
  const isAdmin =
    user && (user.role === "admin" || user.app_metadata?.role === "admin");
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const body = await request.json();
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
    } = body;

    const martyr = await prisma.martyr.update({
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
  { params }: { params: Promise<{ id: string }> }
) {
  // Authenticate admin
  const { getUserFromRequest } = await import("../../../../lib/supabaseAdmin");
  const user = await getUserFromRequest(request);
  // Debug log for admin detection
  console.log("API user:", user);
  const isAdmin =
    user && (user.role === "admin" || user.app_metadata?.role === "admin");
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const idNum = parseInt(id);

    await prisma.martyr.delete({
      where: { id: idNum },
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
