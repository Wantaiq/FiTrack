import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { WorkoutStatus } from '../enums/workout.enum';
import { CreateWorkoutExerciseDto } from './create-workout-exercise.dto';
import { Type } from 'class-transformer';

export class CreateWorkoutDto {
  @IsString()
  name!: string;

  // @IsDate()
  // date!: Date;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutExerciseDto)
  exercises!: CreateWorkoutExerciseDto[];

  // @IsEnum(WorkoutStatus)
  //@IsOptional()
  //status?: WorkoutStatus = WorkoutStatus.PLANNED;
}
