import { Navigate, useNavigate, useParams } from 'react-router';
import useExerciseDetails from '../hooks/useExerciseDetails';
import { Loader } from '@/common/components';
import { useDeleteExercise } from '../hooks/useDeleteExercise';
import { Button } from '@chakra-ui/react';
import ExerciseDetails from '../components/ExerciseDetails';

function ExerciseDetailsPage() {
  const { id } = useParams();
  const { mutateAsync } = useDeleteExercise();
  const navigate = useNavigate();
  const { data: exercise, isPending, error } = useExerciseDetails(id!);

  async function handleDelete() {
    await mutateAsync(id!);
    navigate('/exercises', { replace: true });
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
      <Button onClick={handleDelete} loading={isPending}>
        Remove
      </Button>
      <ExerciseDetails exercise={exercise} />
    </>
  );
}

export default ExerciseDetailsPage;
