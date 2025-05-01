import { OrganizationEntity } from '@/modules/organization/domain/entities/organization.entity';
import { Typography } from '@mui/material';
import { formatLongString } from '@/shared/utils/string';

interface Props {
  organization: OrganizationEntity | null;
}

export function DataTableColumnOrganization({ organization, ...props }: Props) {
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
      {formatLongString(organization?.name ?? 'N/A')}
    </Typography>
  );
}
