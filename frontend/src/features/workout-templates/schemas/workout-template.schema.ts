import { exerciseSchema } from '@/features/exercises/schemas/exercise.schema';
import z from 'zod';

export const workoutTemplateExerciseSetSchema = z.object({
  id: z.uuid(),
  order: z.number().int().positive(),
  targetReps: z.coerce.number().int().positive(),
  targetSets: z.coerce.number().int().positive(),
});

export const workoutTemplateExerciseSchema = z.object({
  id: z.uuid(),
  note: z.string().optional(),
  exercise: exerciseSchema,
});

export const workoutTemplateSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  exercises: z.array(workoutTemplateExerciseSchema).min(1),
});

export type WorkoutTemplate = z.infer<typeof workoutTemplateSchema>;
