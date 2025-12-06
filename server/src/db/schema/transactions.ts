import { text, timestamp, index, pgTable, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

export const transaction_type_enum = pgEnum("transaction_type_enum", [
  "income",
  "expense",
]);

export const transactions = pgTable(
  "transactions",
  {
    id: text("id").primaryKey(),
    user_id: text("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    type: transaction_type_enum().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("transaction_transactionId_idx").on(table.id)]
);
