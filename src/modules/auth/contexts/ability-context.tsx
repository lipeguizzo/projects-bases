/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { EAbilityAction } from '@/modules/role/domain/enums/ability-action.enum';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IAbilityContextType } from '../domain/interfaces/ability-context-type.interface';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import { groupAbilitiesByCode } from '@/modules/role/helpers/group-abilities-by-code';
import { ID } from '@/shared/types/id';
import { RoleRepository } from '@/modules/role/repositories/role.repository';

export const AbilityContext = createContext<IAbilityContextType>(
  {} as IAbilityContextType,
);

export const AbilityProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();

  const roleRepository = new RoleRepository();

  const [loading, setLoading] = useState<boolean>(true);
  const [abilities, setAbilities] = useState<AbilityEntity[] | null>(null);

  function excludeReferences(): string[] {
    const isAdmin: boolean = user?.role?.reference === ERoleReference.ADMIN;

    const isAdminOrganization: boolean =
      user?.role?.reference === ERoleReference.ADMIN_ORGANIZATION;

    const isAdminCompany: boolean =
      user?.role?.reference === ERoleReference.ADMIN_COMPANY;

    const isClient: boolean = user?.role?.reference === ERoleReference.CLIENT;

    if (isAdmin) return [];

    if (isAdminOrganization) return [ERoleReference.ADMIN];

    if (isAdminCompany)
      return [ERoleReference.ADMIN, ERoleReference.ADMIN_ORGANIZATION];

    if (isClient)
      return [
        ERoleReference.ADMIN,
        ERoleReference.ADMIN_ORGANIZATION,
        ERoleReference.ADMIN_COMPANY,
      ];

    return [];
  }

  function groupedAbilities(): Record<string, AbilityEntity[]> {
    if (!abilities) return {};
    return groupAbilitiesByCode(abilities);
  }

  function canAction(code: EAbilityCode, action: EAbilityAction): boolean {
    return (
      abilities?.some(
        (ability) => ability.code === code && ability.action === action,
      ) ?? false
    );
  }

  function canRead(code: EAbilityCode) {
    return canAction(code, EAbilityAction.READ);
  }

  function canCreate(code: EAbilityCode) {
    return canAction(code, EAbilityAction.CREATE);
  }

  function canUpdate(code: EAbilityCode) {
    return canAction(code, EAbilityAction.UPDATE);
  }

  function canDelete(code: EAbilityCode) {
    return canAction(code, EAbilityAction.DELETE);
  }

  async function findAbilities(id: ID) {
    setLoading(true);
    const data = await roleRepository.findAbilities(id);
    setAbilities(data);
    setLoading(false);
  }

  useEffect(() => {
    if (user?.role?.id) {
      findAbilities(user?.role?.id);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      abilities,
      loading,
      excludeReferences,
      groupedAbilities,
      canRead,
      canCreate,
      canUpdate,
      canDelete,
    }),
    [abilities, loading, canCreate, canDelete, canRead, canUpdate],
  );

  return (
    <AbilityContext.Provider value={value}>{children}</AbilityContext.Provider>
  );
};
