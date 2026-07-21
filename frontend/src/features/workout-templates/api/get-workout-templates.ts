import client from '@/common/api/client';
import type { WorkoutTemplatePartial } from '../schemas/workout-template.schema';
import type { PaginatedResponse } from '@/common/types';
import type { FilterWorkoutTemplates } from '../schemas/filter-workout-templates.schema';

async function getWorkoutTemplates(
  filters: FilterWorkoutTemplates,
): Promise<PaginatedResponse<WorkoutTemplatePartial>> {
  const { data } = await client.get('/workout-templates', { params: filters });

  return data;
}

export default getWorkoutTemplates;
