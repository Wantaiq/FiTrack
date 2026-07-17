import { useQuery } from '@tanstack/react-query';
import exerciseQueryKeys from '../query-keys';
import getExerciseDetails from '../api/exercise-details';

function useExerciseDetails(id: string) {
  return useQuery({
    queryKey: exerciseQueryKeys.detail(id),
    queryFn: () => getExerciseDetails(id),
  });
}

export default useExerciseDetails;
