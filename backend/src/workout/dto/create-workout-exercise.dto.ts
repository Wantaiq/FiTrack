import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutExerciseSetDto } from './create-workout-exercise-set.dto';

export class CreateWorkoutExerciseDto {
  @IsOptional()
  @IsString()
  note?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutExerciseSetDto)
  sets!: CreateWorkoutExerciseSetDto[];

  @IsUUID('4')
  @IsNotEmpty()
  exerciseId!: string;
}
