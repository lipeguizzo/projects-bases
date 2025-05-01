import Grid from '@mui/material/Grid';
import { ControlledText } from '@/shared/components/inputs';
import { AddressForm } from '@/shared/components/forms';
import { useFormContext } from 'react-hook-form';

export function OrganizationForm() {
  const { control } = useFormContext();
  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Nome da organização"
          name="organizationName"
          size="medium"
          variant="outlined"
          placeholder="Nome da organização"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Nome fantasia da organização"
          name="organizationTradeName"
          size="medium"
          variant="outlined"
          placeholder="Nome da organização"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 12, xs: 12 }}>
        <ControlledText
          label="E-mail da organização"
          name="organizationEmail"
          size="medium"
          variant="outlined"
          placeholder="E-mail da organização"
          control={control}
        />
      </Grid>

      <AddressForm />
    </Grid>
  );
}
