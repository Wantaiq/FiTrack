import { useQuery } from '@tanstack/react-query';
import workoutTemplateQueryKeys from '../query-keys';
import getWorkoutTemplateDetails from '../api/get-workout-template-details';

function useWorkoutTemplateDetails(id: string) {
  return useQuery({
    queryKey: workoutTemplateQueryKeys.detail(id),
    queryFn: () => getWorkoutTemplateDetails(id),
  });
}

export default useWorkoutTemplateDetails;
