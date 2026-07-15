import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { type Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../../shared/config/config.service';
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from '../guards/local.guard';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { type TCurrentUser } from '../../user/types/current-user.types';

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
      path: '/',
    });
  }

  private clearAuthCookies(response: Response) {
    response.clearCookie('AccessToken', {
      path: '/',
    });
  }

  @Public()
  @HttpCode(204)
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

  @Get('/me')
  async me(@CurrentUser() currentUser: TCurrentUser) {
    return currentUser;
  }

  @Public()
  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    this.clearAuthCookies(response);
  }
}
