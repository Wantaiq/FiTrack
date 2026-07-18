import { useNavigate } from 'react-router';
import WorkoutTemplateForm from '../components/WorkoutTemplateForm';
import useCreateWorkoutTemplate from '../hooks/useCreateWorkoutTemplate';
import type { CreateWorkoutTemplateFormValues } from '../schemas/create-workout-template.schema';

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
    <WorkoutTemplateForm
      isSubmitting={isPending}
      error={error}
      onSubmit={handleSubmit}
    />
  );
}

export default NewWorkoutTemplatePage;
