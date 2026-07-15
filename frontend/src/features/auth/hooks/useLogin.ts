import { useMutation, useQueryClient } from '@tanstack/react-query';
import authQueryKeys from '../query-keys';
import login from '../api/login';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me,
      });
    },
  });
}
