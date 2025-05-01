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
import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyUpdateForm } from '../components';
import { CompanyRepository } from '../../repositories/company.repository';
import { CompanyUpdateDto } from '../../domain/dto/company-update.dto';
import {
  CompanyUpdateData,
  CompanyUpdateSchema,
} from '../../domain/schemas/company-update.schema';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAbility } from '@/modules/auth/hooks/use-ability';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { createFileFromUUID } from '@/shared/utils/file';
import { toast } from 'react-toastify';

export function CompanyUpdate() {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialAvatar, setInitialAvatar] = useState<File | null>(null);

  const { id } = useParams();
  const { canUpdate, canDelete } = useAbility();
  const { openDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const companyRepository = new CompanyRepository();

  const methods = useForm<CompanyUpdateData>({
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
    resolver: zodResolver(CompanyUpdateSchema),
  });

  async function submit(data: CompanyUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: CompanyUpdateDto = {
        name: data.name,
        tradeName: data.tradeName,
        email: data.email,
        status: data.status,
        address: data.address,
      };

      const company = await companyRepository.update(id as ID, dto);
      const avatarChanged: boolean = data.avatar !== initialAvatar;

      if (avatarChanged) {
        if (data.avatar) {
          const formData = new FormData();
          formData.append('file', data.avatar);
          await companyRepository.updateAvatar(company.id, formData);
        } else {
          await companyRepository.deleteAvatar(company.id);
        }
      }

      toast.success('Empresa atualizada com sucesso!');

      navigate(`/${EAuthenticatedPath.COMPANIES}`);
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
      const company: CompanyEntity = await companyRepository.findOne(id);
      const avatarFile = company.avatar
        ? await createFileFromUUID(company.avatar.uuid)
        : null;
      methods.reset({
        ...company,
        avatar: avatarFile,
      });
      setInitialAvatar(avatarFile);
    } catch {
      navigate(`/${EAuthenticatedPath.COMPANIES}`);
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
        await companyRepository.delete(id as ID);
        toast.success('Deletado com sucesso!');
        navigate(`/${EAuthenticatedPath.COMPANIES}`);
      }
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.COMPANIES}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle
          previousPath={EAuthenticatedPath.COMPANIES}
          title="Empresas"
        />

        <PageButtons>
          {canDelete(EAbilityCode.COMPANIES) && (
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
          {canUpdate(EAbilityCode.COMPANIES) && (
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
          <CompanyUpdateForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
