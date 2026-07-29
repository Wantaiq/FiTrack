import env from '@/app/env';
import axios from 'axios';
import ApiError from './ApiError';

const client = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.data?.message ?? 'Something went wrong',
        {
          status: error.response?.data?.statusCode,
          error: error.response?.data?.error,
        },
      );
    }

    throw error;
  },
);

export default client;
