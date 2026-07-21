import z from 'zod';

export const difficultySchema = z.enum([
  'beginner',
  'intermediate',
  'advanced',
]);

export const mechanicSchema = z.enum(['compound', 'isolation']);

export const exerciseTypeSchema = z.enum([
  'strength',
  'cardio',
  'stretch',
  'plyometric',
  'isometric',
]);

export const instructionSchema = z.object({
  id: z.uuid(),
  title: z.string().max(100),
  text: z.string(),
  order: z.number(),
});

export const exerciseFullSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().min(20),
  type: exerciseTypeSchema,
  difficulty: difficultySchema,
  mechanic: mechanicSchema,
  instructions: z.array(instructionSchema).min(1),
});

export const exercisePartialSchema = exerciseFullSchema.omit({
  instructions: true,
});

export type Difficulty = z.infer<typeof difficultySchema>;
export type Mechanic = z.infer<typeof mechanicSchema>;
export type ExerciseType = z.infer<typeof exerciseTypeSchema>;
export type Instruction = z.infer<typeof instructionSchema>;
export type ExercisePartial = z.infer<typeof exercisePartialSchema>;
export type ExerciseFull = z.infer<typeof exerciseFullSchema>;
