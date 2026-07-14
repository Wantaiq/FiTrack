import env from '@/app/env';
import axios from 'axios';

const client = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

export default client;
