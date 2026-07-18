import client from '@/common/api/client';
import type { CreateWorkoutTemplateFormValues } from '../schemas/create-workout-template.schema';

async function createWorkoutTemplate(dto: CreateWorkoutTemplateFormValues) {
  const { data } = await client.post('/workout-templates', dto);

  return data;
}

export default createWorkoutTemplate;
