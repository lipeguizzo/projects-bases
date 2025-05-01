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
  ControlledRole,
  ControlledOrganization,
  ControlledCompany,
} from '@/shared/components/inputs';
import { useFormContext } from 'react-hook-form';
import { UserCreateData } from '../../domain/schemas/user-create.schema';

export function UserCreateForm() {
  const { control } = useFormContext<UserCreateData>();

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
        <ControlledEnum
          label="Gênero"
          name="gender"
          options={EGender}
          translate={EGenderTranslate}
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

      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledRole
          label="Perfil"
          name="roleId"
          size="medium"
          variant="outlined"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledOrganization
          label="Organização"
          name="organizationId"
          size="medium"
          variant="outlined"
          control={control}
        />
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <ControlledCompany
          label="Empresa"
          name="companyId"
          size="medium"
          variant="outlined"
          control={control}
        />
      </Grid>
    </Grid>
  );
}
