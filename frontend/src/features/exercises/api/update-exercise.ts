import client from '@/common/api/client';
import type { ExerciseFormValues } from '../schemas/create-exercise.schema';
import type { ExerciseFull } from '../schemas/exercise.schema';

async function updateExercise(updateData: {
  id: string;
  dto: ExerciseFormValues;
}): Promise<ExerciseFull> {
  const { data } = await client.put(
    `/exercises/${updateData.id}`,
    updateData.dto,
  );

  return data;
}

export default updateExercise;
