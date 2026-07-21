import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteWorkoutTemplate from '../api/delete-workout-template';
import workoutTemplateQueryKeys from '../query-keys';

export function useDeleteExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkoutTemplate,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: workoutTemplateQueryKeys.lists(),
      });
    },
  });
}
