import logo from '@/shared/assets/react-white-logo.png';
import { Box, BoxProps } from '@mui/material';

interface Props extends Omit<BoxProps, 'defaultValue' | 'name'> {
  alt?: string;
}

export function Logo({ alt, ...props }: Props) {
  return (
    <Box
      component="img"
      src={logo}
      alt={alt ?? 'logo'}
      sx={{
        height: 100,
        width: 150,
        objectFit: 'contain',
        padding: 2,
      }}
      {...props}
    />
  );
}
