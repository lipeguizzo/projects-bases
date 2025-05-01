import { IconButton, IconButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props extends Omit<IconButtonProps, 'component' & 'href'> {
  to: string;
}

export function ContactLinkButton({ children, to = '', ...props }: Props) {
  return (
    <IconButton
      target="_blank"
      component={Link}
      to={to}
      sx={{
        fontSize: '40px',
        color: 'white.main',
        transition: '0.3s',
        '&:hover': {
          color: 'secondary.main',
          transform: 'scale(1.2)',
        },
      }}
      {...props}
    >
      {children}
    </IconButton>
  );
}
