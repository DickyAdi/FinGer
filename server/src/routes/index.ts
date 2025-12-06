import { Hono } from "hono";
import * as auth from "./auth.route";

export const router = new Hono();

router.route("/", auth.authRouter);
