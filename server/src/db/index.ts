import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../config/env";
export * from "./schema/users";
export * from "./schema/expenses";
export * from "./schema/incomes";
export * from "./schema/transactions";
export * from "./relations";

export const db = drizzle(config.database.url);
