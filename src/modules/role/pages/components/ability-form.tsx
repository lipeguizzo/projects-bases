import Grid from '@mui/material/Grid';
import { Stack, Typography } from '@mui/material';
import { AbilityCard } from '.';
import { AbilityEntity } from '../../domain/entities/ability.entity';
import { EAbilityCode } from '../../domain/enums/ability-code.enum';
import { useFormContext } from 'react-hook-form';
import { useAbility } from '@/modules/auth/hooks/use-ability';

export function AbilityForm() {
  const { groupedAbilities } = useAbility();
  const { setValue, watch } = useFormContext();

  const selectedAbilities: AbilityEntity[] = watch('abilities') ?? [];
  const groups: Record<string, AbilityEntity[]> = groupedAbilities();

  function handleChangeAbility(
    checked: boolean,
    ...abilities: AbilityEntity[]
  ): void {
    if (checked) {
      setValue(
        'abilities',
        [...selectedAbilities, ...abilities].filter(
          (ability, index, allAbilities) =>
            allAbilities.findIndex((e) => e.id === ability.id) === index,
        ),
      );
    } else {
      setValue(
        'abilities',
        selectedAbilities.filter(
          (selectedAbility) =>
            !abilities.find((ability) => selectedAbility.id === ability.id),
        ),
      );
    }
  }
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4" component="h4" align="center">
          Permissões
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
          {Object.entries(groups ?? {}).map(([code, abilities]) => {
            return (
              <AbilityCard
                key={code}
                code={code as EAbilityCode}
                onChange={handleChangeAbility}
                abilities={abilities}
              />
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}
