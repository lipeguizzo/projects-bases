import { Stack, Theme, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function PageButtons({ children }: Props) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <Stack
      width={isMobile ? '100%' : 'auto'}
      direction="row"
      justifyContent={isMobile ? 'start' : 'end'}
      flexWrap="wrap"
      gap={2}
    >
      {children}
    </Stack>
  );
}
