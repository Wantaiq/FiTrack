import { IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @MinLength(8)
  password!: string;

  @IsString()
  @MinLength(4)
  @Transform(({ value }) => value.toLowerCase().trim())
  username!: string;
}
