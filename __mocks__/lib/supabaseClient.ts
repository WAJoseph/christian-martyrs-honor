export const supabase = {
  auth: {
    onAuthStateChange: jest.fn(() => ({
      data: { subscription: { unsubscribe: jest.fn() } },
    })),
    getSession: jest.fn(() => Promise.resolve({ data: { session: null } })),
  },
};
