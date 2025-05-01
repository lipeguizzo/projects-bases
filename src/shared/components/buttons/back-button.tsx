import { IconButton, IconButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

interface Props extends Omit<IconButtonProps, 'component' & 'href'> {
  to: string;
}

export function BackButton({ to, ...props }: Props) {
  return (
    <IconButton component={Link} to={to} {...props}>
      <ArrowBackRoundedIcon color="secondary" />
    </IconButton>
  );
}
