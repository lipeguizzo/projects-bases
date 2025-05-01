import { EUnauthenticatedPath } from '@/infra/router/enums/unauthenticated-path.enum';
import { LinkText } from '@/shared/components/buttons';
import { ControlledPassword } from '@/shared/components/inputs';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { toast } from 'react-toastify';
import { AuthResetPasswordDto } from '../../domain/dto/auth-reset-password.dto';
import {
  AuthResetData,
  AuthResetSchema,
} from '../../domain/schemas/auth-reset.schema';

export function Reset() {
  const { reset } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) navigate(EUnauthenticatedPath.LOGIN);

  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<AuthResetData>({
    defaultValues: {
      password: '',
      confirm: '',
      token: token ?? '',
    },
    resolver: zodResolver(AuthResetSchema),
  });

  async function submit(data: AuthResetData) {
    if (loading) return;

    try {
      setLoading(true);
      const dto: AuthResetPasswordDto = data;
      await reset(dto);
      toast.success('Senha alterada com sucesso!');
      navigate(EUnauthenticatedPath.LOGIN);
      resetForm();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack gap={3}>
      <UnauthenticatedContainerHeader
        title="Alterar Senha"
        description="Informe uma nova senha para sua conta."
      />

      <Stack
        gap={2}
        width="100%"
        component="form"
        onSubmit={handleSubmit(submit, handleZodInvalidSchema)}
      >
        <ControlledPassword
          label="Senha"
          name="password"
          size="medium"
          variant="outlined"
          placeholder="Senha"
          control={control}
        />

        <ControlledPassword
          label="Confirme a senha"
          name="confirm"
          size="medium"
          variant="outlined"
          placeholder="Confirme a senha"
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
