import { Hono } from "hono";
import { requireAuth } from "../middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { PaginationSchema } from "../schemas";

export const expensesRouter = new Hono().basePath("/expenses");

expensesRouter.use("*", requireAuth);

expensesRouter.get("/", zValidator("query", PaginationSchema), (c) => {
  const { page, limit } = c.req.valid("query");
  return c.json({ message: "lists expenses" });
});

expensesRouter.post("/", (c) => {
  return c.json({ message: "create expense" });
});

expensesRouter.get("/:id", (c) => {
  return c.json({ message: "get expense by id" });
});

expensesRouter.patch("/:id", (c) => {
  return c.json({ message: "update expense by id" });
});

expensesRouter.delete("/:id", (c) => {
  return c.json({ message: "delete expense by id" });
});
