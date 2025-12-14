import { Hono } from "hono";
import { cors } from "hono/cors";
import { config } from "./config/env";
import { router } from "./routes";
import { swaggerUI } from "@hono/swagger-ui";
import openApiDoc from "./docs/index";
import { errorHandler } from "./middleware/error.middleware";
const app = new Hono();

app.use(
	"*",
	cors({
		origin: [config.allowedOrigin === "" ? "*" : config.allowedOrigin!],
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "PATCH", "DELETE"],
		exposeHeaders: ["Content-Length"],
		credentials: true,
	}),
);

app.get("/doc", (c) => c.json(openApiDoc));
app.get("/ui", swaggerUI({ url: "/doc" }));
app.get("/api/health", (c) => {
	return c.json({
		status: "OK",
	});
});

app.route("/api", router);
app.onError(errorHandler);

export default app;
