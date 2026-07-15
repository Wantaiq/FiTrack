import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  passwordHash!: string;

  @IsString()
  @MinLength(4)
  username!: string;
}
