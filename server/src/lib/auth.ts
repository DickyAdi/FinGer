import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { account, db, session, users, verification } from "../db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    revokeSessionsOnPasswordReset: true,
  },
  user: {
    modelName: "users",
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { users, session, account, verification },
  }),
  trustedOrigins: ["*"],
  plugins: [openAPI()],
});
