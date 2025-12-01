import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/rbac";
import { getUserFromRequest, isAdmin } from "../../lib/supabaseAdmin";

// Mock the supabaseAdmin module
jest.mock("../../lib/supabaseAdmin", () => ({
  getUserFromRequest: jest.fn(),
  isAdmin: jest.fn(),
}));

describe("NFR2: RBAC Protection - Admin Endpoints", () => {
  const mockAdminUser = {
    id: "admin-123",
    email: "admin@example.com",
    role: "admin",
    app_metadata: { role: "admin" },
  };

  const mockRegularUser = {
    id: "user-456",
    email: "user@example.com",
    role: "user",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/martyrs (Create Martyr)", () => {
    it("should allow admin to create martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);

      const request = new Request("http://localhost/api/martyrs", {
        method: "POST",
        body: JSON.stringify({ name: "St. Stephen" }),
      });

      const result = await requireAdmin(request);
      expect(result).toBeNull();
    });

    it("should reject non-admin user from creating martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockRegularUser);
      (isAdmin as jest.Mock).mockReturnValue(false);

      const request = new Request("http://localhost/api/martyrs", {
        method: "POST",
        body: JSON.stringify({ name: "St. Stephen" }),
      });

      const result = await requireAdmin(request);
      expect(result?.status).toBe(401);
    });

    it("should reject unauthenticated request from creating martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(null);

      const request = new Request("http://localhost/api/martyrs", {
        method: "POST",
      });

      const result = await requireAdmin(request);
      expect(result?.status).toBe(401);
    });
  });

  describe("PUT /api/martyrs/[id] (Update Martyr)", () => {
    it("should allow admin to update martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);

      const request = new Request("http://localhost/api/martyrs/1", {
        method: "PUT",
        body: JSON.stringify({ name: "St. Stephen Updated" }),
      });

      const result = await requireAdmin(request);
      expect(result).toBeNull();
    });

    it("should reject non-admin user from updating martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockRegularUser);
      (isAdmin as jest.Mock).mockReturnValue(false);

      const request = new Request("http://localhost/api/martyrs/1", {
        method: "PUT",
        body: JSON.stringify({ name: "St. Stephen Updated" }),
      });

      const result = await requireAdmin(request);
      expect(result?.status).toBe(401);
    });
  });

  describe("DELETE /api/martyrs/[id] (Delete Martyr)", () => {
    it("should allow admin to delete martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);

      const request = new Request("http://localhost/api/martyrs/1", {
        method: "DELETE",
      });

      const result = await requireAdmin(request);
      expect(result).toBeNull();
    });

    it("should reject non-admin user from deleting martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockRegularUser);
      (isAdmin as jest.Mock).mockReturnValue(false);

      const request = new Request("http://localhost/api/martyrs/1", {
        method: "DELETE",
      });

      const result = await requireAdmin(request);
      expect(result?.status).toBe(401);
    });
  });

  describe("PUT /api/testimonies/[id] (Update Testimony)", () => {
    it("should allow admin to update testimony status", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);

      const request = new Request("http://localhost/api/testimonies/1", {
        method: "PUT",
        body: JSON.stringify({
          name: "John",
          title: "My testimony",
          content: "I was blessed",
          status: "approved",
        }),
      });

      const result = await requireAdmin(request);
      expect(result).toBeNull();
    });

    it("should reject non-admin user from updating testimony", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockRegularUser);
      (isAdmin as jest.Mock).mockReturnValue(false);

      const request = new Request("http://localhost/api/testimonies/1", {
        method: "PUT",
        body: JSON.stringify({ status: "approved" }),
      });

      const result = await requireAdmin(request);
      expect(result?.status).toBe(401);
    });
  });

  describe("DELETE /api/testimonies/[id] (Delete Testimony)", () => {
    it("should allow admin to delete testimony", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);

      const request = new Request("http://localhost/api/testimonies/1", {
        method: "DELETE",
      });

      const result = await requireAdmin(request);
      expect(result).toBeNull();
    });

    it("should reject non-admin user from deleting testimony", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockRegularUser);
      (isAdmin as jest.Mock).mockReturnValue(false);

      const request = new Request("http://localhost/api/testimonies/1", {
        method: "DELETE",
      });

      const result = await requireAdmin(request);
      expect(result?.status).toBe(401);
    });
  });

  describe("Authorization Response Format", () => {
    it("should return proper 401 response with error message", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(null);

      const request = new Request("http://localhost/api/martyrs", {
        method: "POST",
      });

      const result = await requireAdmin(request);
      expect(result?.status).toBe(401);
      const body = await result?.json();
      expect(body).toEqual({ error: "Unauthorized" });
    });

    it("should return null for authorized admin user", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);

      const request = new Request("http://localhost/api/martyrs", {
        method: "POST",
      });

      const result = await requireAdmin(request);
      expect(result).toBeNull();
    });
  });

  describe("Admin User Detection", () => {
    it("should recognize user with role: admin", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue({
        id: "admin-1",
        role: "admin",
      });
      (isAdmin as jest.Mock).mockReturnValue(true);

      const request = new Request("http://localhost/api/martyrs", {
        method: "POST",
      });

      const result = await requireAdmin(request);
      expect(result).toBeNull();
      expect(isAdmin).toHaveBeenCalled();
    });

    it("should recognize user with app_metadata.role: admin", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue({
        id: "admin-2",
        app_metadata: { role: "admin" },
      });
      (isAdmin as jest.Mock).mockReturnValue(true);

      const request = new Request("http://localhost/api/martyrs", {
        method: "POST",
      });

      const result = await requireAdmin(request);
      expect(result).toBeNull();
    });
  });
});
