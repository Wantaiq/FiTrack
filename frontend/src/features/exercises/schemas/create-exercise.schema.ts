import z from 'zod';
import {
  difficultySchema,
  exerciseTypeSchema,
  mechanicSchema,
} from './exercise.schema';

const createInstructionSchema = z.object({
  title: z.string().max(100),
  text: z.string(),
  order: z.number(),
});

export const createExerciseSchema = z.object({
  name: z.string(),
  description: z.string().min(20),
  type: exerciseTypeSchema,
  difficulty: difficultySchema,
  mechanic: mechanicSchema,
  instructions: z.array(createInstructionSchema).min(1),
});

export type CreateExerciseFormValues = z.infer<typeof createExerciseSchema>;
