import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '../config/config.service';
import { type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private sendAuthCookies(payload: string, response: Response) {
    response.cookie('AccessToken', payload, {
      httpOnly: true,
      secure: this.configService.nodeEnvironment === 'production',
      maxAge:
        Number(this.configService.tokens.accessToken.expiryMinutes) * 60 * 1000,
      sameSite: 'strict',
    });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, user } = await this.authService.login(dto);

    this.sendAuthCookies(accessToken, response);

    return user;
  }

  @Public()
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, user } = await this.authService.register(dto);

    this.sendAuthCookies(accessToken, response);

    return user;
  }
}
