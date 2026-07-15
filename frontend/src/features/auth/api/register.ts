import client from '@/common/api/client';
import type { RegisterFormValues } from '../schemas/register.schema';

async function register(dto: RegisterFormValues) {
  const { data } = await client.post('/auth/register', dto);

  return data;
}

export default register;
