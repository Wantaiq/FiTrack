import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  Difficulty,
  ExerciseType,
  MechanicType,
} from '../enums/exercise.types';
import { Type } from 'class-transformer';
import { CreateExerciseInstructionDto } from './create-exercise-instruction.dto';

export class CreateExerciseDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  description?: string;

  @IsString()
  @IsEnum(ExerciseType)
  type!: ExerciseType;

  @IsOptional()
  @IsString()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @IsOptional()
  @IsString()
  @IsEnum(MechanicType)
  mechanic?: MechanicType;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseInstructionDto)
  instructions!: CreateExerciseInstructionDto[];
}
