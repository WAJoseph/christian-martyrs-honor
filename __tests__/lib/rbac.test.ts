import { requireAdmin } from "@/lib/rbac";
import { getUserFromRequest, isAdmin } from "../../lib/supabaseAdmin";

// Mock the supabaseAdmin module
jest.mock("../../lib/supabaseAdmin", () => ({
  getUserFromRequest: jest.fn(),
  isAdmin: jest.fn(),
}));

describe("RBAC Helper", () => {
  const mockRequest = new Request("http://localhost/api/test");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should allow admin users", async () => {
    const mockUser = { role: "admin" };
    (getUserFromRequest as jest.Mock).mockResolvedValue(mockUser);
    (isAdmin as jest.Mock).mockReturnValue(true);

    const result = await requireAdmin(mockRequest);
    expect(result).toBeNull();
    expect(getUserFromRequest).toHaveBeenCalledWith(mockRequest);
    expect(isAdmin).toHaveBeenCalledWith(mockUser);
  });

  it("should reject non-admin users", async () => {
    const mockUser = { role: "user" };
    (getUserFromRequest as jest.Mock).mockResolvedValue(mockUser);
    (isAdmin as jest.Mock).mockReturnValue(false);

    const result = await requireAdmin(mockRequest);
    expect(result?.status).toBe(401);
    const body = await result?.json();
    expect(body).toEqual({ error: "Unauthorized" });
  });

  it("should reject unauthenticated requests", async () => {
    (getUserFromRequest as jest.Mock).mockResolvedValue(null);

    const result = await requireAdmin(mockRequest);
    expect(result?.status).toBe(401);
    const body = await result?.json();
    expect(body).toEqual({ error: "Unauthorized" });
  });
});
