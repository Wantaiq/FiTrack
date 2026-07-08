import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Env } from './env.config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService<Env>) {}

  get database() {
    return {
      host: this.configService.getOrThrow('POSTGRES_HOST'),
      port: this.configService.getOrThrow('POSTGRES_PORT'),
      username: this.configService.getOrThrow('POSTGRES_USER'),
      password: this.configService.getOrThrow('POSTGRES_PASSWORD'),
      database: this.configService.getOrThrow('POSTGRES_DB'),
    };
  }

  get tokens() {
    return {
      accessToken: {
        secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
        expiryMinutes: this.configService.getOrThrow(
          'ACCESS_TOKEN_EXPIRY_MINUTES',
        ),
      },
    };
  }

  get nodeEnvironment() {
    return this.configService.getOrThrow('NODE_ENV');
  }
}
