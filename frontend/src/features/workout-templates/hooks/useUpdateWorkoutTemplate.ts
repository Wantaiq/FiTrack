import { useMutation, useQueryClient } from "@tanstack/react-query";
import workoutTemplateQueryKeys from "../query-keys";
import updateWorkoutTemplate from "../api/update-exercise";

function useUpdateWorkoutTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkoutTemplate,

    onSuccess(workoutTemplate) {
      queryClient.invalidateQueries({
        queryKey: workoutTemplateQueryKeys.lists(),
      });

      queryClient.setQueryData(
        workoutTemplateQueryKeys.detail(workoutTemplate.id),
        workoutTemplate,
      );
    },
  });
}

export default useUpdateWorkoutTemplate;
