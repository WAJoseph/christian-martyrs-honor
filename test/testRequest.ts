import { NextRequest } from "next/server";

interface TestRequestConfig {
  method?: string;
  url: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export function createTestRequest({
  method = "GET",
  url,
  body,
  headers = {},
}: TestRequestConfig): NextRequest {
  const request = new NextRequest(new URL(url), {
    method,
    headers: new Headers({
      "content-type": "application/json",
      ...headers,
    }),
  });

  // Mock the json method
  Object.defineProperty(request, "json", {
    value: jest.fn().mockResolvedValue(body),
  });

  return request;
}
