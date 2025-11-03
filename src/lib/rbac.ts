import { NextResponse } from "next/server";

// Centralized RBAC helper for API routes
export async function requireAdmin(request: Request) {
  // Import the Supabase admin helper (kept in repo root `lib`)
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
