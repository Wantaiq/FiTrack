interface WorkoutTemplateExerciseSetInput {
  order: number;
  reps?: number;
  weight?: number;
  rir?: number;
  rm?: number;
  rest?: number;
}

interface WorkoutTemplateExerciseInput {
  exercise: { id: string };
  note?: string;
  sets: WorkoutTemplateExerciseSetInput[];
}

export interface CreateWorkoutTemplateInput {
  name: string;
  createdBy: { id: string };
  exercises: WorkoutTemplateExerciseInput[];
}
