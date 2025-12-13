import z from "zod";
import { currencyType } from "../../types";

const baseExpenseSchema = z.object({
	name: z.string(),
	amount: currencyType,
});

export const createExpenseSchema = baseExpenseSchema;

export const updateExpenseSchema = baseExpenseSchema.extend({
	id: z.string(),
	transactionId: z.string(),
});

export const deleteExpenseSchema = updateExpenseSchema.pick({
	id: true,
	transactionId: true,
});

export type CreateExpenseDTO = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseDTO = z.infer<typeof updateExpenseSchema>;
export type DeleteExpenseDTO = z.infer<typeof deleteExpenseSchema>;
