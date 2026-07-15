import client from '@/common/api/client';
import type { CreateExerciseFormValues } from '../schemas/create-exercise.schema';

async function createExercise(dto: CreateExerciseFormValues) {
  const { data } = await client.post('/exercises', dto);

  return data;
}

export default createExercise;
