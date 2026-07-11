interface WorkoutTemplateExerciseSetInput {
  order: number;
  targetReps: number;
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
