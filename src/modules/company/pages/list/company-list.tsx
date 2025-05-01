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
import { CompanyFindManyDto } from '../../domain/dto/company-find-many.dto';
import { CompanyRepository } from '../../repositories/company.repository';
import { CompanyTable, CompanyFilter } from './components/';
import { useState } from 'react';
import { useAbility } from '@/modules/auth/hooks/use-ability';
import useSWR from 'swr';

export function CompanyList() {
  const { canCreate } = useAbility();

  const companyRepository = new CompanyRepository();

  const [params, setParams] = useState<CompanyFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    search: '',
    includeDeleted: false,
  });

  const { data, isLoading, mutate } = useSWR(
    ['companies', params],
    ([, value]) => companyRepository.findMany(value),
  );

  function handleFilter(filter: Partial<CompanyFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Empresas" />
        <PageButtons>
          {canCreate(EAbilityCode.COMPANIES) && (
            <LinkButton to="novo" color="success" sx={{ width: '200px' }}>
              Novo
            </LinkButton>
          )}
        </PageButtons>
      </PageHeader>
      <PageContent>
        <CompanyFilter onFilter={handleFilter} />
        <CompanyTable
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
