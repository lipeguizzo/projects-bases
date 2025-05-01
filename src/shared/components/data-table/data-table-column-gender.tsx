import {
  EGender,
  EGenderTranslate,
} from '@/modules/user/domain/enums/gender.enum';
import { Typography } from '@mui/material';

interface Props {
  gender: EGender;
}

export function DataTableColumnGender({ gender, ...props }: Props) {
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
      {EGenderTranslate[gender]}
    </Typography>
  );
}
