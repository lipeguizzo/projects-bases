import Grid from '@mui/material/Grid';
import {
  ControlledText,
  ControlledEnum,
  ControlledUpload,
  ControlledOrganization,
} from '@/shared/components/inputs';
import { CompanyCreateData } from '../../domain/schemas/company-create.schema';
import { AddressForm } from '@/shared/components/forms';
import { EStatus, EStatusTranslate } from '@/shared/domain/enums/status.enum';
import { useFormContext } from 'react-hook-form';

export function CompanyCreateForm() {
  const { control } = useFormContext<CompanyCreateData>();

  return (
    <Grid container spacing={3}>
      <Grid size={{ md: 12, xs: 12 }}>
        <ControlledUpload name="avatar" control={control} />
      </Grid>
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Nome"
          name="name"
          size="medium"
          variant="outlined"
          placeholder="Nome"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Nome fantasia"
          name="tradeName"
          size="medium"
          variant="outlined"
          placeholder="Nome fantasia"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="E-mail"
          name="email"
          size="medium"
          variant="outlined"
          placeholder="E-mail"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledOrganization
          label="Organização"
          name="organizationId"
          size="medium"
          variant="outlined"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 3, xs: 12 }}>
        <ControlledEnum
          label="Status"
          name="status"
          options={EStatus}
          translate={EStatusTranslate}
          control={control}
        />
      </Grid>
      <AddressForm />
    </Grid>
  );
}
