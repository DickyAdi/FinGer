import { db, transactions, expenses } from "../db";
import { count, desc, eq, getTableColumns } from "drizzle-orm";

export class ExpenseService {
	async getExpensesByUserId(
		user_id: string,
		page: number = 1,
		limit: number = 20,
	) {
		const paginatedResult = await db
			.select({ ...getTableColumns(expenses) })
			.from(expenses)
			.innerJoin(transactions, eq(transactions.id, expenses.transactionId))
			.where(eq(transactions.user_id, user_id))
			.orderBy(desc(expenses.created_at))
			.offset((page - 1) * limit)
			.limit(limit);

		const [{ total }] = await db
			.select({ total: count(expenses.id) })
			.from(expenses)
			.innerJoin(transactions, eq(transactions.id, expenses.transactionId))
			.where(eq(transactions.user_id, user_id));

		const data = {
			total,
			page,
			limit,
			data: paginatedResult,
		};

		return data;
	}
}
