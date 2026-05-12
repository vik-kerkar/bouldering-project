// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  jest.fn(() => Promise.resolve()),
);

// Mock Supabase
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        data: [
          {
            id: 1,
            name: "Ravugodlu",
            url: "https://example.com/ravugodlu.jpg",
            description: "A beautiful climbing destination",
          },
        ],
        error: null,
      })),
    })),
  })),
}));
