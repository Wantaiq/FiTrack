import { IsBoolean, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateWorkoutExerciseSetDto {
  @IsNumber()
  @IsPositive()
  order!: number;

  @IsNumber()
  @IsPositive()
  weight!: number;

  @IsNumber()
  @IsPositive()
  reps!: number;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
