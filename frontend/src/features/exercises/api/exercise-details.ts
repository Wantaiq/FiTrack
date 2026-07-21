import client from '@/common/api/client';
import type { ExerciseFull } from '../schemas/exercise.schema';

async function getExerciseDetails(id: string): Promise<ExerciseFull> {
  const { data } = await client.get(`/exercises/${id}`);

  return data;
}

export default getExerciseDetails;
