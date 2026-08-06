import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateExercise from '../api/update-exercise';
import exerciseQueryKeys from '../query-keys';

function useUpdateExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExercise,

    onSuccess(exercise) {
      queryClient.invalidateQueries({
        queryKey: exerciseQueryKeys.lists(),
      });

      queryClient.setQueryData(exerciseQueryKeys.detail(exercise.id), exercise);
    },
  });
}

export default useUpdateExercise;
