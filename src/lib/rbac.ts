import { NextResponse } from "next/server";

export async function requireAdmin(request: Request) {
  const { getUserFromRequest, isAdmin } = await import(
    "../../lib/supabaseAdmin"
  );

  const user = await getUserFromRequest(request);

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Return null when authorized (routes can continue)
  return null;
}
