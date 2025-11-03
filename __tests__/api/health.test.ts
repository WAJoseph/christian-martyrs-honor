import { GET } from "@/app/api/health/route";
import { prisma } from "@/lib/prisma";

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    $queryRaw: jest.fn(),
  },
}));

describe("Health Check API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return healthy status when all services are up", async () => {
    // Mock successful database query
    (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([{ 1: 1 }]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(
      expect.objectContaining({
        status: "healthy",
        services: {
          database: "connected",
        },
      })
    );
    expect(data.timestamp).toBeDefined();
    expect(data.uptime).toBeDefined();
  });

  it("should return unhealthy status when database is down", async () => {
    // Mock failed database query
    (prisma.$queryRaw as jest.Mock).mockRejectedValueOnce(
      new Error("DB Connection failed")
    );

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data).toEqual(
      expect.objectContaining({
        status: "unhealthy",
        error: "DB Connection failed",
      })
    );
    expect(data.timestamp).toBeDefined();
  });
});
