import { ConfirmDialogProvider } from '@/shared/contexts/confirm-dialog';
import { Box, Drawer, Stack, Theme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  AuthenticatedFooter,
  AuthenticatedHeader,
  AuthenticatedSidebar,
  AuthenticatedSidebarButton,
} from '../components/authenticated';

export function Authenticated() {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const [isDrawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        bgcolor: 'transparent',
        width: '150px',
        height: '80vh',
        position: 'relative',
        top: '120px',
      }}
    >
      <AuthenticatedSidebar />
      <AuthenticatedSidebarButton
        open={isDrawerOpen}
        onClick={toggleDrawer(false)}
      />
    </Box>
  );

  return (
    <ConfirmDialogProvider>
      <Stack minHeight="100vh">
        <AuthenticatedHeader />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {!isMobile && (
            <Drawer
              variant="persistent"
              sx={{
                position: 'sticky',
                width: isDrawerOpen ? '150px' : '40px',
                bgcolor: 'transparent',
                [`& .MuiDrawer-paper`]: {
                  bgcolor: 'transparent',
                  overflow: 'hidden',
                  border: 'none',
                },
              }}
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerContent}
            </Drawer>
          )}

          <Box
            component="main"
            sx={{
              position: 'relative',
              width: '100%',
              marginBottom: '10px',
              backgroundColor: 'background.default',
            }}
          >
            {!isDrawerOpen && (
              <AuthenticatedSidebarButton
                open={isDrawerOpen}
                onClick={toggleDrawer(true)}
              />
            )}
            <Outlet />
          </Box>
        </Box>

        <AuthenticatedFooter />
      </Stack>
    </ConfirmDialogProvider>
  );
}
