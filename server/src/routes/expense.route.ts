import { Hono } from "hono";
import { requireAuth } from "../middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { PaginationSchema } from "../schemas";
import { NotAuthenticatedError } from "../utils/errors";
import { ExpenseService } from "../services/expense.service";

export const expensesRouter = new Hono().basePath("/expenses");
const expenseService = new ExpenseService();

expensesRouter.use("*", requireAuth);

expensesRouter.get("/", zValidator("query", PaginationSchema), async (c) => {
	const { page, limit } = c.req.valid("query");

	const user = c.get("user");

	if (!user) {
		throw new NotAuthenticatedError();
	}

	const paginatedResult = await expenseService.getExpensesByUserId(
		user.id,
		page,
		limit,
	);

	return c.json(paginatedResult, 200);
});
