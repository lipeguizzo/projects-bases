/* eslint-disable react-hooks/exhaustive-deps */
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { SpinnerLoading } from '@/shared/components/loadings';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import {
  Page,
  PageButtons,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/shared/layout/components/page';
import { ID } from '@/shared/types/id';
import { formatErrorForNotification } from '@/shared/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAbility } from '@/modules/auth/hooks/use-ability';
import { toast } from 'react-toastify';
import { RoleUpdateDto } from '../../domain/dto/role-update.dto';
import { AbilityEntity } from '../../domain/entities/ability.entity';
import { RoleEntity } from '../../domain/entities/role.entity';
import { EAbilityCode } from '../../domain/enums/ability-code.enum';
import {
  RoleUpdateData,
  RoleUpdateSchema,
} from '../../domain/schemas/role-update.schema';
import { RoleRepository } from '../../repositories/role.repository';
import { RoleUpdateForm, AbilityForm } from '../components';

export function RoleUpdate() {
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();
  const { canUpdate, canDelete } = useAbility();
  const { openDialog } = useConfirmDialog();
  const navigate = useNavigate();

  const roleRepository = new RoleRepository();

  const methods = useForm<RoleUpdateData>({
    defaultValues: {
      name: '',
      status: EStatus.ACTIVE,
      abilities: [],
    },
    resolver: zodResolver(RoleUpdateSchema),
  });

  async function submit(data: RoleUpdateData) {
    if (loading) return;
    try {
      setLoading(true);

      const dto: RoleUpdateDto = {
        name: data.name,
        reference: data.reference,
        status: data.status,
        abilitiesIds: data.abilities.map((ability) => ability.id),
      };

      await roleRepository.update(id as ID, dto);

      toast.success('Perfil atualizado com sucesso!');

      navigate(`/${EAuthenticatedPath.ROLES}`);
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
      const role: RoleEntity = await roleRepository.findOne(id);
      const abilities: AbilityEntity[] = await roleRepository.findAbilities(id);
      if (role.isDefault) {
        toast.warn('Perfil padrão, não possível atualizar ou deletar!', {
          toastId: role.id,
        });
        navigate(`/${EAuthenticatedPath.ROLES}`);
        return;
      }
      methods.reset({
        ...role,
        abilities: abilities,
      });
    } catch {
      navigate(`/${EAuthenticatedPath.ROLES}`);
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
        await roleRepository.delete(id as ID);
        toast.success('Deletado com sucesso!');
        navigate(`/${EAuthenticatedPath.ROLES}`);
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(`/${EAuthenticatedPath.ROLES}`);
    } else {
      findById(id);
    }
  }, []);

  const isValid: boolean = methods.formState.isValid;

  return (
    <Page>
      <PageHeader>
        <PageTitle
          previousPath={EAuthenticatedPath.ROLES}
          title="Perfil de Usuários"
        />

        <PageButtons>
          {canDelete(EAbilityCode.ROLES) && (
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
          {canUpdate(EAbilityCode.ROLES) && (
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
          <RoleUpdateForm />
          <AbilityForm />
        </FormProvider>
      </PageContent>
      <SpinnerLoading loading={loading} />
    </Page>
  );
}
