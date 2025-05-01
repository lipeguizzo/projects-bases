import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { ReactNode } from 'react';

export interface IRoute {
  name?: string;
  path?: string;
  icon?: ReactNode;
  index?: boolean;
  hidden?: boolean;
  element?: ReactNode;
  ability?: EAbilityCode;
  children?: IRoute[];
}
