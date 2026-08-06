import {
  IsEnum,
  IsString,
  MaxLength,
  Min,
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

  @IsString()
  @MinLength(20)
  description!: string;

  @IsString()
  @IsEnum(ExerciseType)
  type!: ExerciseType;

  @IsString()
  @IsEnum(Difficulty)
  difficulty!: Difficulty;

  @IsString()
  @IsEnum(MechanicType)
  mechanic!: MechanicType;

  @ValidateNested({ each: true })
  @Min(1)
  @Type(() => CreateExerciseInstructionDto)
  instructions!: CreateExerciseInstructionDto[];
}
