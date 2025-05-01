import { RoleEntity } from '@/modules/role/domain/entities/role.entity';
import { Typography } from '@mui/material';
import { formatLongString } from '@/shared/utils/string';

interface Props {
  role: RoleEntity | null;
}

export function DataTableColumnRole({ role, ...props }: Props) {
  return (
    <Typography
      variant="body2"
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        minHeight: '100%',
      }}
      {...props}
    >
      {formatLongString(role?.name ?? 'N/A')}
    </Typography>
  );
}
