/* eslint-disable react-hooks/exhaustive-deps */
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { EGender } from '@/modules/user/domain/enums/gender.enum';
import { UserRepository } from '@/modules/user/repositories/user.repository';
import { SpinnerLoading } from '@/shared/components/loadings';
import { EStatus } from '@/shared/domain/enums/status.enum';
import {
  Page,
  PageButtons,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/shared/layout/components/page';
import { formatErrorForNotification } from '@/shared/utils/error';
import { createFileFromUUID } from '@/shared/utils/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserUpdateSelfDto } from '../../domain/dto/user-update-self.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import {
  UserUpdateSelfData,
  UserUpdateSelfSchema,
} from '../../domain/schemas/user-update-self.schema';
import { UserSelfForm } from './components/user-self-form';

export function UserSettings() {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialAvatar, setInitialAvatar] = useState<File | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const userRepository = new UserRepository();

  const methods = useForm<UserUpdateSelfData>({
    defaultValues: {
      name: '',
      email: '',
      gender: EGender.M,
      phone: '',
      password: '',
      confirm: '',
      status: EStatus.ACTIVE,
      avatar: null,
    },
    resolver: zodResolver(UserUpdateSelfSchema),
  });

  async function submit(data: UserUpdateSelfData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: UserUpdateSelfDto = {
        name: data.name,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        password: data.password,
        status: data.status,
      };

      await userRepository.updateSelf(dto);
      const avatarChanged: boolean = data.avatar !== initialAvatar;

      if (avatarChanged) {
        if (data.avatar && user?.id) {
          const formData = new FormData();
          formData.append('file', data.avatar);
          await userRepository.updateAvatar(user.id, formData);
        } else if (user?.id) {
          await userRepository.deleteAvatar(user.id);
        }
      }

      toast.success('Usuário atualizado com sucesso!');

      navigate(`/${EAuthenticatedPath.HOME}`);
      methods.reset();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function findSelf() {
    try {
      setLoading(true);
      const user: UserEntity = await userRepository.findSelf();
      const avatarFile = user.avatar
        ? await createFileFromUUID(user.avatar.uuid)
        : null;
      methods.reset({
        ...user,
        password: '',
        confirm: '',
        avatar: avatarFile,
      });
      setInitialAvatar(avatarFile);
    } catch {
      navigate(`/${EAuthenticatedPath.HOME}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    findSelf();
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Configurações" />

        <PageButtons>
          <Button
            size="large"
            variant="contained"
            color="success"
            disabled={!isValid}
            sx={{ width: '200px' }}
            onClick={methods.handleSubmit(submit)}
          >
            Salvar
          </Button>
        </PageButtons>
      </PageHeader>

      <PageContent>
        <FormProvider {...methods}>
          <UserSelfForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
