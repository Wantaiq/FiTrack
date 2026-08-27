import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateWorkoutTemplateExerciseSetDto {
  @IsNumber()
  @IsPositive()
  order!: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  reps: number | null = null;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rir: number | null = null;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rm: number | null = null;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rest: number | null = null;
}
