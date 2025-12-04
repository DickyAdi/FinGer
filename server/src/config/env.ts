import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.int(),
  DEV_DATABASE_URL: z.url(),
  DEV_JWT_SECRET: z.string().min(32),
  PROD_DATABASE_URL: z.url().optional(),
  PROD_JWT_SECRET: z.string().min(32).optional(),
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
    url:
      env.NODE_ENV === "development"
        ? env.DEV_DATABASE_URL
        : env.PROD_DATABASE_URL!,
  },
  jwt: {
    secret:
      env.NODE_ENV === "development"
        ? env.DEV_JWT_SECRET
        : env.PROD_JWT_SECRET!,
  },
  port: env.PORT,
};
