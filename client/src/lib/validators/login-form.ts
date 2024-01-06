import { z } from "zod";

export const loginSchema = z.object({
  code: z.string().min(1).max(20),
  password: z.string().min(1),
});

export type LoginType = z.infer<typeof loginSchema>;
