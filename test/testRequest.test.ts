import { createTestRequest } from "./testRequest";

// Mock Next.js modules
jest.mock("next/server", () => ({
  NextRequest: class MockNextRequest extends Request {
    nextUrl: URL;
    constructor(input: RequestInfo | URL, init?: RequestInit) {
      super(input, init);
      this.nextUrl = new URL(
        typeof input === "string"
          ? input
          : input instanceof URL
          ? input.href
          : input instanceof Request
          ? input.url
          : ""
      );
    }
  },
}));

describe("createTestRequest", () => {
  it("creates a request with default GET method", () => {
    const request = createTestRequest({
      url: "http://localhost/api/test",
    });

    expect(request.method).toBe("GET");
    expect(request.headers.get("content-type")).toBe("application/json");
  });

  it("creates a request with specified method and body", async () => {
    const testBody = { test: "data" };
    const request = createTestRequest({
      method: "POST",
      url: "http://localhost/api/test",
      body: testBody,
    });

    expect(request.method).toBe("POST");
    expect(request.headers.get("content-type")).toBe("application/json");
    const body = await request.json();
    expect(body).toEqual(testBody);
  });

  it("includes custom headers when provided", () => {
    const request = createTestRequest({
      url: "http://localhost/api/test",
      headers: {
        "x-test-header": "test-value",
      },
    });

    expect(request.headers.get("content-type")).toBe("application/json");
    expect(request.headers.get("x-test-header")).toBe("test-value");
  });

  it("provides Next.js specific properties", () => {
    const request = createTestRequest({
      url: "http://localhost/api/test",
    });

    expect(request.nextUrl).toBeDefined();
    expect(request.nextUrl.pathname).toBe("/api/test");
  });
});
