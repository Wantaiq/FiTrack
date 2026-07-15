import { useEffect } from 'react';
import { useLogout } from '../hooks/useLogout';
import { Navigate } from 'react-router';
import { Loader } from '@/common/components';

function LogoutPage() {
  const { mutateAsync, isPending } = useLogout();

  useEffect(() => {
    mutateAsync();
  }, []);

  if (isPending) {
    return <Loader />;
  }

  return <Navigate to="/login" replace />;
}

export default LogoutPage;
