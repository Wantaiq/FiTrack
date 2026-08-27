import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateExercise from "../api/update-exercise";
import exerciseQueryKeys from "../query-keys";

function useUpdateExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExercise,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: exerciseQueryKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: exerciseQueryKeys.detail(variables.id),
      });
    },
  });
}

export default useUpdateExercise;
