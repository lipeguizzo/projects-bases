import { Stack, Typography } from '@mui/material';
import { useAuth } from '@/modules/auth/hooks/use-auth';

export function WelcomeTitle() {
  const { user } = useAuth();

  return (
    <Stack alignItems="center" width="100%">
      <Typography variant="h4" component="h4" textAlign="center">
        Olá, seja bem-vindo(a) {user?.name}!
      </Typography>
    </Stack>
  );
}
