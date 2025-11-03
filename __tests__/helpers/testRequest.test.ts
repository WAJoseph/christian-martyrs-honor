import { createTestRequest } from "./testRequest";

describe("createTestRequest", () => {
  it("creates a request with default GET method", () => {
    const request = createTestRequest({});
    expect(request.method).toBe("GET");
  });

  it("creates a request with specified method", () => {
    const request = createTestRequest({ method: "POST" });
    expect(request.method).toBe("POST");
  });

  it("includes request body when provided", async () => {
    const testBody = { test: "data" };
    const request = createTestRequest({
      method: "POST",
      body: testBody,
    });

    const body = await request.json();
    expect(body).toEqual(testBody);
  });

  it("includes custom headers when provided", () => {
    const request = createTestRequest({
      headers: { "X-Test": "test-value" },
    });

    expect(request.headers.get("X-Test")).toBe("test-value");
  });

  it("provides Next.js specific properties", () => {
    const request = createTestRequest({
      url: "http://localhost/test",
    });

    expect(request.nextUrl).toBeDefined();
    expect(request.nextUrl.pathname).toBe("/test");
    expect(request.cookies).toBeDefined();
  });
});
