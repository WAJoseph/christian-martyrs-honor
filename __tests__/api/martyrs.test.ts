import { POST } from "@/app/api/martyrs/route";
import { PUT, DELETE } from "@/app/api/martyrs/[id]/route";
import { requireAdmin } from "@/lib/rbac";
import { createTestRequest } from "../../test/testRequest";
import "../../setupTests";
import { prisma } from "@/lib/prisma";

// Mock dependencies
jest.mock("@/lib/rbac");

describe("Martyrs API Routes", () => {
  const mockData = {
    name: "St. Test",
    title: "Test Title",
    feastDay: "2025-01-01",
    year: "325",
    era: "Patristic",
    iconUrl: "test.jpg",
    description: "Test description",
    prayer: "Test prayer",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/martyrs", () => {
    it("should create a martyr when authorized", async () => {
      // Mock successful auth
      (requireAdmin as jest.Mock).mockResolvedValue(null);

      // Mock successful creation with all fields
      (prisma.martyr.create as jest.Mock).mockResolvedValue({
        ...mockData,
        id: 1,
        story: "",
        iconDescription: "",
        intercessoryPrayer: "",
      });

      const request = createTestRequest({
        method: "POST",
        url: "http://localhost/api/martyrs",
        body: mockData,
      });

      const response = await POST(request);
      expect(response.status).toBe(201);
      expect(requireAdmin).toHaveBeenCalledWith(request);

      const body = await response.json();
      expect(body).toEqual({
        ...mockData,
        id: expect.any(Number),
        story: "",
        iconDescription: "",
        intercessoryPrayer: "",
      });
    });

    it("should reject unauthorized requests", async () => {
      // Mock failed auth
      (requireAdmin as jest.Mock).mockResolvedValue(
        new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
      );

      const request = createTestRequest({
        method: "POST",
        url: "http://localhost/api/martyrs",
        body: mockData,
      });

      const response = await POST(request);
      expect(response.status).toBe(401);
      const body = await response.json();
      expect(body).toEqual({ error: "Unauthorized" });
      expect(prisma.martyr.create).not.toHaveBeenCalled();
    });
  });

  describe("PUT /api/martyrs/[id]", () => {
    it("should update a martyr when authorized", async () => {
      const mockParams = { id: "1" };

      (requireAdmin as jest.Mock).mockResolvedValue(null);
      (prisma.martyr.update as jest.Mock).mockResolvedValue({
        ...mockData,
        id: 1,
        name: "St. Test Updated",
        story: "",
        iconDescription: "",
        intercessoryPrayer: "",
      });

      // Set up mock BEFORE the request
      (prisma.martyr.update as jest.Mock).mockResolvedValue({
        ...mockData,
        id: 1,
        name: "St. Test Updated",
        story: "",
        iconDescription: "",
        intercessoryPrayer: "",
      });

      const request = createTestRequest({
        method: "PUT",
        url: "http://localhost/api/martyrs/1",
        body: mockData,
      });

      const response = await PUT(request, {
        params: Promise.resolve(mockParams),
      });

      expect(response.status).toBe(200);
      expect(requireAdmin).toHaveBeenCalledWith(request);

      const body = await response.json();
      expect(body).toEqual({
        ...mockData,
        id: 1,
        name: "St. Test Updated",
        story: "",
        iconDescription: "",
        intercessoryPrayer: "",
      });
    });
  });

  describe("DELETE /api/martyrs/[id]", () => {
    it("should delete a martyr when authorized", async () => {
      const mockParams = { id: "1" };

      (requireAdmin as jest.Mock).mockResolvedValue(null);
      (prisma.martyr.delete as jest.Mock).mockResolvedValue({ id: 1 });

      // Set up mock BEFORE the request
      (prisma.martyr.delete as jest.Mock).mockResolvedValue({ id: 1 });

      const request = createTestRequest({
        method: "DELETE",
        url: "http://localhost/api/martyrs/1",
      });

      const response = await DELETE(request, {
        params: Promise.resolve(mockParams),
      });

      expect(response.status).toBe(200);
      expect(requireAdmin).toHaveBeenCalledWith(request);
      expect(prisma.martyr.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      const body = await response.json();
      expect(body).toEqual({ success: true });
    });
  });
});
