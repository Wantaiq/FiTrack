import client from '@/common/api/client';

async function deleteWorkoutTemplate(id: string) {
  await client.delete(`/workout-templates/${id}`);
}

export default deleteWorkoutTemplate;
