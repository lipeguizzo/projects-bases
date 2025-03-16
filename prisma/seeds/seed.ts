import { PrismaClient, $Enums } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function createAbilities(): Promise<void> {
  const actions = [
    $Enums.AbilityActions.READ,
    $Enums.AbilityActions.CREATE,
    $Enums.AbilityActions.UPDATE,
    $Enums.AbilityActions.DELETE,
  ];
  await prisma.ability.createMany({
    data: [
      {
        code: $Enums.AbilityCodes.ADMIN,
      },
      {
        code: $Enums.AbilityCodes.ORGANIZATIONS,
      },
      {
        code: $Enums.AbilityCodes.COMPANIES,
      },
      {
        code: $Enums.AbilityCodes.USERS,
      },
      {
        code: $Enums.AbilityCodes.ROLES,
      },
    ].flatMap((data) =>
      actions.map((action) => ({
        ...data,
        action,
      })),
    ),
  });
}

async function createRoles(): Promise<void> {
  await prisma.role.createMany({
    data: [
      {
        name: 'Admin',
        reference: $Enums.RoleReferences.ADMIN,
        isDefault: true,
      },
      {
        name: 'Admin Organização',
        reference: $Enums.RoleReferences.ADMIN_ORGANIZATION,
        isDefault: true,
      },
      {
        name: 'Admin Empresa',
        reference: $Enums.RoleReferences.ADMIN_COMPANY,
        isDefault: true,
      },
      {
        name: 'Cliente',
        reference: $Enums.RoleReferences.CLIENT,
        isDefault: true,
      },
    ],
  });
}

async function createRolesAbilities(): Promise<void> {
  const abilities = await prisma.ability.findMany({
    select: { id: true, code: true, action: true },
  });

  const organizationAbilities = abilities.filter((ability) => {
    if (ability.code === $Enums.AbilityCodes.ADMIN) return;
    if (ability.code === $Enums.AbilityCodes.ORGANIZATIONS) {
      if (ability.action === $Enums.AbilityActions.CREATE) return;
      if (ability.action === $Enums.AbilityActions.DELETE) return;
    }
    return true;
  });

  const companyAbilities = abilities.filter(
    (ability) =>
      ability.code !== $Enums.AbilityCodes.ADMIN &&
      ability.code !== $Enums.AbilityCodes.ORGANIZATIONS &&
      ability.code !== $Enums.AbilityCodes.ROLES,
  );

  const clientAbilities = abilities.filter(
    (ability) =>
      ability.code !== $Enums.AbilityCodes.ADMIN &&
      ability.code !== $Enums.AbilityCodes.COMPANIES &&
      ability.code !== $Enums.AbilityCodes.ROLES &&
      ability.code !== $Enums.AbilityCodes.USERS,
  );

  // Admin
  await prisma.roleAbility.createMany({
    data: [
      {
        roleId: 1,
      },
    ].flatMap((data) =>
      abilities.map(({ id }) => ({
        ...data,
        abilityId: id,
      })),
    ),
  });

  // Admin Organization
  await prisma.roleAbility.createMany({
    data: [
      {
        roleId: 2,
      },
    ].flatMap((data) =>
      organizationAbilities.map(({ id }) => ({
        ...data,
        abilityId: id,
      })),
    ),
  });

  // Admin Company
  await prisma.roleAbility.createMany({
    data: [
      {
        roleId: 3,
      },
    ].flatMap((data) =>
      companyAbilities.map(({ id }) => ({
        ...data,
        abilityId: id,
      })),
    ),
  });

  // Client
  await prisma.roleAbility.createMany({
    data: [
      {
        roleId: 4,
      },
    ].flatMap((data) =>
      clientAbilities.map(({ id }) => ({
        ...data,
        abilityId: id,
      })),
    ),
  });
}

async function createUser(): Promise<void> {
  await prisma.user.create({
    data: {
      name: String(process.env.ADMIN_NAME),
      email: String(process.env.ADMIN_EMAIL),
      password: await hash(String(process.env.ADMIN_PASSWORD), 10),
      gender: $Enums.Gender.M,
      phone: '',
      status: $Enums.Status.ACTIVE,
      role: {
        connect: {
          id: 1,
        },
      },
    },
  });
}

async function execute(): Promise<void> {
  try {
    await createAbilities();
    await createRoles();
    await createRolesAbilities();
    await createUser();
  } catch (e) {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

execute();
