import { useAuth } from '@/modules/auth/hooks/use-auth';
import { SpinnerLoading } from '@/shared/components/loadings/';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { EUnauthenticatedPath } from '../enums/unauthenticated-path.enum';

export function RequiredAuth() {
  const { authenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <SpinnerLoading loading={loading} />;

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={'/' + EUnauthenticatedPath.LOGIN}
      state={{ from: location }}
      replace
    />
  );
}
