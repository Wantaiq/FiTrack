import { IsNumber, IsPositive } from 'class-validator';

export class CreateWorkoutTemplateExerciseSetDto {
  @IsNumber()
  @IsPositive()
  order!: number;

  @IsNumber()
  @IsPositive()
  targetReps!: number;

  @IsNumber()
  @IsPositive()
  targetWeight!: number;
}
