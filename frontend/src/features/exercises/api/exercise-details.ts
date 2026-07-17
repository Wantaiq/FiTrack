import client from '@/common/api/client';

async function getExerciseDetails(id: string) {
  const { data } = await client.get(`/exercises/${id}`);

  return data;
}

export default getExerciseDetails;
