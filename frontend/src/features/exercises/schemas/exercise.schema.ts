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

export type Difficulty = z.infer<typeof difficultySchema>;
export type Mechanic = z.infer<typeof mechanicSchema>;
export type ExerciseType = z.infer<typeof exerciseTypeSchema>;

export type Exercise = {
  id: string;
  name: string;
  description: string;
  type: ExerciseType;
  difficulty: Difficulty;
  mechanic: Mechanic;
};
