import {
  Difficulty,
  ExerciseType,
  MechanicType,
} from '../enums/exercise.types';

export interface ExerciseFilters {
  name?: string;
  page: number;
  limit: number;
  type?: ExerciseType;
  difficulty?: Difficulty;
  mechanic?: MechanicType;
}
