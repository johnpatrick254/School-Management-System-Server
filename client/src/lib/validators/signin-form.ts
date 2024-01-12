import { z } from "zod";

export const signinSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  schoolName: z.string().min(1),
});

export type SigninType = z.infer<typeof signinSchema>;
