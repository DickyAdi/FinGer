import { z } from "zod";
import { configDotenv } from "dotenv";
import * as path from "path";

const nodeEnv = process.env.NODE_ENV || "development";
configDotenv({
  path: path.resolve(process.cwd(), `.env.${nodeEnv}`),
});

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(8000),
  DATABASE_URL: nodeEnv === "development" ? z.string().optional() : z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),
  ALLOWED_ORIGIN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(`Error while parsing env ${parsed.error.message}`);
    console.error(z.treeifyError(parsed.error).errors);
    process.exit(1);
  }

  return parsed.data;
}

export const env = validateEnv();

export const config = {
  isDevelopment: env.NODE_ENV === "development",
  isProduction: env.NODE_ENV === "production",
  isTest: env.NODE_ENV === "test",
  database: {
    url: env.DATABASE_URL,
  },
  jwt: {
    betterAuthToken: env.BETTER_AUTH_SECRET,
  },
  port: env.PORT,
  allowedOrigin: env.ALLOWED_ORIGIN,
};
