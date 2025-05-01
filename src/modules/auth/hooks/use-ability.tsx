import { useContext } from 'react';
import { AbilityContext } from '../contexts/ability-context';

export function useAbility() {
  return useContext(AbilityContext);
}
