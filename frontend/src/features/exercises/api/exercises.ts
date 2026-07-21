import client from '@/common/api/client';
import type { FilterExercises } from '../schemas/filter-exercise.schema';
import type { PaginatedResponse } from '@/common/types';
import type { ExercisePartial } from '../schemas/exercise.schema';

async function getExercises(
  filters: FilterExercises,
): Promise<PaginatedResponse<ExercisePartial>> {
  const { data } = await client.get('/exercises', { params: filters });

  return data;
}

export default getExercises;
