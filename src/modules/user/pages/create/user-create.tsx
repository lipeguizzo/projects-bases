import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { Button } from '@mui/material';
import { SpinnerLoading } from '@/shared/components/loadings';
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  PageButtons,
} from '@/shared/layout/components/page';
import { formatErrorForNotification } from '@/shared/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserCreateForm } from '../components/';
import { UserCreateDto } from '../../domain/dto/user-create.dto';
import { UserRepository } from '../../repositories/user.repository';
import {
  UserCreateData,
  UserCreateSchema,
} from '../../domain/schemas/user-create.schema';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export function UserCreate() {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const userRepository = new UserRepository();

  const methods = useForm<UserCreateData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      status: EStatus.ACTIVE,
      avatar: null,
    },
    resolver: zodResolver(UserCreateSchema),
  });

  async function submit(data: UserCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: UserCreateDto = {
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender,
        phone: data.phone,
        roleId: data.roleId,
        organizationId: data.organizationId,
        companyId: data.companyId,
        status: data.status,
      };

      const user = await userRepository.create(dto);
      const avatarChanged: boolean = data.avatar !== null;

      if (avatarChanged) {
        if (data.avatar) {
          const formData = new FormData();
          formData.append('file', data.avatar);
          await userRepository.updateAvatar(user.id, formData);
        } else {
          await userRepository.deleteAvatar(user.id);
        }
      }

      toast.success('Usuário cadastrado com sucesso!');

      navigate(`/${EAuthenticatedPath.USERS}`);
      methods.reset();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle previousPath={EAuthenticatedPath.USERS} title="Usuários" />

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
          <UserCreateForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
