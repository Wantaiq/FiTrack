import { z } from "zod";

export const registerSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
