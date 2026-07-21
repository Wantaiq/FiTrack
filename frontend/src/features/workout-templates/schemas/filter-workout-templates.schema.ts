import { z } from 'zod';

export const filterWorkoutTemplatesSchema = z.object({
  name: z.string().optional().catch(undefined),
  page: z.coerce.number().int().positive().default(1).optional().catch(1),
});

export type FilterWorkoutTemplates = z.infer<
  typeof filterWorkoutTemplatesSchema
>;
