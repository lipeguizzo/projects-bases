import os
from django.core.management.base import BaseCommand
from src.modules.user.models import User
from src.modules.user.domain.enums.user_gender_enum import UserGender
from src.modules.role.models import Role, Ability, RoleAbility
from src.modules.role.domain.enums.ability_codes_enum import AbilityCodes
from src.modules.role.domain.enums.ability_actions_enum import AbilityActions
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.domain.enums.status_enum import Status
from src.shared.utils.hash import hash


class Command(BaseCommand):
    help = "Popula os dados iniciais do banco de dados."

    def handle(self, *args, **kwargs):
        if not Ability.objects.exists():
            Ability.objects.bulk_create(
                [
                    Ability(code=code, action=action)
                    for code in AbilityCodes.values()
                    for action in AbilityActions.values()
                ]
            )

            self.stdout.write(self.style.SUCCESS("Habilidades populadas!"))

        if not Role.objects.exists():
            Role.objects.bulk_create(
                [
                    Role(name="Admin", reference=RoleReferences.ADMIN, is_default=True),
                    Role(
                        name="Admin Organização",
                        reference=RoleReferences.ADMIN_ORGANIZATION,
                        is_default=True,
                    ),
                    Role(
                        name="Admin Empresa",
                        reference=RoleReferences.ADMIN_COMPANY,
                        is_default=True,
                    ),
                    Role(
                        name="Cliente", reference=RoleReferences.CLIENT, is_default=True
                    ),
                ]
            )

            self.stdout.write(self.style.SUCCESS("Perfis populados!"))

        if not RoleAbility.objects.exists():
            abilities = list(Ability.objects.values("id", "code", "action"))

            organization_abilities = [
                ability
                for ability in abilities
                if ability["code"] != AbilityCodes.ADMIN
                and not (
                    ability["code"] == AbilityCodes.ORGANIZATIONS
                    and ability["action"]
                    in [AbilityActions.CREATE, AbilityActions.DELETE]
                )
            ]

            company_abilities = [
                ability
                for ability in abilities
                if ability["code"]
                not in [
                    AbilityCodes.ADMIN,
                    AbilityCodes.ORGANIZATIONS,
                    AbilityCodes.ROLES,
                ]
            ]

            client_abilities = [
                ability
                for ability in abilities
                if ability["code"]
                not in [
                    AbilityCodes.ADMIN,
                    AbilityCodes.ORGANIZATIONS,
                    AbilityCodes.COMPANIES,
                    AbilityCodes.USERS,
                    AbilityCodes.ROLES,
                ]
            ]

            roles = {role.id: role.id for role in Role.objects.all()}

            RoleAbility.objects.bulk_create(
                [
                    *[
                        RoleAbility(role_id=roles[1], ability_id=ability["id"])
                        for ability in abilities
                    ],
                    *[
                        RoleAbility(role_id=roles[2], ability_id=ability["id"])
                        for ability in organization_abilities
                    ],
                    *[
                        RoleAbility(role_id=roles[3], ability_id=ability["id"])
                        for ability in company_abilities
                    ],
                    *[
                        RoleAbility(role_id=roles[4], ability_id=ability["id"])
                        for ability in client_abilities
                    ],
                ]
            )

            self.stdout.write(self.style.SUCCESS("Habilidade dos perfis populadas!"))

        if not User.objects.exists():
            role = Role.objects.get(id=1)

            User.objects.bulk_create(
                [
                    User(
                        name=os.getenv("ADMIN_NAME", ""),
                        email=os.getenv("ADMIN_EMAIL", ""),
                        password=hash(os.getenv("ADMIN_PASSWORD", "")),
                        gender=UserGender.M,
                        phone="",
                        status=Status.ACTIVE,
                        role=role,
                        is_active=True,
                        is_staff=True,
                        is_superuser=True,
                    ),
                ]
            )

            self.stdout.write(self.style.SUCCESS("Usuários populados!"))
