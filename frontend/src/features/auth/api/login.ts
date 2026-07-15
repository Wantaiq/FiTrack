import client from '@/common/api/client';
import type { LoginFormValues } from '../schemas/login.schema';

async function login(dto: LoginFormValues) {
  const { data } = await client.post('/auth/login', dto);

  return data;
}

export default login;
