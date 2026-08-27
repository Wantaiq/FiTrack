import { exercisePartialSchema } from "@/features/exercises";
import z from "zod";

const numOrNullSchema = z.preprocess(
  (val) => (val === "" || val === undefined ? null : val),
  z.union([z.coerce.number().positive(), z.null()]),
);

export const workoutTemplateSetFullSchema = z.object({
  id: z.uuid(),
  order: z.coerce.number().positive().int(),
  reps: numOrNullSchema,
  rir: numOrNullSchema,
  rm: numOrNullSchema,
  rest: numOrNullSchema,
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
