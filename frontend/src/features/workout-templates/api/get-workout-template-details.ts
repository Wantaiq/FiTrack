import client from '@/common/api/client';

async function getWorkoutTemplateDetails(id: string) {
  const { data } = await client.get(`/workout-templates/${id}`);

  return data;
}

export default getWorkoutTemplateDetails;
