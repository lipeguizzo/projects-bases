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
import { UserFindManyDto } from '../../domain/dto/user-find-many.dto';
import { UserRepository } from '../../repositories/user.repository';
import { UserTable, UserFilter } from './components/';
import { useState } from 'react';
import { useAbility } from '@/modules/auth/hooks/use-ability';
import useSWR from 'swr';

export function UserList() {
  const { canCreate } = useAbility();

  const userRepository = new UserRepository();

  const [params, setParams] = useState<UserFindManyDto>({
    page: 1,
    pageSize: 10,
    ordering: 'asc',
    search: '',
    includeDeleted: false,
  });

  const { data, isLoading, mutate } = useSWR(['users', params], ([, value]) =>
    userRepository.findMany(value),
  );

  function handleFilter(filter: Partial<UserFindManyDto>) {
    setParams((prev) => ({ ...prev, ...filter }));
  }

  function handlePagination(pagination: IPaginationRequest) {
    setParams((prev) => ({ ...prev, ...pagination }));
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle title="Usuários" />
        <PageButtons>
          {canCreate(EAbilityCode.ROLES) && (
            <LinkButton to="novo" color="success" sx={{ width: '200px' }}>
              Novo
            </LinkButton>
          )}
        </PageButtons>
      </PageHeader>
      <PageContent>
        <UserFilter onFilter={handleFilter} />
        <UserTable
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
