import { db, transactions, expenses } from "../db";
import { eq, getTableColumns } from "drizzle-orm";

export class ExpenseService {
	async getExpensesByUserId(
		user_id: string,
		page: number = 1,
		limit: number = 20,
	) {
		return await db
			.select({ ...getTableColumns(expenses) })
			.from(expenses)
			.innerJoin(transactions, eq(transactions.id, expenses.transactionId))
			.where(eq(transactions.user_id, user_id))
			.orderBy(expenses.created_at)
			.offset((page - 1) * limit)
			.limit(limit);
	}
}
