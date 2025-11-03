import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import nodeFetch, { Request, Response, Headers } from "node-fetch";

// Mock Supabase
const mockSupabase = {
  auth: {
    getSession: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
  },
};

// Add Web APIs that Next.js expects
global.fetch = nodeFetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Next.js modules
jest.mock("next/server", () => {
  // Mock NextResponse constructor
  const NextResponse = function (body = "", init = {}) {
    const stringifiedBody =
      typeof body === "string" ? body : JSON.stringify(body);
    const headers = {
      _headers: new Map(),
      get: function (name) {
        return this._headers.get(name?.toLowerCase());
      },
      has: function (name) {
        return this._headers.has(name?.toLowerCase());
      },
      set: function (name, value) {
        this._headers.set(name?.toLowerCase(), value);
      },
      append: function (name, value) {
        const existing = this.get(name);
        this.set(name, existing ? `${existing}, ${value}` : value);
      },
      delete: function (name) {
        this._headers.delete(name?.toLowerCase());
      },
      forEach: function (callback) {
        this._headers.forEach((value, key) => callback(value, key, this));
      },
    };

    // Apply headers from init
    if (init.headers) {
      Object.entries(init.headers).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    return {
      status: init.status || 200,
      headers,
      json: async () => JSON.parse(stringifiedBody),
      text: async () => stringifiedBody,
    };
  };

  // Add static methods
  Object.assign(NextResponse, {
    json(body, init = {}) {
      return new NextResponse(JSON.stringify(body), {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...init.headers,
        },
      });
    },
    redirect(url, init = {}) {
      return new NextResponse(null, {
        status: init.status || 302,
        headers: {
          Location: url,
          ...init.headers,
        },
      });
    },
    next(init = {}) {
      return new NextResponse(null, init);
    },
    rewrite(url, init = {}) {
      return new NextResponse(null, init);
    },
  });

  return {
    NextResponse,
    NextRequest: function (input, init) {
      const url =
        typeof input === "string" ? input : input.url || "http://localhost";
      const headers = {
        _headers: new Map(Object.entries(init?.headers || {})),
        get: function (name) {
          return this._headers.get(name?.toLowerCase());
        },
        has: function (name) {
          return this._headers.has(name?.toLowerCase());
        },
        set: function (name, value) {
          this._headers.set(name?.toLowerCase(), value);
        },
        append: function (name, value) {
          const existing = this.get(name);
          this.set(name, existing ? `${existing}, ${value}` : value);
        },
        delete: function (name) {
          this._headers.delete(name?.toLowerCase());
        },
        forEach: function (callback) {
          this._headers.forEach((value, key) => callback(value, key, this));
        },
      };

      if (init?.headers) {
        Object.entries(init.headers).forEach(([key, value]) => {
          headers.set(key, value);
        });
      }

      return {
        method: init?.method || "GET",
        headers,
        body: init?.body,
        nextUrl: new URL(url),
        cookies: new Map(),
        json: async () => JSON.parse(init?.body || "{}"),
        text: async () => init?.body || "",
        clone: function () {
          return { ...this };
        },
      };
    },
    NextResponse: {
      json(body, init = {}) {
        const headers = {
          _headers: new Map(),
          get: function (name) {
            return this._headers.get(name?.toLowerCase());
          },
          has: function (name) {
            return this._headers.has(name?.toLowerCase());
          },
          set: function (name, value) {
            this._headers.set(name?.toLowerCase(), value);
          },
          append: function (name, value) {
            const existing = this.get(name);
            this.set(name, existing ? `${existing}, ${value}` : value);
          },
          delete: function (name) {
            this._headers.delete(name?.toLowerCase());
          },
          forEach: function (callback) {
            this._headers.forEach((value, key) => callback(value, key, this));
          },
        };

        headers.set("Content-Type", "application/json");
        if (init.headers) {
          Object.entries(init.headers).forEach(([key, value]) => {
            headers.set(key, value);
          });
        }

        const stringifiedBody = JSON.stringify(body);
        return {
          status: init.status || 200,
          headers,
          json: async () => JSON.parse(stringifiedBody),
          text: async () => stringifiedBody,
        };
      },
      redirect(url, init = {}) {
        const headers = {
          _headers: new Map(),
          get: function (name) {
            return this._headers.get(name?.toLowerCase());
          },
          has: function (name) {
            return this._headers.has(name?.toLowerCase());
          },
          set: function (name, value) {
            this._headers.set(name?.toLowerCase(), value);
          },
          append: function (name, value) {
            const existing = this.get(name);
            this.set(name, existing ? `${existing}, ${value}` : value);
          },
          delete: function (name) {
            this._headers.delete(name?.toLowerCase());
          },
          forEach: function (callback) {
            this._headers.forEach((value, key) => callback(value, key, this));
          },
        };

        headers.set("Location", url);
        if (init.headers) {
          Object.entries(init.headers).forEach(([key, value]) => {
            headers.set(key, value);
          });
        }

        return {
          status: init.status || 302,
          headers,
        };
      },
      next(init = {}) {
        const headers = {
          _headers: new Map(),
          get: function (name) {
            return this._headers.get(name?.toLowerCase());
          },
          has: function (name) {
            return this._headers.has(name?.toLowerCase());
          },
          set: function (name, value) {
            this._headers.set(name?.toLowerCase(), value);
          },
          append: function (name, value) {
            const existing = this.get(name);
            this.set(name, existing ? `${existing}, ${value}` : value);
          },
          delete: function (name) {
            this._headers.delete(name?.toLowerCase());
          },
          forEach: function (callback) {
            this._headers.forEach((value, key) => callback(value, key, this));
          },
        };

        if (init.headers) {
          Object.entries(init.headers).forEach(([key, value]) => {
            headers.set(key, value);
          });
        }

        return {
          status: init.status || 200,
          headers,
        };
      },
      rewrite(url, init = {}) {
        const headers = {
          _headers: new Map(),
          get: function (name) {
            return this._headers.get(name?.toLowerCase());
          },
          has: function (name) {
            return this._headers.has(name?.toLowerCase());
          },
          set: function (name, value) {
            this._headers.set(name?.toLowerCase(), value);
          },
          append: function (name, value) {
            const existing = this.get(name);
            this.set(name, existing ? `${existing}, ${value}` : value);
          },
          delete: function (name) {
            this._headers.delete(name?.toLowerCase());
          },
          forEach: function (callback) {
            this._headers.forEach((value, key) => callback(value, key, this));
          },
        };

        if (init.headers) {
          Object.entries(init.headers).forEach(([key, value]) => {
            headers.set(key, value);
          });
        }

        return {
          status: init.status || 200,
          headers,
        };
      },
    },
  };
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => "/"),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
  })),
  headers: jest.fn(() => new Map()),
}));

jest.mock("lib/supabaseClient", () => ({
  supabase: mockSupabase,
  signIn: jest.fn(),
  signOut: jest.fn(),
}));
