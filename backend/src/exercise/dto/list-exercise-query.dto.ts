import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {
  Difficulty,
  ExerciseType,
  MechanicType,
} from '../enums/exercise.types';

export class ListExercisesQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 20;

  @IsOptional()
  @IsString()
  @IsEnum(ExerciseType)
  type?: ExerciseType;

  @IsOptional()
  @IsString()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @IsOptional()
  @IsString()
  @IsEnum(MechanicType)
  mechanic?: MechanicType;
}
