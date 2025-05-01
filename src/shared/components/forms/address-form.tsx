import Grid from '@mui/material/Grid';
import { useFormContext } from 'react-hook-form';
import {
  ControlledText,
  ControlledState,
  ControlledCity,
} from '@/shared/components/inputs';

export function AddressForm() {
  const { control, watch } = useFormContext();
  const state: string = watch('address.state');

  return (
    <Grid container spacing={2} width="100%">
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledState
          label="Estado"
          name="address.state"
          size="medium"
          variant="outlined"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledCity
          label="Cidade"
          name="address.city"
          size="medium"
          variant="outlined"
          state={state}
          control={control}
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Bairro"
          name="address.neighborhood"
          size="medium"
          variant="outlined"
          placeholder="Bairro"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Logradouro"
          name="address.street"
          size="medium"
          variant="outlined"
          placeholder="Logradouro"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 12, xs: 12 }}>
        <ControlledText
          label="Complemento"
          name="address.complement"
          size="medium"
          variant="outlined"
          placeholder="Complemento"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
