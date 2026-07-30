import { Link, useNavigate } from 'react-router';
import CreateExerciseForm from '../components/CreateExerciseForm';
import useCreateExercise from '../hooks/useCreateExercise';
import type { CreateExerciseFormValues } from '../schemas/create-exercise.schema';
import { Heading, HStack, IconButton, VStack } from '@chakra-ui/react';
import { RxChevronLeft } from 'react-icons/rx';

function NewExercisePage() {
  const { mutate, isPending, error } = useCreateExercise();
  const navigate = useNavigate();

  async function handleSubmit(values: CreateExerciseFormValues) {
    mutate(values, {
      onSuccess: (exercise) => {
        navigate(`/exercises/${exercise.id}`);
      },
    });
  }

  return (
    <VStack align="stretch" px={12} gap={8}>
      <HStack gap={4}>
        <IconButton variant="outline" size={'lg'} aria-label="Go back" asChild>
          <Link to="/exercises">
            <RxChevronLeft />
          </Link>
        </IconButton>
        <Heading as="h1" fontSize="2xl">
          New Exercise
        </Heading>
      </HStack>
      <CreateExerciseForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        error={error}
      />
    </VStack>
  );
}

export default NewExercisePage;
