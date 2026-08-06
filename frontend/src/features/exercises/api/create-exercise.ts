import client from '@/common/api/client';
import type { ExerciseFormValues } from '../schemas/create-exercise.schema';
import type { ExerciseFull } from '../schemas/exercise.schema';

async function createExercise(dto: ExerciseFormValues): Promise<ExerciseFull> {
  const { data } = await client.post('/exercises', dto);

  return data;
}

export default createExercise;
