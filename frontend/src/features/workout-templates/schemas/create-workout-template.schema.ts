import z from 'zod';
import {
  workoutTemplateExerciseFullSchema,
  workoutTemplateSetFullSchema,
  workoutTemplateFullSchema,
} from './workout-template.schema';

const createWorkoutTemplateSetFullSchema = workoutTemplateSetFullSchema.omit({
  id: true,
});

const createWorkoutTemplateExerciseSchema = workoutTemplateExerciseFullSchema
  .omit({
    id: true,
    exercise: true,
  })
  .extend({
    sets: z.array(createWorkoutTemplateSetFullSchema).min(1),
    exerciseId: z.string(),
  });

export const createWorkoutTemplateSchema = workoutTemplateFullSchema
  .omit({
    id: true,
  })
  .extend({
    exercises: z.array(createWorkoutTemplateExerciseSchema).min(1),
  });

export type CreateWorkoutTemplateFormValues = z.infer<
  typeof createWorkoutTemplateSchema
>;
