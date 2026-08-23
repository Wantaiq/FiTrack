import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsString()
  username!: string;

  @MinLength(8)
  password!: string;
}
