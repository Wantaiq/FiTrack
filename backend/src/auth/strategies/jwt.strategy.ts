import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../../shared/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies?.AccessToken;
        },
      ]),
      secretOrKey: configService.tokens.accessToken.secret,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
