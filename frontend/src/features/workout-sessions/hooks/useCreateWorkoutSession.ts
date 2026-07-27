import { useMutation, useQueryClient } from '@tanstack/react-query';
import createWorkoutSession from '../api/create-workout-session';
import workoutSessionQueryKeys from '../query-keys';

function useCreateWorkoutSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkoutSession,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: workoutSessionQueryKeys.lists(),
      });
    },
  });
}

export default useCreateWorkoutSession;
