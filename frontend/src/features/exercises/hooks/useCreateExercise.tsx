import { useMutation, useQueryClient } from '@tanstack/react-query';
import createExercise from '../api/create-exercise';
import exerciseQueryKeys from '../query-keys';

function useCreateExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExercise,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: exerciseQueryKeys.all,
      });
    },
  });
}

export default useCreateExercise;
