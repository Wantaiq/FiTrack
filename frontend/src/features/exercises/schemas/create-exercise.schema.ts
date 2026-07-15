import z from 'zod';

const difficultySchema = z.enum(['beginner', 'intermediate', 'advanced']);

const mechanicSchema = z.enum(['compound', 'isolation']);

const exerciseTypeSchema = z.enum([
  'strength',
  'cardio',
  'stretch',
  'plyometric',
  'isometric',
]);

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
export type Difficulty = z.infer<typeof difficultySchema>;
export type Mechanic = z.infer<typeof mechanicSchema>;
export type ExerciseType = z.infer<typeof exerciseTypeSchema>;
