// Polyfill TextEncoder/TextDecoder for jsdom
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

// Mock crypto for tests
Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => "550e8400-e29b-41d4-a716-446655440000",
    getRandomValues: (arr: Uint32Array) => {
      for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 4294967296);
      return arr;
    },
    subtle: {
      digest: async (_algo: string, _data: ArrayBuffer) => new Uint8Array(32).buffer,
      importKey: async () => ({}),
      deriveBits: async () => new Uint8Array(32).buffer,
    },
  },
});

// Mock fetch globally
global.fetch = jest.fn();
