import Grid from '@mui/material/Grid';
import {
  EGender,
  EGenderTranslate,
} from '@/modules/user/domain/enums/gender.enum';
import {
  ControlledText,
  ControlledPassword,
  ControlledPhone,
  ControlledEnum,
  ControlledUpload,
} from '@/shared/components/inputs';
import { useFormContext } from 'react-hook-form';
import { UserUpdateSelfData } from '@/modules/user/domain/schemas/user-update-self.schema';

export function UserSelfForm() {
  const { control } = useFormContext<UserUpdateSelfData>();

  return (
    <Grid container padding={2} spacing={3} width="100%">
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
        <ControlledEnum
          label="Gênero"
          name="gender"
          options={EGender}
          translate={EGenderTranslate}
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

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledPhone
          label="Telefone"
          name="phone"
          size="medium"
          placeholder="Telefone"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledPassword
          label="Senha"
          name="password"
          size="medium"
          variant="outlined"
          placeholder="Senha"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledPassword
          label="Confirme a senha"
          name="confirm"
          size="medium"
          variant="outlined"
          placeholder="Confirme a senha"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
