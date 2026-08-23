import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(8)
  passwordHash!: string;

  @IsString()
  @MinLength(4)
  username!: string;
}
