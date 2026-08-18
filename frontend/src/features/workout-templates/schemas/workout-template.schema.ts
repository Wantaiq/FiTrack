import { exercisePartialSchema } from '@/features/exercises';
import z from 'zod';

export const workoutTemplateSetFullSchema = z.object({
  id: z.uuid(),
  order: z.number().positive().int(),
  targetReps: z.number().positive().int().nullable(),
  targetWeight: z.number().positive().int().nullable(),
  rir: z.number().positive().int().nullable(),
  rm: z.number().positive().int().nullable(),
  rest: z.number().positive().int().nullable(),
});

export const workoutTemplateExerciseFullSchema = z.object({
  id: z.uuid(),
  note: z.string(),
  exercise: exercisePartialSchema,
  sets: z.array(workoutTemplateSetFullSchema).min(1),
});

export const workoutTemplateFullSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  exercises: z.array(workoutTemplateExerciseFullSchema).min(1),
});

export const workoutTemplateExercisePartialSchema =
  workoutTemplateFullSchema.extend({
    exercises: z.array(workoutTemplateExerciseFullSchema.omit({ sets: true })),
  });

export type WorkoutTemplateFull = z.infer<typeof workoutTemplateFullSchema>;
export type WorkoutTemplatePartial = z.infer<
  typeof workoutTemplateExercisePartialSchema
>;
