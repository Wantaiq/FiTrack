import { useMutation, useQueryClient } from '@tanstack/react-query';
import createWorkoutTemplate from '../api/create-workout-template';
import workoutTemplateQueryKeys from '../query-keys';

function useCreateWorkoutTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkoutTemplate,
    onSuccess(workoutTemplate) {
      queryClient.invalidateQueries({
        queryKey: workoutTemplateQueryKeys.lists(),
      });
    },
  });
}

export default useCreateWorkoutTemplate;
