import client from '@/common/api/client';
import type { FilterWorkoutSessions } from '../schemas/filter-workout-session.schema';

async function getWorkoutSessions(filters: FilterWorkoutSessions) {
  const { data } = await client.get('/workout-sessions', { params: filters });

  return data;
}

export default getWorkoutSessions;
