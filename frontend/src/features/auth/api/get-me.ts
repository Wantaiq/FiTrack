import client from '@/common/api/client';
import type { User } from '../types';

async function getMe(): Promise<User> {
  const { data } = await client.get('/auth/me');

  return data;
}

export default getMe;
