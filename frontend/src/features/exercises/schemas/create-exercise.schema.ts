import z from 'zod';
import {
  difficultySchema,
  exerciseTypeSchema,
  instructionSchema,
  mechanicSchema,
} from './exercise.schema';

export const createExerciseSchema = z.object({
  name: z.string(),
  description: z.string().min(20),
  type: exerciseTypeSchema,
  difficulty: difficultySchema,
  mechanic: mechanicSchema,
  instructions: z.array(instructionSchema.omit({ id: true })).min(1),
});

export type CreateExerciseFormValues = z.infer<typeof createExerciseSchema>;
