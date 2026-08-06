import { Link, useNavigate } from 'react-router';
import useCreateExercise from '../hooks/useCreateExercise';
import type { ExerciseFormValues } from '../schemas/create-exercise.schema';
import { Heading, IconButton, Stack } from '@chakra-ui/react';
import { RxChevronLeft } from 'react-icons/rx';
import ExerciseForm from '../components/ExerciseForm';

function NewExercisePage() {
  const { mutate, isPending, error } = useCreateExercise();
  const navigate = useNavigate();

  async function handleSubmit(values: ExerciseFormValues) {
    mutate(values, {
      onSuccess: (exercise) => {
        navigate(`/exercises/${exercise.id}`);
      },
    });
  }

  return (
    <Stack gap={8}>
      <Stack direction="row" alignItems="center" gap={4}>
        <IconButton variant="subtle" size={'md'} aria-label="Go back" asChild>
          <Link to="/exercises">
            <RxChevronLeft />
          </Link>
        </IconButton>
        <Heading as="h1" fontSize="2xl">
          New Exercise
        </Heading>
      </Stack>
      <ExerciseForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        error={error}
      />
    </Stack>
  );
}

export default NewExercisePage;
