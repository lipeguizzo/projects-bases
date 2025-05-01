/* eslint-disable react-hooks/exhaustive-deps */
import Grid from '@mui/material/Grid';
import {
  ControlledText,
  ControlledEnum,
  ControlledSearch,
  ControlledCheckbox,
  ControlledOrganization,
  ControlledCompany,
  ControlledRole,
} from '@/shared/components/inputs';
import { UserFindManyDto } from '@/modules/user/domain/dto/user-find-many.dto';
import {
  EGender,
  EGenderTranslate,
} from '@/modules/user/domain/enums/gender.enum';
import { EStatus, EStatusTranslate } from '@/shared/domain/enums/status.enum';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<UserFindManyDto>) => void;
}

export function UserFilter({ onFilter }: Props) {
  const { control, watch } = useForm<UserFindManyDto>({
    defaultValues: {
      search: '',
      name: '',
      email: '',
      includeDeleted: false,
    },
  });

  const search: string | undefined = watch('search');
  const name: string | undefined = watch('name');
  const email: string | undefined = watch('email');
  const gender: EGender | undefined = watch('gender');
  const organizationId: number | undefined = watch('organizationId');
  const companyId: number | undefined = watch('companyId');
  const status: EStatus[] | undefined = watch('status');
  const includeDeleted: boolean | undefined = watch('includeDeleted');

  useEffect(() => {
    onFilter({
      search,
      name,
      email,
      gender,
      organizationId,
      companyId,
      status,
      includeDeleted,
    });
  }, [
    search,
    name,
    email,
    gender,
    organizationId,
    companyId,
    status,
    includeDeleted,
  ]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledSearch label="Procurar" name="search" control={control} />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText label="Nome" name="name" control={control} />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText label="E-mail" name="email" control={control} />
      </Grid>
      <Grid size={{ md: 2, xs: 12 }}>
        <ControlledEnum
          label="Gênero"
          name="gender"
          options={EGender}
          translate={EGenderTranslate}
          control={control}
        />
      </Grid>
      <Grid size={{ md: 2, xs: 12 }}>
        <ControlledRole label="Perfil" name="roleId" control={control} />
      </Grid>
      <Grid size={{ md: 2, xs: 12 }}>
        <ControlledOrganization
          label="Organização"
          name="organizationId"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 2, xs: 12 }}>
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
          label="Incluir deletados"
          name="includeDeleted"
          color="secondary"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
