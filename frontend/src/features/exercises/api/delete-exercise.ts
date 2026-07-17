import client from '@/common/api/client';

async function deleteExercise(id: string) {
  await client.delete(`/exercises/${id}`);
}

export default deleteExercise;
