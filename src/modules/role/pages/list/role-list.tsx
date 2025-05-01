import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { LinkButton } from '@/shared/components/buttons';
import {
  Page,
  PageButtons,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/shared/layout/components/page';
import { RoleFindManyDto } from '../../domain/dto/role-find-many.dto';
import { RoleRepository } from '../../repositories/role.repository';
import { RoleTable, RoleFilter } from './components/';
import { useState } from 'react';
import { useAbility } from '@/modules/auth/hooks/use-ability';
import useSWR from 'swr';

export function RoleList() {
  const { canCreate } = useAbility();

  const roleRepository = new RoleRepository();

  const [params, setParams] = useState<RoleFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    search: '',
    includeDeleted: false,
  });

  const { data, isLoading, mutate } = useSWR(['roles', params], ([, value]) =>
    roleRepository.findMany(value),
  );

  function handleFilter(filter: Partial<RoleFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Perfil de Usuários" />
        <PageButtons>
          {canCreate(EAbilityCode.ROLES) && (
            <LinkButton to="novo" color="success" sx={{ width: '200px' }}>
              Novo
            </LinkButton>
          )}
        </PageButtons>
      </PageHeader>
      <PageContent>
        <RoleFilter onFilter={handleFilter} />
        <RoleTable
          data={data}
          pagination={params}
          loading={isLoading}
          reload={mutate}
          onChangePagination={handlePagination}
        />
      </PageContent>
    </Page>
  );
}
