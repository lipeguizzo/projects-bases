import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { authenticatedRoutes } from '@/infra/router/routes/authenticated.route';
import { AbilityEntity } from '@/modules/role/domain/entities/ability.entity';
import {
  Stack,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAbility } from '@/modules/auth/hooks/use-ability';

export function CardList() {
  const navigate = useNavigate();

  const { abilities } = useAbility();

  const userAbilities = abilities ?? [];

  function verifyAbility(code?: EAbilityCode): boolean {
    if (!code) return false;

    return code
      ? userAbilities.some((ability: AbilityEntity) => ability.code === code)
      : true;
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      width="100%"
      minHeight="670px"
      gap={2}
    >
      {authenticatedRoutes
        .filter((route) => !route.hidden && verifyAbility(route.ability))
        .map((route, index) => (
          <Card key={index} sx={{ width: '300px' }} elevation={0}>
            <CardActionArea onClick={() => navigate(`/${route.path}`)}>
              <CardContent>
                <Stack justifyContent="center" alignItems="center">
                  <Box color="secondary.main" fontSize="120px">
                    {route.icon}
                  </Box>
                  <Typography variant="h4" component="h4">
                    {route.name}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Stack>
  );
}
