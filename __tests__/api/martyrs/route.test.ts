import { mockContext } from "../../../setupTests";
import { createTestRequest } from "../../../test/testRequest";
import * as martyrsRoute from "@/app/api/martyrs/route";
import * as rbac from "@/lib/rbac";

jest.mock("@/lib/prisma", () => ({
  prisma: mockContext.prisma,
}));

jest.mock("@/lib/rbac", () => ({
  requireAdmin: jest.fn(),
}));

describe("Martyrs API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("GET", () => {
    it("should return an empty list when no martyrs exist", async () => {
      mockContext.prisma.martyr.findMany.mockResolvedValue([]);

      const response = await martyrsRoute.GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual([]);
      expect(mockContext.prisma.martyr.findMany).toHaveBeenCalledWith({
        orderBy: { name: "asc" },
      });
    });

    it("should return a list of martyrs", async () => {
      const mockMartyrs = [
        {
          id: 1,
          name: "Test Martyr",
          title: "Blessed",
          feastDay: "2024-01-01",
          year: 100,
          era: "Roman",
          iconUrl: "test.jpg",
          description: "Test Description",
          prayer: "Test Prayer",
          story: "Test Story",
          iconDescription: "Test Icon Description",
          intercessoryPrayer: "Test Intercessory Prayer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockContext.prisma.martyr.findMany.mockResolvedValue(mockMartyrs);

      const response = await martyrsRoute.GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockMartyrs);
      expect(mockContext.prisma.martyr.findMany).toHaveBeenCalledWith({
        orderBy: { name: "asc" },
      });
    });

    it("should handle database errors", async () => {
      mockContext.prisma.martyr.findMany.mockRejectedValue(
        new Error("Database error")
      );

      const response = await martyrsRoute.GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: "Failed to fetch martyrs" });
      expect(mockContext.prisma.martyr.findMany).toHaveBeenCalledWith({
        orderBy: { name: "asc" },
      });
    });
  });

  describe("POST", () => {
    const mockMartyrData = {
      name: "Test Martyr",
      title: "Blessed",
      feastDay: "2024-01-01",
      year: 100,
      era: "Roman",
      iconUrl: "test.jpg",
      description: "Test Description",
      prayer: "Test Prayer",
      story: "Test Story",
      iconDescription: "Test Icon Description",
      intercessoryPrayer: "Test Intercessory Prayer",
    };

    it("should create a new martyr when authenticated", async () => {
      (rbac.requireAdmin as jest.Mock).mockResolvedValue(null);
      mockContext.prisma.martyr.create.mockResolvedValue({
        ...mockMartyrData,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const request = createTestRequest({
        method: "POST",
        url: "http://localhost/api/martyrs",
        body: mockMartyrData,
      });

      const response = await martyrsRoute.POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toMatchObject(mockMartyrData);
      expect(mockContext.prisma.martyr.create).toHaveBeenCalledWith({
        data: mockMartyrData,
      });
    });

    it("should reject unauthorized requests", async () => {
      (rbac.requireAdmin as jest.Mock).mockResolvedValue(
        Response.json({ error: "Unauthorized" }, { status: 401 })
      );

      const request = createTestRequest({
        method: "POST",
        url: "http://localhost/api/martyrs",
        body: mockMartyrData,
      });

      const response = await martyrsRoute.POST(request);

      expect(response.status).toBe(401);
      expect(await response.json()).toEqual({ error: "Unauthorized" });
      expect(mockContext.prisma.martyr.create).not.toHaveBeenCalled();
    });

    it("should handle database errors", async () => {
      (rbac.requireAdmin as jest.Mock).mockResolvedValue(null);
      mockContext.prisma.martyr.create.mockRejectedValue(
        new Error("Database error")
      );

      const request = createTestRequest({
        method: "POST",
        url: "http://localhost/api/martyrs",
        body: mockMartyrData,
      });

      const response = await martyrsRoute.POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: "Failed to create martyr" });
    });
  });
});
