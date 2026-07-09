import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../shared/config/config.service';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sign(id: string, username: string) {
    return this.jwtService.signAsync(
      { id, username },
      {
        secret: this.configService.tokens.accessToken.secret,
        expiresIn: `${this.configService.tokens.accessToken.expiryMinutes}m`,
      },
    );
  }

  async verify(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.tokens.accessToken.secret,
      ignoreExpiration: false,
    });
  }
}
