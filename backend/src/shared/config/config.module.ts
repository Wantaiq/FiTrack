import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { envSchema } from './env.config';
import { ValidationError } from 'yup';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  imports: [
    NestConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',

      async validate(config) {
        try {
          const result = await envSchema.validate(config);

          return result;
        } catch (error) {
          if (error instanceof ValidationError) {
            throw new Error(error.message);
          }
        }
      },
    }),
  ],
})
export class ConfigModule {}
