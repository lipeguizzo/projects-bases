/* eslint-disable react-hooks/exhaustive-deps */
import Grid from '@mui/material/Grid';
import {
  ControlledText,
  ControlledEnum,
  ControlledSearch,
  ControlledCheckbox,
  ControlledOrganization,
  ControlledCompany,
} from '@/shared/components/inputs';
import { RoleFindManyDto } from '@/modules/role/domain/dto/role-find-many.dto';
import {
  ERoleReference,
  ERoleReferenceTranslate,
} from '@/modules/role/domain/enums/role-reference.enum';
import { EStatus, EStatusTranslate } from '@/shared/domain/enums/status.enum';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<RoleFindManyDto>) => void;
}

export function RoleFilter({ onFilter }: Props) {
  const { control, watch } = useForm<RoleFindManyDto>({
    defaultValues: {
      search: '',
      includeDeleted: false,
    },
  });

  const search: string | undefined = watch('search');
  const name: string | undefined = watch('name');
  const isDefault: boolean | undefined = watch('isDefault');
  const reference: ERoleReference | undefined = watch('reference');
  const organizationId: number | undefined = watch('organizationId');
  const companyId: number | undefined = watch('companyId');
  const status: EStatus[] | undefined = watch('status');
  const includeDeleted: boolean | undefined = watch('includeDeleted');

  useEffect(() => {
    onFilter({
      search,
      name,
      isDefault,
      reference,
      organizationId,
      companyId,
      status,
      includeDeleted,
    });
  }, [
    search,
    name,
    isDefault,
    reference,
    organizationId,
    companyId,
    status,
    includeDeleted,
  ]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledSearch label="Procurar" name="search" control={control} />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledText label="Nome" name="name" control={control} />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledEnum
          label="Referência"
          name="reference"
          options={ERoleReference}
          translate={ERoleReferenceTranslate}
          control={control}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledOrganization
          label="Organização"
          name="organizationId"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledCompany label="Empresa" name="companyId" control={control} />
      </Grid>
      <Grid size={{ md: 2, xs: 12 }}>
        <ControlledEnum
          label="Status"
          name="status"
          options={EStatus}
          translate={EStatusTranslate}
          multiple={true}
          control={control}
        />
      </Grid>
      <Grid size={{ md: 2, xs: 12 }}>
        <ControlledCheckbox
          label="Perfis padrões"
          name="isDefault"
          color="secondary"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 2, xs: 12 }}>
        <ControlledCheckbox
          label="Incluir deletados"
          name="includeDeleted"
          color="secondary"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
