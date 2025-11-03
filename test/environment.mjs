import JSDOMEnvironment from "jest-environment-jsdom";
import { TextEncoder, TextDecoder } from "util";

/**
 * A custom environment to support Next.js features in tests
 */
class CustomTestEnvironment extends JSDOMEnvironment.default {
  async setup() {
    await super.setup();

    // Add your global variables here
    if (!this.global.TextEncoder) {
      this.global.TextEncoder = TextEncoder;
    }
    if (!this.global.TextDecoder) {
      this.global.TextDecoder = TextDecoder;
    }
    if (!this.global.Request) {
      this.global.Request = Request;
    }
    if (!this.global.Response) {
      this.global.Response = Response;
    }
    if (!this.global.Headers) {
      this.global.Headers = Headers;
    }
    if (!this.global.FormData) {
      this.global.FormData = FormData;
    }
    if (!this.global.Blob) {
      this.global.Blob = Blob;
    }
    if (!this.global.File) {
      this.global.File = File;
    }
    if (!this.global.TransformStream) {
      this.global.TransformStream = class TransformStream {
        constructor() {
          const readableStream = new ReadableStream({
            start(controller) {
              // Mock implementation
            },
          });
          const writableStream = new WritableStream({
            write(chunk) {
              // Mock implementation
            },
          });
          this.readable = readableStream;
          this.writable = writableStream;
        }
      };
    }
    if (!this.global.ReadableStream) {
      this.global.ReadableStream = class ReadableStream {
        constructor(source) {
          this.source = source;
        }
        getReader() {
          return {
            read: () => Promise.resolve({ done: true, value: undefined }),
            releaseLock: () => {},
          };
        }
      };
    }
    if (!this.global.WritableStream) {
      this.global.WritableStream = class WritableStream {
        constructor(sink) {
          this.sink = sink;
        }
        getWriter() {
          return {
            write: (chunk) => Promise.resolve(),
            close: () => Promise.resolve(),
            abort: () => Promise.resolve(),
            releaseLock: () => {},
          };
        }
      };
    }
    if (!this.global.crypto) {
      this.global.crypto = {
        getRandomValues: (buffer) => {
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
      };
    }
    if (!this.global.atob) {
      this.global.atob = atob;
    }
    if (!this.global.btoa) {
      this.global.btoa = btoa;
    }
    if (!this.global.URL) {
      this.global.URL = URL;
    }
    if (!this.global.URLSearchParams) {
      this.global.URLSearchParams = URLSearchParams;
    }
  }
}

export default CustomTestEnvironment;
