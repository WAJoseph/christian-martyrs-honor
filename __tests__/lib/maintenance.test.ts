import { NextRequest } from "next/server";
import {
  setMaintenanceMode,
  endMaintenanceMode,
  middleware,
} from "@/lib/maintenance";

describe("Maintenance Mode", () => {
  beforeEach(() => {
    endMaintenanceMode(); // Reset maintenance mode before each test
  });

  it("should allow access to health check endpoint during maintenance", async () => {
    const start = new Date();
    const end = new Date(start.getTime() + 3600000); // 1 hour maintenance window
    setMaintenanceMode(start, end);

    const req = new NextRequest(new URL("http://localhost/api/health"));
    const response = await middleware(req);

    expect(response.status).toBe(200);
  });

  it("should return 503 for non-health endpoints during maintenance", async () => {
    const start = new Date();
    const end = new Date(start.getTime() + 3600000);
    setMaintenanceMode(start, end);

    const req = new NextRequest(new URL("http://localhost/api/something"));
    const response = await middleware(req);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data).toHaveProperty("error", "System is under maintenance");
    expect(data.maintenanceWindow).toHaveProperty("start");
    expect(data.maintenanceWindow).toHaveProperty("end");
  });

  it("should include Retry-After header during maintenance", async () => {
    const start = new Date();
    const end = new Date(start.getTime() + 3600000);
    setMaintenanceMode(start, end);

    const req = new NextRequest(new URL("http://localhost/api/something"));
    const response = await middleware(req);

    expect(response.headers.get("Retry-After")).toBeDefined();
  });
});
