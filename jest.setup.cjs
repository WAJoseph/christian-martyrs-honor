require("whatwg-fetch");

class NextResponse extends Response {
  static json(data, init = {}) {
    return new NextResponse(JSON.stringify(data), {
      ...init,
      headers: {
        ...init.headers,
        "Content-Type": "application/json",
      },
    });
  }
}

// Add necessary globals
global.Request = require("node-fetch").Request;
global.Response = require("node-fetch").Response;
global.Headers = require("node-fetch").Headers;
global.NextResponse = NextResponse;
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

// Mock TransformStream for Edge Runtime compatibility
global.TransformStream = class TransformStream {
  constructor() {
    return {
      readable: new ReadableStream(),
      writable: new WritableStream(),
    };
  }
};
