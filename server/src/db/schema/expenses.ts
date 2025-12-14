import { text, numeric, index, pgTable, timestamp } from "drizzle-orm/pg-core";
import { transactions } from "./transactions";

export const expenses = pgTable(
	"expenses",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		amount: numeric("amount", { precision: 15, scale: 2 })
			.notNull()
			.default("0.00"),
		created_at: timestamp("created_at").defaultNow().notNull(),
		updated_at: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
		transactionId: text("transaction_id")
			.notNull()
			.references(() => transactions.id, { onDelete: "cascade" }),
	},
	(table) => [index("expenses_expensesId_idx").on(table.id)],
);
