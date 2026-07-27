import { z } from 'zod';

export const filterWorkoutSessionsSchema = z.object({
  year: z.coerce.number().int().positive(),
  month: z.coerce.number().int().positive().min(1).max(12).default(1),
});

export type FilterWorkoutSessions = z.infer<typeof filterWorkoutSessionsSchema>;
