import client from '@/common/api/client';
import type { WorkoutTemplateFull } from '../schemas/workout-template.schema';

async function getWorkoutTemplateDetails(
  id: string,
): Promise<WorkoutTemplateFull> {
  const { data } = await client.get(`/workout-templates/${id}`);

  return data;
}

export default getWorkoutTemplateDetails;
