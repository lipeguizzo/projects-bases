import { EUnauthenticatedPath } from '@/infra/router/enums/unauthenticated-path.enum';
import { LinkText } from '@/shared/components/buttons';
import { ControlledText } from '@/shared/components/inputs';
import { SpinnerLoading } from '@/shared/components/loadings';
import { UnauthenticatedContainerHeader } from '@/shared/layout/components/unauthenticated';
import {
  formatErrorForNotification,
  handleZodInvalidSchema,
} from '@/shared/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/use-auth';
import { toast } from 'react-toastify';
import { AuthRecoverPasswordDto } from '../../domain/dto/auth-recover-password.dto';
import {
  AuthRecoverData,
  AuthRecoverSchema,
} from '../../domain/schemas/auth-recover.schema';

export function Recover() {
  const { recover } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm<AuthRecoverData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(AuthRecoverSchema),
  });

  async function submit(data: AuthRecoverData) {
    if (loading) return;

    try {
      setLoading(true);
      const dto: AuthRecoverPasswordDto = data;
      const { message } = await recover(dto);
      toast.success(message);
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
        title="Recuperar Senha"
        description="Informe o e-mail da sua conta para alterar a senha."
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
        to={`/${EUnauthenticatedPath.LOGIN}`}
        align="center"
        color="secondary"
      >
        Já possui uma conta?
      </LinkText>

      <SpinnerLoading loading={loading} />
    </Stack>
  );
}
