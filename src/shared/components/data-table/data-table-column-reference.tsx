import {
  ERoleReference,
  ERoleReferenceTranslate,
} from '@/modules/role/domain/enums/role-reference.enum';
import { Chip } from '@mui/material';

interface Props {
  reference: ERoleReference;
}

export function DataTableColumnReference({ reference, ...props }: Props) {
  return (
    <Chip
      label={ERoleReferenceTranslate[reference]}
      color="primary"
      {...props}
    />
  );
}
