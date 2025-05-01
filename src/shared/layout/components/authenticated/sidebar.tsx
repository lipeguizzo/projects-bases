import { authenticatedRoutes } from '@/infra/router/routes/authenticated.route';
import { toSidebar } from '@/infra/router/mappers/to-sidebar';
import { AuthenticatedSidebarItem } from './sidebar-item';
import { List, Stack } from '@mui/material';

export function AuthenticatedSidebar() {
  const items = toSidebar(authenticatedRoutes);

  return (
    <Stack
      sx={{
        width: '100px',
        height: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '20px',
        padding: '5px',
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        {items.map((item, index) => (
          <AuthenticatedSidebarItem key={index} item={item} />
        ))}
      </List>
    </Stack>
  );
}
