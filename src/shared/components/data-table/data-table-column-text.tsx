import { Typography } from '@mui/material';
import { formatLongString } from '@/shared/utils/string';

interface Props {
  value: string;
}

export function DataTableColumnText({ value, ...props }: Props) {
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
      {formatLongString(value)}
    </Typography>
  );
}
