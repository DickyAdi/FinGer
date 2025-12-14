import { Hono } from "hono";
import { requireAuth } from "../middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { PaginationSchema } from "../schemas";
import { NotAuthenticatedError } from "../utils/errors";
import { IncomeService } from "../services/income.service";

export const incomeRouter = new Hono().basePath("/incomes");
const incomeService = new IncomeService();

incomeRouter.use("*", requireAuth);

incomeRouter.get("/", zValidator("query", PaginationSchema), async (c) => {
	const { page, limit } = c.req.valid("query");
	const user = c.get("user");

	if (!user) {
		throw new NotAuthenticatedError();
	}

	const paginatedIncome = await incomeService.getIncomesByUserId(
		user.id,
		page,
		limit,
	);

	return c.json(paginatedIncome, 200);
});
