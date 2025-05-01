import { useAbility } from '@/modules/auth/hooks/use-ability';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import { EAbilityAction } from '@/modules/role/domain/enums/ability-action.enum';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { SpinnerLoading } from '@/shared/components/loadings/';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  code: EAbilityCode;
  action?: EAbilityAction;
}

export function RequiredAbility({ code: reference, action }: Props) {
  const { abilities, loading } = useAbility();

  const requiredByAbility = action
    ? (ability: AbilityEntity) =>
        ability.code === reference && ability.action === action
    : (ability: AbilityEntity) => ability.code === reference;

  if (loading) return <SpinnerLoading loading={loading} />;

  if (!abilities) return <Navigate to="/" />;

  return abilities.some(requiredByAbility) ? <Outlet /> : <Navigate to="/" />;
}
