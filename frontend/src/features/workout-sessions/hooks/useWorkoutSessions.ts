import { useQuery } from '@tanstack/react-query';
import type { FilterWorkoutSessions } from '../schemas/filter-workout-session.schema';
import workoutSessionQueryKeys from '../query-keys';
import getWorkoutSessions from '../api/get-workout-sessions';

function useWorkoutSessions(filters: FilterWorkoutSessions) {
  return useQuery({
    queryKey: workoutSessionQueryKeys.list(filters),
    queryFn: () => getWorkoutSessions(filters),
  });
}

export default useWorkoutSessions;
