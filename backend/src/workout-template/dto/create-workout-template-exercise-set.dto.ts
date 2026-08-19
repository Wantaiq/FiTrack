import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateWorkoutTemplateExerciseSetDto {
  @IsNumber()
  @IsPositive()
  order!: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  reps!: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  weight!: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rir!: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rm!: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rest!: number;
}
