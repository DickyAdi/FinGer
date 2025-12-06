import { Hono } from "hono";
import { cors } from "hono/cors";
import { config } from "./config/env";
import { router } from "./routes";
import { swaggerUI } from "@hono/swagger-ui";
import openApiDoc from "./doc/openapi";
const app = new Hono();

app.use(
  "*",
  cors({
    origin: [config.allowedOrigin === "" ? "*" : config.allowedOrigin!],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "PATCH", "DELETE"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
  })
);

app.get("/doc", (c) => c.json(openApiDoc));
app.get("/ui", swaggerUI({ url: "/doc" }));
app.get("/", (c) => {
  return c.json({
    message: "Hello world from bun/hono",
  });
});

app.route("/api", router);

export default app;
