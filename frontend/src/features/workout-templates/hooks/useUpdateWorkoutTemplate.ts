import { useMutation, useQueryClient } from "@tanstack/react-query";
import workoutTemplateQueryKeys from "../query-keys";
import updateWorkoutTemplate from "../api/update-exercise";

function useUpdateWorkoutTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkoutTemplate,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: workoutTemplateQueryKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: workoutTemplateQueryKeys.lists(),
      });
    },
  });
}

export default useUpdateWorkoutTemplate;
