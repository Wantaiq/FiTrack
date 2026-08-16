import { Link, useNavigate } from 'react-router';
import WorkoutTemplateForm from '../components/WorkoutTemplateForm';
import useCreateWorkoutTemplate from '../hooks/useCreateWorkoutTemplate';
import type { CreateWorkoutTemplateFormValues } from '../schemas/create-workout-template.schema';
import { Heading, IconButton, Stack } from '@chakra-ui/react';
import { RxChevronLeft } from 'react-icons/rx';

function NewWorkoutTemplatePage() {
  const { mutate, isPending, error } = useCreateWorkoutTemplate();
  const navigate = useNavigate();

  function handleSubmit(values: CreateWorkoutTemplateFormValues) {
    mutate(values, {
      onSuccess(workoutTemplate) {
        navigate(`/workout-templates/${workoutTemplate.id}`);
      },
    });
  }

  return (
    <Stack gap={8}>
      <Stack direction="row" alignItems="center" gap={4}>
        <IconButton variant="subtle" size={'md'} aria-label="Go back" asChild>
          <Link to="/workout-templates">
            <RxChevronLeft />
          </Link>
        </IconButton>
        <Heading as="h1" fontSize="2xl">
          New Workout Template
        </Heading>
      </Stack>
      <WorkoutTemplateForm
        isSubmitting={isPending}
        error={error}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
}

export default NewWorkoutTemplatePage;
