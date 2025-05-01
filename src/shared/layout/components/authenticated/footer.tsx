import { Box, Typography } from '@mui/material';

export function AuthenticatedFooter() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        padding: 2,
        bgcolor: 'primary.main',
      }}
    >
      <Typography variant="body2" color="white.main" align="center">
        Copyright © Project Base {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
