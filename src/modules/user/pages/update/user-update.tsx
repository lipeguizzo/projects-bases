/* eslint-disable react-hooks/exhaustive-deps */
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { ID } from '@/shared/types/id';
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
import { FormProvider, useForm } from 'react-hook-form';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserUpdateForm } from '../components';
import { UserRepository } from '../../repositories/user.repository';
import { UserUpdateDto } from '../../domain/dto/user-update.dto';
import {
  UserUpdateData,
  UserUpdateSchema,
} from '../../domain/schemas/user-update.schema';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAbility } from '@/modules/auth/hooks/use-ability';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { createFileFromUUID } from '@/shared/utils/file';
import { toast } from 'react-toastify';

export function UserUpdate() {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialAvatar, setInitialAvatar] = useState<File | null>(null);

  const { id } = useParams();
  const { canUpdate, canDelete } = useAbility();
  const { openDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const userRepository = new UserRepository();

  const methods = useForm<UserUpdateData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
      phone: '',
      status: EStatus.ACTIVE,
      avatar: null,
    },
    resolver: zodResolver(UserUpdateSchema),
  });

  async function submit(data: UserUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: UserUpdateDto = {
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender,
        phone: data.phone,
        roleId: data.roleId,
        status: data.status,
      };

      const user = await userRepository.update(id as ID, dto);
      const avatarChanged: boolean = data.avatar !== initialAvatar;

      if (avatarChanged) {
        if (data.avatar) {
          const formData = new FormData();
          formData.append('file', data.avatar);
          await userRepository.updateAvatar(user.id, formData);
        } else {
          await userRepository.deleteAvatar(user.id);
        }
      }

      toast.success('Usuário atualizada com sucesso!');

      navigate(`/${EAuthenticatedPath.USERS}`);
      methods.reset();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function findById(id: ID) {
    try {
      setLoading(true);
      const user: UserEntity = await userRepository.findOne(id);
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
      navigate(`/${EAuthenticatedPath.USERS}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmDelete() {
    try {
      const confirm = await openDialog({
        title: 'Atenção!',
        description: 'Você tem certeza que deseja deletar esse item?',
      });

      if (confirm) {
        setLoading(true);
        await userRepository.delete(id as ID);
        toast.success('Deletado com sucesso!');
        navigate(`/${EAuthenticatedPath.USERS}`);
      }
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.USERS}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle previousPath={EAuthenticatedPath.USERS} title="Usuários" />

        <PageButtons>
          {canDelete(EAbilityCode.USERS) && (
            <Button
              size="large"
              variant="contained"
              color="error"
              sx={{ width: '200px' }}
              onClick={handleConfirmDelete}
            >
              Excluir
            </Button>
          )}
          {canUpdate(EAbilityCode.USERS) && (
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
          )}
        </PageButtons>
      </PageHeader>

      <PageContent>
        <FormProvider {...methods}>
          <UserUpdateForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
