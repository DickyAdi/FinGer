import z from "zod";
import { TransactionTypeEnum } from "../../types";

const baseTransactionSchema = z.object({
	user_id: z.string(),
	type: z.enum(TransactionTypeEnum),
});

export const createTransactionSchema = baseTransactionSchema;

export const updateTransactionSchema = baseTransactionSchema.extend({
	id: z.string(),
});

export const deleteTransactionSchema = z.object({
	id: z.string(),
});

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionDTO = z.infer<typeof updateTransactionSchema>;
export type DeleteTransactionDTO = z.infer<typeof deleteTransactionSchema>;
