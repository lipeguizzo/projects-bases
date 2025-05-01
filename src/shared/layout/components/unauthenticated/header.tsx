import { ContactLinkButton, MenuButton } from '@/shared/components/buttons';
import { AppBar, Box, Drawer, List, ListItem, Toolbar } from '@mui/material';
import { ReactNode, useState } from 'react';
import { Logo } from '@/shared/components/images/logo';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface ILink {
  icon: ReactNode;
  url?: string;
}

export function UnauthenticatedHeader() {
  const links: ILink[] = [
    {
      icon: <FacebookOutlinedIcon fontSize="inherit" />,
      url: import.meta.env.VITE_CONTACT_FACEBOOK,
    },
    {
      icon: <WhatsAppIcon fontSize="inherit" />,
      url: import.meta.env.VITE_CONTACT_WHATSAPP,
    },
    {
      icon: <InstagramIcon fontSize="inherit" />,
      url: import.meta.env.VITE_CONTACT_INSTAGRAM,
    },
  ];

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      bgcolor="primary.main"
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          gap: 2,
        }}
      >
        {links.map(
          ({ icon, url }, index) =>
            url && (
              <ListItem key={index} sx={{ width: 'auto', padding: 0 }}>
                <ContactLinkButton to={url}>{icon}</ContactLinkButton>
              </ListItem>
            ),
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Logo />
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {links.map(
            ({ icon, url }, index) =>
              url && (
                <ContactLinkButton key={index} to={url}>
                  {icon}
                </ContactLinkButton>
              ),
          )}
        </Box>
        <MenuButton onClick={toggleDrawer(true)} />
      </Toolbar>
      <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
}
