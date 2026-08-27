import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutTemplateExerciseDto } from './create-workout-template-exercise.dto';

export class CreateWorkoutTemplateDto {
  @IsString()
  name!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique(
    (exercise: CreateWorkoutTemplateExerciseDto) => exercise.exerciseId,
  )
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutTemplateExerciseDto)
  exercises!: CreateWorkoutTemplateExerciseDto[];
}
