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
import { OrganizationForm } from '../components/';
import { OrganizationCreateDto } from '../../domain/dto/organization-create.dto';
import { OrganizationRepository } from '../../repositories/organization.repository';
import {
  OrganizationCreateData,
  OrganizationCreateSchema,
} from '../../domain/schemas/organization-create.schema';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export function OrganizationCreate() {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const organizationRepository = new OrganizationRepository();

  const methods = useForm<OrganizationCreateData>({
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
    resolver: zodResolver(OrganizationCreateSchema),
  });

  async function submit(data: OrganizationCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: OrganizationCreateDto = {
        name: data.name,
        tradeName: data.tradeName,
        email: data.email,
        status: data.status,
        address: data.address,
      };

      const organization = await organizationRepository.create(dto);
      const avatarChanged: boolean = data.avatar !== null;

      if (avatarChanged) {
        if (data.avatar) {
          const formData = new FormData();
          formData.append('file', data.avatar);
          await organizationRepository.updateAvatar(organization.id, formData);
        } else {
          await organizationRepository.deleteAvatar(organization.id);
        }
      }

      toast.success('Organização cadastrada com sucesso!');

      navigate(`/${EAuthenticatedPath.ORGANIZATIONS}`);
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
          previousPath={EAuthenticatedPath.ORGANIZATIONS}
          title="Organizações"
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
          <OrganizationForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
