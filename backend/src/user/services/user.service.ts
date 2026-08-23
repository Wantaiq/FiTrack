import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserResponseDto } from '../dto/response-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async save(dto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.repository.findByUsername(dto.username);

    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.repository.save({
      username: dto.username,
      password: dto.passwordHash,
    });

    return UserMapper.toResponse(user);
  }
}
