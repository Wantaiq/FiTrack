import z from 'zod';
import {
  workoutTemplateExerciseSchema,
  workoutTemplateExerciseSetSchema,
  workoutTemplateSchema,
} from './workout-template.schema';

const createWorkoutTemplateExerciseSetSChema =
  workoutTemplateExerciseSetSchema.omit({ id: true });

const createWorkoutTemplateExerciseSchema = workoutTemplateExerciseSchema
  .omit({
    id: true,
  })
  .extend({
    sets: z.array(createWorkoutTemplateExerciseSetSChema).min(1),
  });

export const createWorkoutTemplateSchema = workoutTemplateSchema
  .omit({
    id: true,
  })
  .extend({
    exercises: z.array(createWorkoutTemplateExerciseSchema).min(1),
  });

export type CreateWorkoutTemplateFormValues = z.infer<
  typeof createWorkoutTemplateSchema
>;
