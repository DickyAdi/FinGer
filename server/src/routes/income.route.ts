import { Hono } from "hono";
import { requireAuth } from "../middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { PaginationSchema } from "../schemas";

export const incomeRouter = new Hono().basePath("/incomes");

incomeRouter.use("*", requireAuth);

incomeRouter.get("/", zValidator("query", PaginationSchema), (c) => {
	const { page, limit } = c.req.valid("query");
	return c.json({ message: "null" });
});

incomeRouter.post("/", (c) => {
	return c.json({ message: "create income" });
});

incomeRouter.get("/:id", (c) => {
	return c.json({ message: "get income by id" });
});

incomeRouter.patch("/:id", (c) => {
	return c.json({ message: "update income by id" });
});

incomeRouter.delete("/:id", (c) => {
	return c.json({ message: "delete income by id" });
});
