import client from '@/common/api/client';

async function logout() {
  return await client.post('/auth/logout');
}

export default logout;
