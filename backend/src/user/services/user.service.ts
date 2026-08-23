import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserResponseDto } from '../dto/response-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async save(dto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.repository.findByEmail(dto.email);

    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.repository.save({
      email: dto.email,
      username: dto.username,
      password: dto.passwordHash,
    });

    return UserMapper.toResponse(user);
  }

  async findByEmail(email: string) {
    const user = await this.repository.findByEmail(email);

    return user;
  }
}
