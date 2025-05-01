import { useAbility } from '@/modules/auth/hooks/use-ability';
import { useLocation, useNavigate } from 'react-router-dom';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { ListItem, ListItemButton } from '@mui/material';
import { ISidebarItem } from '@/infra/router/interfaces/sidebar-item.interface';

interface Props {
  item: ISidebarItem;
}

export function AuthenticatedSidebarItem({ item }: Props) {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { abilities } = useAbility();

  const userAbilities = abilities ?? [];

  const selected = verifySelected(item.path, pathname);

  function verifySelected(itemPath: string, pathName: string): boolean {
    const path: string = itemPath.replace(/^\/+/, '');
    const currentPath: string = pathName.replace(/^\/+/, '');

    return currentPath === path || currentPath.startsWith(`${path}/`);
  }

  function verifyAbility(code?: EAbilityCode): boolean {
    return code
      ? userAbilities.some((ability: AbilityEntity) => ability.code === code)
      : true;
  }

  function handleNavigate(path: string) {
    navigate(path);
  }

  if (!verifyAbility(item.ability)) return;

  return (
    <ListItem>
      <ListItemButton
        onClick={() => handleNavigate(item.path ?? '')}
        selected={selected}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '20px',
          fontSize: '40px',
          color: selected ? 'secondary.main' : 'primary.main',
        }}
      >
        {item.icon ?? item.name.toUpperCase()}
      </ListItemButton>
    </ListItem>
  );
}
