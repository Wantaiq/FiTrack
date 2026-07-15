import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  username: z.string(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
