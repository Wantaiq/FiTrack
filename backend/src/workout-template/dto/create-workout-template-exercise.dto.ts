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
import { CreateWorkoutTemplateExerciseSetDto } from './create-workout-template-exercise-set.dto';

export class CreateWorkoutTemplateExerciseDto {
  @IsOptional()
  @IsString()
  note?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutTemplateExerciseSetDto)
  sets!: CreateWorkoutTemplateExerciseSetDto[];

  @IsUUID('4')
  @IsNotEmpty()
  exerciseId!: string;
}
