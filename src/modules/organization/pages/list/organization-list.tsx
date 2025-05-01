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
import { OrganizationFindManyDto } from '../../domain/dto/organization-find-many.dto';
import { OrganizationRepository } from '../../repositories/organization.repository';
import { OrganizationTable, OrganizationFilter } from './components/';
import { useState } from 'react';
import { useAbility } from '@/modules/auth/hooks/use-ability';
import useSWR from 'swr';

export function OrganizationList() {
  const { canCreate } = useAbility();

  const organizationRepository = new OrganizationRepository();

  const [params, setParams] = useState<OrganizationFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    search: '',
    includeDeleted: false,
  });

  const { data, isLoading, mutate } = useSWR(
    ['organizations', params],
    ([, value]) => organizationRepository.findMany(value),
  );

  function handleFilter(filter: Partial<OrganizationFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Organizações" />
        <PageButtons>
          {canCreate(EAbilityCode.ORGANIZATIONS) && (
            <LinkButton to="novo" color="success" sx={{ width: '200px' }}>
              Novo
            </LinkButton>
          )}
        </PageButtons>
      </PageHeader>
      <PageContent>
        <OrganizationFilter onFilter={handleFilter} />
        <OrganizationTable
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
