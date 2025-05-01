import { authenticatedRoutes } from '@/infra/router/routes/authenticated.route';
import { useAbility } from '@/modules/auth/hooks/use-ability';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { ContactLinkButton, MenuButton } from '@/shared/components/buttons';
import { Logo } from '@/shared/components/images/logo';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticatedHeaderProfile } from './header-profile';

interface ILink {
  icon: ReactNode;
  url?: string;
}

export function AuthenticatedHeader() {
  const navigate = useNavigate();
  const { abilities } = useAbility();

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

  function handleNavigate(path: string) {
    navigate(path);
  }

  const userAbilities = abilities ?? [];

  function verifyAbility(code?: EAbilityCode): boolean {
    return code
      ? userAbilities.some((ability: AbilityEntity) => ability.code === code)
      : true;
  }

  const drawerContent = (
    <Box
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      bgcolor="primary.main"
    >
      <List>
        {authenticatedRoutes
          .filter((route) => !route.hidden)
          .map(
            ({ name, path, ability }, index) =>
              verifyAbility(ability) && (
                <ListItem key={index}>
                  <ListItemButton
                    onClick={() => handleNavigate(path ?? '')}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      color: 'white.main',
                    }}
                  >
                    {name?.toUpperCase()}
                  </ListItemButton>
                </ListItem>
              ),
          )}
      </List>
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
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
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
        <AuthenticatedHeaderProfile />
      </Toolbar>
      <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
}
