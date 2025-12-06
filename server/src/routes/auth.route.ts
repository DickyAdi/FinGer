import { Hono } from "hono";
import { auth } from "../lib/auth";

export const authRouter = new Hono();

authRouter.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});
