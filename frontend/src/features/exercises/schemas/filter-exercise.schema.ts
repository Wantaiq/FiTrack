import { z } from 'zod';
import {
  difficultySchema,
  exerciseTypeSchema,
  mechanicSchema,
} from './exercise.schema';

export const filterExercisesSchema = z.object({
  name: z.string().optional().catch(undefined),
  difficulty: difficultySchema.optional().catch(undefined),
  type: exerciseTypeSchema.optional().catch(undefined),
  mechanic: mechanicSchema.optional().catch(undefined),
  page: z.coerce.number().int().positive().default(1).optional().catch(1),
});

export type FilterExercises = z.infer<typeof filterExercisesSchema>;
