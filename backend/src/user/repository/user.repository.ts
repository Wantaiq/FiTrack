import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
    });
  }

  findById(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  save(user: { email: string; username: string; password: string }) {
    return this.repository.save(user);
  }
}
