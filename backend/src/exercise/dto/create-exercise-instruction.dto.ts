import { IsInt, IsString, MaxLength, Min } from 'class-validator';

export class CreateExerciseInstructionDto {
  @IsString()
  @MaxLength(100)
  title!: string;

  @IsString()
  text!: string;

  @IsInt()
  @Min(0)
  order!: number;
}
