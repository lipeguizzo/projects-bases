import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  index: number;
  value: number;
  children?: ReactNode;
}

export function TabPanel({ children, value, index, ...other }: Props) {
  return (
    <Box {...other}>
      {value === index && (
        <Stack gap={2} marginTop={2}>
          {children}
        </Stack>
      )}
    </Box>
  );
}
