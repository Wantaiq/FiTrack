import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findByUsername(username: string) {
    return this.repository.findOne({
      where: { username },
    });
  }

  findById(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  save(user: { username: string; password: string }) {
    return this.repository.save(user);
  }
}
