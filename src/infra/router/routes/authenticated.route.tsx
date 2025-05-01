import { Outlet } from 'react-router-dom';
import { IRoute } from '../interfaces/route.interface';
import { EAbilityCode } from '@/modules/role/domain/enums/ability-code.enum';
import { EAbilityAction } from '@/modules/role/domain/enums/ability-action.enum';
import { RequiredAbility } from '../components/required-ability';
import { EAuthenticatedPath } from '../enums/authenticated-path.enum';
import { Home } from '@/modules/home/pages';
import { UserSettings } from '@/modules/user/pages/settings/user-settings';
import { OrganizationList } from '@/modules/organization/pages/list/organization-list';
import { OrganizationCreate } from '@/modules/organization/pages/create/organization-create';
import { OrganizationUpdate } from '@/modules/organization/pages/update/organization-update';
import { CompanyList } from '@/modules/company/pages/list/company-list';
import { CompanyCreate } from '@/modules/company/pages/create/company-create';
import { CompanyUpdate } from '@/modules/company/pages/update/company-update';
import { RoleList } from '@/modules/role/pages/list/role-list';
import { RoleCreate } from '@/modules/role/pages/create/role-create';
import { RoleUpdate } from '@/modules/role/pages/update/role-update';
import { UserList } from '@/modules/user/pages/list/user-list';
import { UserCreate } from '@/modules/user/pages/create/user-create';
import { UserUpdate } from '@/modules/user/pages/update/user-update';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

export const authenticatedRoutes: IRoute[] = [
  {
    name: 'Pagina principal',
    element: <Outlet />,
    path: EAuthenticatedPath.HOME,
    icon: <HomeRoundedIcon fontSize="inherit" />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    name: 'Configurações',
    element: <UserSettings />,
    path: EAuthenticatedPath.SETTINGS,
    hidden: true,
  },
  {
    name: 'Organizações',
    path: EAuthenticatedPath.ORGANIZATIONS,
    ability: EAbilityCode.ORGANIZATIONS,
    icon: <ApartmentRoundedIcon fontSize="inherit" />,
    element: <RequiredAbility code={EAbilityCode.ORGANIZATIONS} />,
    children: [
      {
        index: true,
        element: <OrganizationList />,
      },
      {
        name: 'Nova organização',
        path: 'novo',
        element: (
          <RequiredAbility
            code={EAbilityCode.ORGANIZATIONS}
            action={EAbilityAction.CREATE}
          />
        ),
        children: [
          {
            index: true,
            element: <OrganizationCreate />,
          },
        ],
      },
      {
        name: 'Edição de organização',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.ORGANIZATIONS}
            action={EAbilityAction.UPDATE || EAbilityAction.DELETE}
          />
        ),
        children: [
          {
            index: true,
            element: <OrganizationUpdate />,
          },
        ],
      },
    ],
  },
  {
    name: 'Empresas',
    path: EAuthenticatedPath.COMPANIES,
    ability: EAbilityCode.COMPANIES,
    icon: <BusinessRoundedIcon fontSize="inherit" />,
    element: <RequiredAbility code={EAbilityCode.COMPANIES} />,
    children: [
      {
        index: true,
        element: <CompanyList />,
      },
      {
        name: 'Nova empresa',
        path: 'novo',
        element: (
          <RequiredAbility
            code={EAbilityCode.COMPANIES}
            action={EAbilityAction.CREATE}
          />
        ),
        children: [
          {
            index: true,
            element: <CompanyCreate />,
          },
        ],
      },
      {
        name: 'Edição de empresa',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.COMPANIES}
            action={EAbilityAction.UPDATE || EAbilityAction.DELETE}
          />
        ),
        children: [
          {
            index: true,
            element: <CompanyUpdate />,
          },
        ],
      },
    ],
  },
  {
    name: 'Perfis',
    path: EAuthenticatedPath.ROLES,
    ability: EAbilityCode.ROLES,
    icon: <AdminPanelSettingsRoundedIcon fontSize="inherit" />,
    element: <RequiredAbility code={EAbilityCode.ROLES} />,
    children: [
      {
        index: true,
        element: <RoleList />,
      },
      {
        name: 'Novo perfil',
        path: 'novo',
        element: (
          <RequiredAbility
            code={EAbilityCode.ROLES}
            action={EAbilityAction.CREATE}
          />
        ),
        children: [
          {
            index: true,
            element: <RoleCreate />,
          },
        ],
      },
      {
        name: 'Edição de perfil',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.ROLES}
            action={EAbilityAction.UPDATE || EAbilityAction.DELETE}
          />
        ),
        children: [
          {
            index: true,
            element: <RoleUpdate />,
          },
        ],
      },
    ],
  },
  {
    name: 'Usuários',
    path: EAuthenticatedPath.USERS,
    ability: EAbilityCode.USERS,
    icon: <PeopleAltRoundedIcon fontSize="inherit" />,
    element: <RequiredAbility code={EAbilityCode.USERS} />,
    children: [
      {
        index: true,
        element: <UserList />,
      },
      {
        name: 'Novo usuário',
        path: 'novo',
        element: (
          <RequiredAbility
            code={EAbilityCode.USERS}
            action={EAbilityAction.CREATE}
          />
        ),
        children: [
          {
            index: true,
            element: <UserCreate />,
          },
        ],
      },
      {
        name: 'Edição de usuário',
        path: ':id',
        element: (
          <RequiredAbility
            code={EAbilityCode.USERS}
            action={EAbilityAction.UPDATE || EAbilityAction.DELETE}
          />
        ),
        children: [
          {
            index: true,
            element: <UserUpdate />,
          },
        ],
      },
    ],
  },
];
