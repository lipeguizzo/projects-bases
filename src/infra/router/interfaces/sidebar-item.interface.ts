import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { ReactNode } from 'react';

export interface ISidebarItem {
  name: string;
  path: string;
  icon: ReactNode;
  ability?: EAbilityCode;
}
