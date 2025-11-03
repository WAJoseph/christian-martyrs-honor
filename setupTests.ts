import "@testing-library/jest-dom";
import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { jest } from "@jest/globals";

// Set up test environment globals
Object.defineProperty(globalThis, "crypto", {
  value: {
    getRandomValues: (buffer: Uint8Array) => {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.floor(Math.random() * 256);
      }
      return buffer;
    },
    subtle: {
      digest: jest.fn(),
      encrypt: jest.fn(),
      decrypt: jest.fn(),
      sign: jest.fn(),
      verify: jest.fn(),
      generateKey: jest.fn(),
      deriveKey: jest.fn(),
      deriveBits: jest.fn(),
      importKey: jest.fn(),
      exportKey: jest.fn(),
      wrapKey: jest.fn(),
      unwrapKey: jest.fn(),
    },
  },
  configurable: true,
});

// Mock Next.js
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve(new Response())
) as jest.MockedFunction<typeof fetch>;

// Set up Prisma mock
const prismaMock = mockDeep<PrismaClient>();

prismaMock.$queryRaw.mockImplementation(() => Promise.resolve([]));
prismaMock.$transaction.mockImplementation(
  <T>(callback: ((prisma: PrismaClient) => Promise<T>) | Promise<T>[]) => {
    if (typeof callback === "function") {
      return callback(prismaMock);
    }
    return Promise.all(callback as Promise<T>[]);
  }
);

export const mockContext: MockContext = {
  prisma: prismaMock,
};

// Mock Supabase
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(() => Promise.resolve(null)),
      signInWithOAuth: jest.fn(() => Promise.resolve()),
      signOut: jest.fn(() => Promise.resolve()),
    },
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(() => Promise.resolve({ data: { path: "test-path" } })),
        getPublicUrl: jest.fn(() => ({ data: { publicUrl: "test-url" } })),
      })),
    },
  })),
}));

jest.mock("./lib/prisma", () => ({
  prisma: mockContext.prisma,
}));

export interface Context {
  prisma: PrismaClient;
}

export interface MockContext {
  prisma: DeepMockProxy<PrismaClient>;
}
