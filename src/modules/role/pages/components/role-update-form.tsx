import Grid from '@mui/material/Grid';
import {
  ControlledText,
  ControlledEnum,
  ControlledOrganization,
  ControlledCompany,
} from '@/shared/components/inputs';
import { EStatus, EStatusTranslate } from '@/shared/domain/enums/status.enum';
import {
  ERoleReference,
  ERoleReferenceTranslate,
} from '../../domain/enums/role-reference.enum';
import { useFormContext } from 'react-hook-form';
import { useAbility } from '@/modules/auth/hooks/use-ability';

export function RoleUpdateForm() {
  const { control } = useFormContext();
  const { excludeReferences } = useAbility();

  return (
    <Grid container padding={2} spacing={3} width="100%">
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
        <ControlledEnum
          label="Referência"
          name="reference"
          control={control}
          options={ERoleReference}
          translate={ERoleReferenceTranslate}
          excludeOptions={excludeReferences()}
        />
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledOrganization
          label="Organização"
          name="organizationId"
          size="medium"
          variant="outlined"
          control={control}
          disabled
        />
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledCompany
          label="Empresa"
          name="companyId"
          size="medium"
          variant="outlined"
          control={control}
          disabled
        />
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledEnum
          label="Status"
          name="status"
          options={EStatus}
          translate={EStatusTranslate}
          control={control}
        />
      </Grid>
    </Grid>
  );
}
