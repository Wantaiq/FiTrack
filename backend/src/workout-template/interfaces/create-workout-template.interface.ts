interface WorkoutTemplateExerciseSetInput {
  order: number;
  reps: number | null;
  rir: number | null;
  rm: number | null;
  rest: number | null;
}

interface WorkoutTemplateExerciseInput {
  exercise: { id: string };
  note: string | null;
  sets: WorkoutTemplateExerciseSetInput[];
}

export interface CreateWorkoutTemplateInput {
  name: string;
  createdBy: { id: string };
  exercises: WorkoutTemplateExerciseInput[];
}
