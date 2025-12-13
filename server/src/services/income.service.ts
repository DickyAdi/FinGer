import { eq, getTableColumns } from "drizzle-orm";
import { db, transactions, incomes } from "../db";

export class IncomeService {
	async getIncomesByUserId(
		user_id: string,
		page: number = 1,
		limit: number = 20,
	) {
		return await db
			.select(getTableColumns(incomes))
			.from(incomes)
			.innerJoin(transactions, eq(transactions.id, incomes.transactionId))
			.where(eq(transactions.user_id, user_id))
			.orderBy(incomes.created_at)
			.offset((page - 1) * limit)
			.limit(limit);
	}
}
