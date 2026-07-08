import { UserResponseDto } from './dto/response-user.dto';
import { UserEntity } from './user.entity';

export class UserMapper {
  static toResponse(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}
