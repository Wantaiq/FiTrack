import {
  Difficulty,
  ExerciseType,
  MechanicType,
} from '../enums/exercise.types';

interface CreateInstructionInput {
  title: string;
  text: string;
  order: number;
}

export interface CreateExerciseInput {
  name: string;
  description?: string;
  type: ExerciseType;
  difficulty?: Difficulty;
  mechanic?: MechanicType;
  instructions: CreateInstructionInput[];
  createdBy: { id: string } | null;
}
