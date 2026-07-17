import z from 'zod';
import { exerciseDetailSchema } from './exercise.schema';

export const createExerciseSchema = exerciseDetailSchema.omit({ id: true });

export type CreateExerciseFormValues = z.infer<typeof createExerciseSchema>;
