import { z } from "zod";

export const loginSchema = z.object({
  code: z.string().max(10),
  password: z.string(),
});

export type LoginType = z.infer<typeof loginSchema>;
