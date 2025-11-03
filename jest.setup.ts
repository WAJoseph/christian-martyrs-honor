// Mock the Supabase client to avoid importing ESM modules from @supabase/* at test import time
// This prevents Jest parsing errors for ESM-only dependencies during unit tests.
jest.mock("@supabase/supabase-js", () => {
  return {
    createClient: () => ({
      auth: {
        getSession: async () => ({ data: { session: null } }),
        signOut: async () => ({ error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ data: null, error: null }),
        signUp: async () => ({ data: null, error: null }),
      },
    }),
  };
});
// Provide minimal mocks for next/navigation hooks used by components at import time
jest.mock("next/navigation", () => {
  return {
    usePathname: jest.fn().mockReturnValue("/"),
    useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  };
});
// jest-dom matchers are imported in jest.afterEnv.ts (runs after the test framework is available)
