import { EUnauthenticatedPath } from '@/infra/router/enums/unauthenticated-path.enum';
import { Button, Stack } from '@mui/material';
import { LinkText } from '@/shared/components/buttons';
import { ControlledPassword, ControlledText } from '@/shared/components/inputs';
import { SpinnerLoading } from '@/shared/components/loadings/spinner-loading';
import { UnauthenticatedContainerHeader } from '@/shared/layout/components/unauthenticated';
import {
  formatErrorForNotification,
  handleZodInvalidSchema,
} from '@/shared/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/use-auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthLoginDto } from '../../domain/dto/auth-login.dto';
import {
  AuthLoginData,
  AuthLoginSchema,
} from '../../domain/schemas/auth-login.schema';

export function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm<AuthLoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(AuthLoginSchema),
  });

  async function submit(data: AuthLoginData) {
    if (loading) return;
    try {
      setLoading(true);
      const dto: AuthLoginDto = data;
      await login(dto);
      toast.success('Bem vindo de volta!');
      reset();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack gap={3}>
      <UnauthenticatedContainerHeader
        title="Entrar"
        description="Faça o login para ter a acesso ao sistema."
      />

      <Stack
        gap={2}
        width="100%"
        component="form"
        onSubmit={handleSubmit(submit, handleZodInvalidSchema)}
      >
        <ControlledText
          label="E-mail"
          name="email"
          size="medium"
          variant="outlined"
          placeholder="E-mail"
          control={control}
        />

        <ControlledPassword
          label="Senha"
          name="password"
          size="medium"
          variant="outlined"
          placeholder="Senha"
          control={control}
        />

        <Button
          size="large"
          variant="contained"
          color="secondary"
          type="submit"
        >
          Enviar
        </Button>
      </Stack>

      <LinkText
        to={`/${EUnauthenticatedPath.REGISTER}`}
        align="center"
        color="secondary"
      >
        Não possui uma conta?
      </LinkText>

      <LinkText
        to={`/${EUnauthenticatedPath.RECOVER}`}
        align="center"
        color="secondary"
      >
        Esqueceu a senha?
      </LinkText>

      <SpinnerLoading loading={loading} />
    </Stack>
  );
}
