import z from 'zod';
import { exerciseFullSchema, instructionSchema } from './exercise.schema';

const instructionFormSchema = instructionSchema.omit({ id: true });

export const exerciseFormSchema = exerciseFullSchema.omit({ id: true }).extend({
  instructions: z.array(instructionFormSchema).min(1),
});

export type ExerciseFormValues = z.infer<typeof exerciseFormSchema>;
