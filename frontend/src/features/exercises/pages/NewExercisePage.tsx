import CreateExerciseForm from '../components/CreateExerciseForm';
import useCreateExercise from '../hooks/useCreateExercise';
import type { CreateExerciseFormValues } from '../schemas/create-exercise.schema';

function NewExercisePage() {
  const { mutate, isPending, error } = useCreateExercise();

  async function handleSubmit(values: CreateExerciseFormValues) {
    mutate(values);
  }

  return (
    <CreateExerciseForm
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      error={error}
    />
  );
}

export default NewExercisePage;
