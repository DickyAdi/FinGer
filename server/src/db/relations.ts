import { relations } from "drizzle-orm";
import { expenses } from "./schema/expenses";
import { incomes } from "./schema/incomes";
import { transactions } from "./schema/transactions";

export const transactionRelations = relations(transactions, ({ one }) => ({
  income: one(incomes, {
    fields: [transactions.id],
    references: [incomes.transactionId],
  }),

  expense: one(expenses, {
    fields: [transactions.id],
    references: [expenses.transactionId],
  }),
}));

export const incomeRelations = relations(incomes, ({ one }) => ({
  transaction: one(transactions, {
    fields: [incomes.transactionId],
    references: [transactions.id],
  }),
}));

export const expenseRelations = relations(expenses, ({ one }) => ({
  transaction: one(transactions, {
    fields: [expenses.transactionId],
    references: [transactions.id],
  }),
}));
