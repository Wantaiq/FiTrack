import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteExercise from '../api/delete-exercise';
import exerciseQueryKeys from '../query-keys';

export function useDeleteExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExercise,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: exerciseQueryKeys.lists(),
      });
    },
  });
}
