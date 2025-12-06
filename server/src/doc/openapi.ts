const openApiDoc = {
  openapi: "3.0.0", // This is the required version field
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for your service",
  },
  paths: {
    // Add your API paths here
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
    },
    "/": {
      get: {
        summary: "Home index",
        responses: {
          "200": {
            description: "Hello world from bun/hono",
          },
        },
      },
    },
  },
};

export default openApiDoc;
