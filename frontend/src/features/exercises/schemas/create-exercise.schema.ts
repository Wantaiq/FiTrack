import z from 'zod';
import { exerciseFullSchema, instructionSchema } from './exercise.schema';

const createInstructionSchema = instructionSchema.omit({ id: true });

export const createExerciseSchema = exerciseFullSchema
  .omit({ id: true })
  .extend({
    instructions: z.array(createInstructionSchema).min(1),
  });

export type CreateExerciseFormValues = z.infer<typeof createExerciseSchema>;
