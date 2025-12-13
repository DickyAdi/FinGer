import { Hono } from "hono";
import { requireAuth } from "../middleware/auth.middleware";
import { NotAuthenticatedError, NotFoundError } from "../utils/errors";
import {
	createExpenseSchema,
	createIncomeSchema,
	PaginationSchema,
} from "../schemas";
import { zValidator } from "@hono/zod-validator";
import { TransactionService } from "../services/transaction.service";
import z from "zod";

export const transactionRouter = new Hono().basePath("/transactions");
const transactionService = new TransactionService();

transactionRouter.use("*", requireAuth);

transactionRouter.get("/", zValidator("query", PaginationSchema), async (c) => {
	const { page, limit } = c.req.valid("query");

	const paginatedTrx = await transactionService.getByUserId(
		c.get("user").id,
		page,
		limit,
	);

	return c.json(paginatedTrx, 200);
});

transactionRouter.post(
	"/create/income",
	zValidator("json", createIncomeSchema),
	async (c) => {
		const { name, amount } = c.req.valid("json");

		const user = c.get("user");

		if (!user) {
			throw new NotAuthenticatedError();
		}

		const newTrxIncome = await transactionService.createIncomeTrx(user.id, {
			name,
			amount,
		});

		return c.json(
			{
				message: "New income transaction created.",
				data: { ...newTrxIncome },
			},
			201,
		);
	},
);

transactionRouter.post(
	"/create/expense",
	zValidator("json", createExpenseSchema),
	async (c) => {
		const { name, amount } = c.req.valid("json");
		const user = c.get("user");

		if (!user) {
			throw new NotAuthenticatedError();
		}

		const newTrxExpense = await transactionService.createExpenseTrx(user.id, {
			name,
			amount,
		});

		return c.json(
			{
				message: "New expense transaction created.",
				data: { ...newTrxExpense },
			},
			201,
		);
	},
);

transactionRouter.delete(
	"/:id",
	zValidator("param", z.object({ id: z.string() })),
	async (c) => {
		const { id } = c.req.valid("param");
		const isDeleted = transactionService.delete(id);
		if (!isDeleted) {
			throw new NotFoundError(`Cannot find transaction with id ${id}`);
		}
		return c.json(
			{
				message: "Transaction deleted.",
			},
			200,
		);
	},
);

transactionRouter.get(
	"/:id",
	zValidator("param", z.object({ id: z.string() })),
	async (c) => {
		const { id } = c.req.valid("param");
		const trx = await transactionService.getById(id);
		return c.json(trx, 200);
	},
);
