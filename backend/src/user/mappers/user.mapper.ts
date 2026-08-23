import { UserResponseDto } from '../dto/response-user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
    };
  }
}
