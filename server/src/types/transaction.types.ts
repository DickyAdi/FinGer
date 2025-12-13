import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { transactions } from "../db";
import { CurrencyType } from "../types";

export const TransactionTypeEnum = {
	income: "income",
	expense: "expense",
} as const;

export type TransactionTypeEnum =
	(typeof TransactionTypeEnum)[keyof typeof TransactionTypeEnum];

export type Transaction = InferSelectModel<typeof transactions>;
export type NewTransaction = InferInsertModel<typeof transactions>;

export interface TransactionWithUser extends Transaction {
	user: {
		id: string;
		name: string;
		balance: CurrencyType;
		email: string;
	};
}
