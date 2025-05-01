import { Chip } from '@mui/material';

interface Props {
  value: boolean;
}

export function DataTableColumnBoolean({ value, ...props }: Props) {
  if (typeof value === 'boolean') {
    return (
      <Chip
        label={value ? 'SIM' : 'NÃO'}
        color={value ? 'success' : 'error'}
        {...props}
      />
    );
  }
}
