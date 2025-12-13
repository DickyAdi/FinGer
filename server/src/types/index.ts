import z from "zod";

export * from "./transaction.types";
export * from "./hono.types";

export const currencyType = z.coerce.number().positive().multipleOf(0.01);

export type CurrencyType = z.infer<typeof currencyType>;
