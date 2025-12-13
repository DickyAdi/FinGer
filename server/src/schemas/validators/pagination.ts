import { z } from "zod";

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().min(1),
  limit: z.coerce.number().int().positive().min(1).max(30),
});
