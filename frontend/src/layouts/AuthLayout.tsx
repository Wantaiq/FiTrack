import { Loader } from '@/common/components';
import { useMe } from '@/features/auth/hooks/useMe';
import { Navigate, Outlet } from 'react-router';

function AuthLayout() {
  const { isPending, isError } = useMe();

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AuthLayout;
