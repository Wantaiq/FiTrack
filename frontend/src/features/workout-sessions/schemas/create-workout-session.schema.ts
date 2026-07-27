import z from 'zod';

export const createWorkoutSessionSchema = z.object({
  templateId: z.uuid(),
  scheduledAt: z.iso.date(),
});

export type CreateWorkoutSessionFormValues = z.infer<
  typeof createWorkoutSessionSchema
>;
