/* eslint-disable react-hooks/exhaustive-deps */
import Grid from '@mui/material/Grid';
import {
  ControlledText,
  ControlledEnum,
  ControlledSearch,
  ControlledCheckbox,
  ControlledOrganization,
} from '@/shared/components/inputs';
import { CompanyFindManyDto } from '@/modules/company/domain/dto/company-find-many.dto';
import { EStatus, EStatusTranslate } from '@/shared/domain/enums/status.enum';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onFilter: (filter: Partial<CompanyFindManyDto>) => void;
}

export function CompanyFilter({ onFilter }: Props) {
  const { control, watch } = useForm<CompanyFindManyDto>({
    defaultValues: {
      search: '',
      name: '',
      tradeName: '',
      email: '',
      includeDeleted: false,
    },
  });

  const search: string | undefined = watch('search');
  const name: string | undefined = watch('name');
  const tradeName: string | undefined = watch('tradeName');
  const email: string | undefined = watch('email');
  const organizationId: number | undefined = watch('organizationId');
  const status: EStatus[] | undefined = watch('status');
  const includeDeleted: boolean | undefined = watch('includeDeleted');

  useEffect(() => {
    onFilter({
      search,
      name,
      tradeName,
      email,
      organizationId,
      status,
      includeDeleted,
    });
  }, [search, name, tradeName, email, organizationId, status, includeDeleted]);

  return (
    <Grid container padding={2} spacing={3} width="100%">
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText label="Nome" name="name" control={control} />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText
          label="Nome fantasia"
          name="tradeName"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledText label="E-mail" name="email" control={control} />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledOrganization
          label="Organização"
          name="organizationId"
          control={control}
        />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledEnum
          label="Status"
          name="status"
          options={EStatus}
          translate={EStatusTranslate}
          multiple={true}
          control={control}
        />
      </Grid>
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledSearch label="Procurar" name="search" control={control} />
      </Grid>
      <Grid size={{ md: 3, xs: 12 }}>
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
