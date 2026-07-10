import { WorkoutStatus } from '../enums/workout.enum';

interface WorkoutExerciseSetInput {
  order: number;
  weight: number;
  reps: number;
  completed?: boolean;
}

interface WorkoutExerciseInput {
  exercise: { id: string };
  note?: string;
  sets: WorkoutExerciseSetInput[];
}

export interface CreateWorkoutInput {
  name: string;
  createdBy: { id: string };
  exercises: WorkoutExerciseInput[];
  // status?: WorkoutStatus;
}
