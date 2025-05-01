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
import { OrganizationEntity } from '../../domain/entities/organization.entity';
import { OrganizationForm } from '../components';
import { OrganizationRepository } from '../../repositories/organization.repository';
import { OrganizationUpdateDto } from '../../domain/dto/organization-update.dto';
import {
  OrganizationUpdateData,
  OrganizationUpdateSchema,
} from '../../domain/schemas/organization-update.schema';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAbility } from '@/modules/auth/hooks/use-ability';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { createFileFromUUID } from '@/shared/utils/file';
import { toast } from 'react-toastify';

export function OrganizationUpdate() {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialAvatar, setInitialAvatar] = useState<File | null>(null);

  const { id } = useParams();
  const { canUpdate, canDelete } = useAbility();
  const { openDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const organizationRepository = new OrganizationRepository();

  const methods = useForm<OrganizationUpdateData>({
    defaultValues: {
      name: '',
      tradeName: '',
      email: '',
      status: EStatus.ACTIVE,
      avatar: null,
      address: {
        state: '',
        city: '',
        street: '',
        neighborhood: '',
        complement: '',
      },
    },
    resolver: zodResolver(OrganizationUpdateSchema),
  });

  async function submit(data: OrganizationUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: OrganizationUpdateDto = {
        name: data.name,
        tradeName: data.tradeName,
        email: data.email,
        status: data.status,
        address: data.address,
      };

      const organization = await organizationRepository.update(id as ID, dto);
      const avatarChanged: boolean = data.avatar !== initialAvatar;

      if (avatarChanged) {
        if (data.avatar) {
          const formData = new FormData();
          formData.append('file', data.avatar);
          await organizationRepository.updateAvatar(organization.id, formData);
        } else {
          await organizationRepository.deleteAvatar(organization.id);
        }
      }

      toast.success('Organização atualizada com sucesso!');

      navigate(`/${EAuthenticatedPath.ORGANIZATIONS}`);
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
      const organization: OrganizationEntity =
        await organizationRepository.findOne(id);
      const avatarFile = organization.avatar
        ? await createFileFromUUID(organization.avatar.uuid)
        : null;
      methods.reset({
        ...organization,
        avatar: avatarFile,
      });
      setInitialAvatar(avatarFile);
    } catch {
      navigate(`/${EAuthenticatedPath.ORGANIZATIONS}`);
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
        await organizationRepository.delete(id as ID);
        toast.success('Deletado com sucesso!');
        navigate(`/${EAuthenticatedPath.ORGANIZATIONS}`);
      }
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.ORGANIZATIONS}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle
          previousPath={EAuthenticatedPath.ORGANIZATIONS}
          title="Organizações"
        />

        <PageButtons>
          {canDelete(EAbilityCode.ORGANIZATIONS) && (
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
          {canUpdate(EAbilityCode.ORGANIZATIONS) && (
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
          <OrganizationForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
