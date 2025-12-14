import { CreateExpenseDTO, CreateIncomeDTO } from "../schemas";
import { count, eq, getTableColumns, sql } from "drizzle-orm";
import { db, expenses, incomes, transactions, users } from "../db";
import { nanoid } from "nanoid";
import { NotFoundError, UnsufficientBalanceError } from "../utils/errors";

export class TransactionService {
	async createIncomeTrx(user_id: string, income_dto: CreateIncomeDTO) {
		return await db.transaction(async (tx) => {
			const transactionId = nanoid();
			const [trx] = await tx
				.insert(transactions)
				.values({
					user_id: user_id,
					type: "income",
					id: transactionId,
				})
				.returning();

			const incomeId = nanoid();
			const [income] = await tx
				.insert(incomes)
				.values({
					id: incomeId,
					transactionId: transactionId,
					name: income_dto.name,
					amount: income_dto.amount.toString(),
				})
				.returning();

			await tx
				.update(users)
				.set({ balance: sql`${users.balance} + ${income.amount}` })
				.where(eq(users.id, user_id));

			return {
				transaction: trx,
				income,
			};
		});
	}

	async createExpenseTrx(user_id: string, expense_dto: CreateExpenseDTO) {
		return await db.transaction(async (tx) => {
			const [user] = await tx
				.select({ balance: users.balance })
				.from(users)
				.where(eq(users.id, user_id))
				.for("update");

			if (!user) {
				throw new NotFoundError(`Cannot find user id with id ${user_id}`);
			}

			const userBalance = parseFloat(user.balance);

			if (userBalance < expense_dto.amount) {
				throw new UnsufficientBalanceError();
			}

			const transactionId = nanoid();
			const [trx] = await tx
				.insert(transactions)
				.values({
					user_id: user_id,
					type: "expense",
					id: transactionId,
				})
				.returning();

			const expenseId = nanoid();
			const [expense] = await tx
				.insert(expenses)
				.values({
					id: expenseId,
					transactionId: transactionId,
					amount: expense_dto.amount.toString(),
					name: expense_dto.name,
				})
				.returning();

			await tx
				.update(users)
				.set({ balance: sql`${users.balance} - ${expense_dto.amount}` })
				.where(eq(users.id, user_id));

			return {
				transaction: trx,
				expense,
			};
		});
	}

	async update() {} //i dont think i need update service in transactions, This only works on income and expense

	async delete(id: string) {
		const result = await db.transaction(async (tx) => {
			const [{ trx, amount }] = await tx
				.select({
					trx: { ...getTableColumns(transactions) },
					amount: sql`COALESCE(${incomes.amount}, ${expenses.amount})`.as(
						"amount",
					),
				})
				.from(transactions)
				.leftJoin(incomes, eq(incomes.transactionId, transactions.id))
				.leftJoin(expenses, eq(expenses.transactionId, transactions.id))
				.where(eq(transactions.id, id))
				.limit(1);

			if (trx.type === "expense") {
				await tx
					.update(users)
					.set({ balance: sql`${users.balance} + ${amount}` })
					.where(eq(users.id, trx.user_id));
			} else if (trx.type === "income") {
				await tx
					.update(users)
					.set({ balance: sql`${users.balance} - ${amount}` })
					.where(eq(users.id, trx.user_id));
			}

			const innerResult = await tx
				.delete(transactions)
				.where(eq(transactions.id, id))
				.returning();

			return !!innerResult.length;
		});

		return result;
	}

	async getById(id: string) {
		const [result] = await db
			.select()
			.from(transactions)
			.where(eq(transactions.id, id))
			.limit(1);

		if (!result) {
			throw new NotFoundError(`Transaction with id ${id} is not found.`);
		}

		return result;
	}

	async getByUserId(user_id: string, page: number = 1, limit: number = 20) {
		const result = await db
			.select({ ...getTableColumns(transactions) })
			.from(transactions)
			.orderBy(transactions.created_at)
			.where(eq(transactions.user_id, user_id))
			.offset((page - 1) * limit)
			.limit(limit);

		const [{ total }] = await db
			.select({ total: count(transactions.id) })
			.from(transactions)
			.where(eq(transactions.user_id, user_id));

		if (!result) {
			throw new NotFoundError(
				`Cannot find transactions from user with id ${user_id}`,
			);
		}

		const data = {
			total,
			page,
			limit,
			data: result,
		};

		return data;
	}
}
