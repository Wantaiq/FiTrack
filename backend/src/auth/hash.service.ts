import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 12);
  }

  async verify(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
