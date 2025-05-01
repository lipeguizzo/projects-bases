import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RoleCreateDto } from '../../domain/dto/role-create.dto';
import {
  RoleCreateData,
  RoleCreateSchema,
} from '../../domain/schemas/role-create.schema';
import { RoleRepository } from '../../repositories/role.repository';
import { AbilityForm, RoleCreateForm } from '../components';

export function RoleCreate() {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const roleRepository = new RoleRepository();

  const methods = useForm<RoleCreateData>({
    defaultValues: {
      name: '',
      status: EStatus.ACTIVE,
      abilities: [],
    },
    resolver: zodResolver(RoleCreateSchema),
  });

  async function submit(data: RoleCreateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: RoleCreateDto = {
        name: data.name,
        reference: data.reference,
        organizationId: data?.organizationId,
        companyId: data?.companyId,
        status: data.status,
        abilitiesIds: data.abilities.map((ability) => ability.id),
      };

      await roleRepository.create(dto);

      toast.success('Perfil cadastrado com sucesso!');

      navigate(`/${EAuthenticatedPath.ROLES}`);
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
          previousPath={EAuthenticatedPath.ROLES}
          title="Perfil de Usuários"
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
          <RoleCreateForm />
          <AbilityForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
