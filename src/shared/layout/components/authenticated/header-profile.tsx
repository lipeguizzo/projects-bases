/* eslint-disable react-hooks/exhaustive-deps */
import { EAuthenticatedPath } from '@/infra/router/enums/authenticated-path.enum';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog';
import { MouseEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createFileFromUUID, createFileURL } from '@/shared/utils/file';
import { UserAvatar } from '@/shared/components/images';
import { toast } from 'react-toastify';
import {
  Box,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
} from '@mui/material';

export function AuthenticatedHeaderProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const { openDialog } = useConfirmDialog();

  function handleToggle(event: MouseEvent<HTMLElement>) {
    setOpen((previousValue) => !previousValue);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setOpen(false);
    setAnchorEl(null);
  }

  async function handleConfirmLogout() {
    try {
      const confirm = await openDialog({
        title: 'Atenção!',
        description: 'Você tem certeza que deseja sair?',
      });

      if (confirm) {
        logout();
        toast.success('Volte sempre!');
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  async function refreshFile() {
    if (!user?.avatar?.uuid) return;
    const file = await createFileFromUUID(user.avatar.uuid);
    setAvatarUrl(createFileURL(file));
  }

  useEffect(() => {
    refreshFile();
    if (pathname) handleClose();
  }, [pathname]);

  return (
    <Box>
      <UserAvatar
        userName={user?.name ?? ''}
        url={avatarUrl}
        onClick={handleToggle}
      />
      <Popper
        transition
        placement="bottom-start"
        open={open}
        anchorEl={anchorEl}
        onMouseLeave={handleClose}
        sx={{ zIndex: 1200 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <List>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${EAuthenticatedPath.SETTINGS}`);
                    }}
                  >
                    <ListItemText
                      primary="Configurações"
                      sx={{ textAlign: 'center' }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={handleConfirmLogout}>
                    <ListItemText primary="Sair" sx={{ textAlign: 'center' }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
