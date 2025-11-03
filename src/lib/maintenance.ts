import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory maintenance mode flag
// In production, this should be stored in a distributed cache like Redis
let isInMaintenance = false;
let maintenanceStartTime: Date | null = null;
let maintenanceEndTime: Date | null = null;

export function setMaintenanceMode(start: Date, end: Date) {
  isInMaintenance = true;
  maintenanceStartTime = start;
  maintenanceEndTime = end;

  // Log maintenance window
  console.log(
    `Maintenance mode activated: ${start.toISOString()} to ${end.toISOString()}`
  );
}

export function endMaintenanceMode() {
  isInMaintenance = false;
  maintenanceStartTime = null;
  maintenanceEndTime = null;

  console.log("Maintenance mode deactivated");
}

export function middleware(request: NextRequest) {
  // Skip maintenance mode check for health check endpoint
  if (request.nextUrl.pathname === "/api/health") {
    return NextResponse.next();
  }

  if (isInMaintenance) {
    return new NextResponse(
      JSON.stringify({
        error: "System is under maintenance",
        maintenanceWindow: {
          start: maintenanceStartTime,
          end: maintenanceEndTime,
        },
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
          // Add Retry-After header if maintenance end time is available
          ...(maintenanceEndTime && {
            "Retry-After": Math.ceil(
              (maintenanceEndTime.getTime() - Date.now()) / 1000
            ).toString(),
          }),
        },
      }
    );
  }

  return NextResponse.next();
}
