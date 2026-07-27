import client from '@/common/api/client';
import type { CreateWorkoutSessionFormValues } from '../schemas/create-workout-session.schema';

async function createWorkoutSession(dto: CreateWorkoutSessionFormValues) {
  const { data } = await client.post('/workout-sessions', dto);

  return data;
}

export default createWorkoutSession;
