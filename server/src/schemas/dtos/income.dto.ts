import z from "zod";
import { currencyType } from "../../types";

const baseIncomeSchema = z.object({
	name: z.string(),
	amount: currencyType,
});

export const createIncomeSchema = baseIncomeSchema;

export const updateIncomeSchema = baseIncomeSchema.extend({
	id: z.string(),
	transactionId: z.string(),
});

export const deleteIncomeSchema = updateIncomeSchema.pick({
	id: true,
	transactionId: true,
});

export type CreateIncomeDTO = z.infer<typeof createIncomeSchema>;
export type UpdateIncomeDTO = z.infer<typeof updateIncomeSchema>;
export type DeleteIncomeDTO = z.infer<typeof deleteIncomeSchema>;
