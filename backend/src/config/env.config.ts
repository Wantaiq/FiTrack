import { InferType, number, object, string } from 'yup';

export const envSchema = object({
  PORT: number().default(3000),
  POSTGRES_USER: string().required(),
  POSTGRES_PASSWORD: string().required(),
  POSTGRES_DB: string().required(),
  POSTGRES_HOST: string().required(),
  POSTGRES_PORT: string().required(),
});

export type Env = InferType<typeof envSchema>;
