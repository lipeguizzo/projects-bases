import { Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import {
  UnauthenticatedContainer,
  UnauthenticatedFooter,
  UnauthenticatedHeader,
} from '../components/unauthenticated';

export function Unauthenticated() {
  const { authenticated } = useAuth();

  if (authenticated) return <Navigate to="/" replace />;

  return (
    <Stack
      position="relative"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      minHeight="100vh"
      bgcolor="background"
    >
      <UnauthenticatedHeader />

      <UnauthenticatedContainer>
        <Outlet />
      </UnauthenticatedContainer>

      <UnauthenticatedFooter />
    </Stack>
  );
}
