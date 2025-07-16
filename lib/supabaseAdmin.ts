import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface SupabaseUser {
  id: string;
  email?: string;
  role?: string;
  app_metadata?: {
    role?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export async function getUserFromRequest(
  request: Request
): Promise<SupabaseUser | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) return null;
  // Convert to unknown first to satisfy TypeScript
  return data.user as unknown as SupabaseUser;
}

export function isAdmin(user: SupabaseUser | null): boolean {
  console.log("Checking if user is admin:", user?.role, user?.app_metadata?.role);
  return user?.role === "admin" || user?.app_metadata?.role === "admin";
}
