import {
  Difficulty,
  ExerciseType,
  MechanicType,
} from '../enums/exercise.types';

interface UpdateInstructionInput {
  title: string;
  text: string;
  order: number;
}

export interface UpdateExerciseInput {
  name: string;
  description?: string;
  type: ExerciseType;
  difficulty?: Difficulty;
  mechanic?: MechanicType;
  instructions: UpdateInstructionInput[];
}
