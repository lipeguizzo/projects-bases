import { authenticatedRoutes } from '@/infra/router/routes/authenticated.route';
import { toBreadcrumbs } from '@/infra/router/mappers/to-breadcrumbs';
import { BackButton, LinkText } from '@/shared/components/buttons';
import { Breadcrumbs, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

interface Props {
  title: string;
  previousPath?: string;
}

export function PageTitle({ title, previousPath }: Props) {
  const location = useLocation();

  const pathnames = location.pathname
    .split('/')
    .filter(Boolean)
    .map((route) => (isNaN(Number(route)) ? route : ':id'));

  const breadcrumbs = toBreadcrumbs(authenticatedRoutes);

  return (
    <Stack gap={1}>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        {previousPath && <BackButton to={`/${previousPath}`} />}
        <Typography component="h2" variant="h4">
          {title}
        </Typography>
      </Stack>
      <Stack>
        <Breadcrumbs
          maxItems={2}
          separator={<ArrowForwardIosRoundedIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {pathnames.map((_, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return isLast ? (
              <Typography key={to} component="h2" variant="h4" fontSize="20px">
                {breadcrumbs[to]}
              </Typography>
            ) : (
              <LinkText key={to} to={to} color="black" fontSize="20px">
                {breadcrumbs[to]}
              </LinkText>
            );
          })}
        </Breadcrumbs>
      </Stack>
    </Stack>
  );
}
