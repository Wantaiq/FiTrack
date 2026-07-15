import { useMutation, useQueryClient } from '@tanstack/react-query';
import authQueryKeys from '../query-keys';
import logout from '../api/logout';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me,
      });
    },
  });
}
