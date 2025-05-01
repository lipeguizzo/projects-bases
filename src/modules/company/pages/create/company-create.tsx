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
import { CompanyCreateForm } from '../components/';
import { CompanyCreateDto } from '../../domain/dto/company-create.dto';
import { CompanyRepository } from '../../repositories/company.repository';
import {
  CompanyCreateData,
  CompanyCreateSchema,
} from '../../domain/schemas/company-create.schema';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export function CompanyCreate() {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const companyRepository = new CompanyRepository();

  const methods = useForm<CompanyCreateData>({
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
    resolver: zodResolver(CompanyCreateSchema),
  });

  async function submit(data: CompanyCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: CompanyCreateDto = {
        name: data.name,
        tradeName: data.tradeName,
        email: data.email,
        organizationId: data.organizationId,
        status: data.status,
        address: data.address,
      };

      const company = await companyRepository.create(dto);
      const avatarChanged: boolean = data.avatar !== null;

      if (avatarChanged) {
        if (data.avatar) {
          const formData = new FormData();
          formData.append('file', data.avatar);
          await companyRepository.updateAvatar(company.id, formData);
        } else {
          await companyRepository.deleteAvatar(company.id);
        }
      }

      toast.success('Empresa cadastrada com sucesso!');

      navigate(`/${EAuthenticatedPath.COMPANIES}`);
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
        <PageTitle
          previousPath={EAuthenticatedPath.COMPANIES}
          title="Empresas"
        />

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
          <CompanyCreateForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
