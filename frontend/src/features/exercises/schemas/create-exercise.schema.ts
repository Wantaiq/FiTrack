import z from 'zod';
import { exerciseDetailSchema, instructionSchema } from './exercise.schema';

const createInstructionSchema = instructionSchema.omit({ id: true });

export const createExerciseSchema = exerciseDetailSchema
  .omit({ id: true })
  .extend({
    instructions: z.array(createInstructionSchema).min(1),
  });

export type CreateExerciseFormValues = z.infer<typeof createExerciseSchema>;
