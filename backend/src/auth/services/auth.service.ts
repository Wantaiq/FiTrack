import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashService } from './hash.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { TokensService } from './tokens.service';
import { UserService } from '../../user/services/user.service';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly userService: UserService,
    private readonly tokensService: TokensService,
    private readonly userRepository: UserRepository,
  ) {}

  async register(dto: RegisterDto) {
    const passwordHash = await this.hashService.hash(dto.password);

    const user = await this.userService.save({
      username: dto.username,
      passwordHash,
    });

    const token = await this.tokensService.sign(user.id, user.username);

    return {
      accessToken: token,
      user: { id: user.id, username: user.username },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    const token = await this.tokensService.sign(user.id, user.username);

    return { accessToken: token, user: { ...user } };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userRepository.findByUsername(dto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await this.hashService.verify(
      dto.password,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.id,
      username: user.username,
    };
  }
}
