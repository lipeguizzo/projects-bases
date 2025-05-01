import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';
import { Typography } from '@mui/material';
import { formatLongString } from '@/shared/utils/string';

interface Props {
  company: CompanyEntity | null;
}

export function DataTableColumnCompany({ company, ...props }: Props) {
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
      {formatLongString(company?.name ?? 'N/A')}
    </Typography>
  );
}
