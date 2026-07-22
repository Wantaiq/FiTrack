import { Navigate, useNavigate, useParams } from 'react-router';
import useWorkoutTemplateDetails from '../hooks/useWorkoutTemplateDetails';
import { Button, Loader } from '@chakra-ui/react';
import WorkoutTemplateDetails from '../components/WorkoutTemplateDetails';
import { useDeleteWorkoutTemplate } from '../hooks/useDeleteWorkoutTemplate';

function WorkoutTemplateDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: workoutTemplate,
    isPending,
    error,
  } = useWorkoutTemplateDetails(id!);
  const { mutateAsync } = useDeleteWorkoutTemplate();

  async function handleDelete() {
    await mutateAsync(id!);
    navigate('/workout-templates', { replace: true });
  }

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <Button onClick={handleDelete}>Delete</Button>
      <WorkoutTemplateDetails workoutTemplate={workoutTemplate} />
    </>
  );
}

export default WorkoutTemplateDetailsPage;
