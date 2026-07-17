import {
  Difficulty,
  ExerciseType,
  MechanicType,
} from '../enums/exercise.types';

export class ExerciseResponseDto {
  id!: string;
  name!: string;
  description!: string;
  type!: ExerciseType;
  difficulty!: Difficulty;
  mechanic!: MechanicType;
  instructions!: { id: string; order: number; title: string; text: string }[];
}

export class ExercisesListResponseDto {
  items!: ExerciseResponseDto[];
  meta!: { page: number; limit: number; totalItems: number };
}
