import {
  GET as getMartyr,
  PUT as updateMartyr,
  DELETE as deleteMartyr,
} from "@/app/api/martyrs/[id]/route";
import {
  PUT as updateTestimony,
  DELETE as deleteTestimony,
} from "@/app/api/testimonies/[id]/route";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "../../lib/supabaseAdmin";

// Mock dependencies
jest.mock("@/lib/prisma", () => ({
  prisma: {
    martyr: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    testimony: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock("../../lib/supabaseAdmin", () => ({
  getUserFromRequest: jest.fn(),
  isAdmin: jest.fn(),
}));

describe("NFR2: RBAC Integration Tests - API Endpoints", () => {
  const mockAdminUser = {
    id: "admin-123",
    email: "admin@example.com",
    role: "admin",
  };

  const mockRegularUser = {
    id: "user-456",
    email: "user@example.com",
    role: "user",
  };

  const mockMartyr = {
    id: 1,
    name: "St. Stephen",
    title: "The First Martyr",
    feastDay: "Dec 26",
    year: 34,
    era: "AD",
    iconUrl: "/st-stephen.jpg",
    description: "First Christian martyr",
    prayer: "Prayer text",
    story: "Story text",
    iconDescription: "Icon description",
    intercessoryPrayer: "Intercessory prayer",
  };

  const mockTestimony = {
    id: 1,
    name: "John Doe",
    title: "My Faith Journey",
    content: "Content here",
    status: "pending",
    featured: false,
    date: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Martyr GET /api/martyrs/[id]", () => {
    it("should allow public access to get martyr", async () => {
      (prisma.martyr.findUnique as jest.Mock).mockResolvedValue(mockMartyr);

      const request = new NextRequest(
        new URL("http://localhost/api/martyrs/1")
      );
      const response = await getMartyr(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(200);
    });

    it("should return 404 when martyr not found", async () => {
      (prisma.martyr.findUnique as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest(
        new URL("http://localhost/api/martyrs/999")
      );
      const response = await getMartyr(request, {
        params: Promise.resolve({ id: "999" }),
      });

      expect(response?.status).toBe(404);
    });
  });

  describe("Martyr PUT /api/martyrs/[id] - RBAC Protected", () => {
    it("should allow admin to update martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);
      (prisma.martyr.update as jest.Mock).mockResolvedValue(mockMartyr);

      const request = new NextRequest(
        new URL("http://localhost/api/martyrs/1"),
        {
          method: "PUT",
          body: JSON.stringify(mockMartyr),
        }
      );

      const response = await updateMartyr(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(200);
    });

    it("should reject non-admin user from updating martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockRegularUser);
      (isAdmin as jest.Mock).mockReturnValue(false);

      const request = new NextRequest(
        new URL("http://localhost/api/martyrs/1"),
        {
          method: "PUT",
          body: JSON.stringify(mockMartyr),
        }
      );

      const response = await updateMartyr(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(401);
    });

    it("should reject unauthenticated request from updating martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest(
        new URL("http://localhost/api/martyrs/1"),
        {
          method: "PUT",
          body: JSON.stringify(mockMartyr),
        }
      );

      const response = await updateMartyr(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(401);
    });
  });

  describe("Martyr DELETE /api/martyrs/[id] - RBAC Protected", () => {
    it("should allow admin to delete martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);
      (prisma.martyr.delete as jest.Mock).mockResolvedValue(mockMartyr);

      const request = new NextRequest(
        new URL("http://localhost/api/martyrs/1"),
        {
          method: "DELETE",
        }
      );

      const response = await deleteMartyr(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(200);
    });

    it("should reject non-admin user from deleting martyr", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockRegularUser);
      (isAdmin as jest.Mock).mockReturnValue(false);

      const request = new NextRequest(
        new URL("http://localhost/api/martyrs/1"),
        {
          method: "DELETE",
        }
      );

      const response = await deleteMartyr(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(401);
    });
  });

  describe("Testimony PUT /api/testimonies/[id] - RBAC Protected", () => {
    it("should allow admin to update testimony status to approved", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);
      (prisma.testimony.update as jest.Mock).mockResolvedValue({
        ...mockTestimony,
        status: "approved",
      });

      const request = new NextRequest(
        new URL("http://localhost/api/testimonies/1"),
        {
          method: "PUT",
          body: JSON.stringify({
            name: "John Doe",
            title: "My Faith Journey",
            content: "Content here",
            status: "approved",
          }),
        }
      );

      const response = await updateTestimony(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(200);
    });

    it("should allow admin to reject testimony by setting status to rejected", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);
      (prisma.testimony.update as jest.Mock).mockResolvedValue({
        ...mockTestimony,
        status: "rejected",
      });

      const request = new NextRequest(
        new URL("http://localhost/api/testimonies/1"),
        {
          method: "PUT",
          body: JSON.stringify({
            name: "John Doe",
            title: "My Faith Journey",
            content: "Content here",
            status: "rejected",
          }),
        }
      );

      const response = await updateTestimony(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(200);
    });

    it("should reject non-admin user from updating testimony status", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockRegularUser);
      (isAdmin as jest.Mock).mockReturnValue(false);

      const request = new NextRequest(
        new URL("http://localhost/api/testimonies/1"),
        {
          method: "PUT",
          body: JSON.stringify({ status: "approved" }),
        }
      );

      const response = await updateTestimony(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(401);
    });
  });

  describe("Testimony DELETE /api/testimonies/[id] - RBAC Protected", () => {
    it("should allow admin to delete testimony", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockAdminUser);
      (isAdmin as jest.Mock).mockReturnValue(true);
      (prisma.testimony.delete as jest.Mock).mockResolvedValue(mockTestimony);

      const request = new NextRequest(
        new URL("http://localhost/api/testimonies/1"),
        {
          method: "DELETE",
        }
      );

      const response = await deleteTestimony(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(200);
    });

    it("should reject non-admin user from deleting testimony", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(mockRegularUser);
      (isAdmin as jest.Mock).mockReturnValue(false);

      const request = new NextRequest(
        new URL("http://localhost/api/testimonies/1"),
        {
          method: "DELETE",
        }
      );

      const response = await deleteTestimony(request, {
        params: Promise.resolve({ id: "1" }),
      });

      expect(response?.status).toBe(401);
    });
  });

  describe("Authorization Response Consistency", () => {
    it("should return consistent 401 error format across all protected endpoints", async () => {
      (getUserFromRequest as jest.Mock).mockResolvedValue(null);

      const testCases = [
        {
          endpoint: "martyrs",
          route: updateMartyr,
          params: { id: "1" },
        },
        {
          endpoint: "testimonies",
          route: updateTestimony,
          params: { id: "1" },
        },
      ];

      for (const testCase of testCases) {
        const request = new NextRequest(
          new URL(`http://localhost/api/${testCase.endpoint}/1`),
          {
            method: "PUT",
            body: JSON.stringify({}),
          }
        );

        const response = await testCase.route(request, {
          params: Promise.resolve(testCase.params),
        });

        const body = await response?.json();
        expect(response?.status).toBe(401);
        expect(body).toEqual({ error: "Unauthorized" });
      }
    });
  });
});
