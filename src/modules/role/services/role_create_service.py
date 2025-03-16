from django.db.models import Q
from src.shared.types.user_request import UserRequest
from src.modules.organization.models import Organization
from src.modules.company.models import Company
from src.modules.role.models import Role, RoleAbility, Ability
from src.modules.role.domain.dto.role_create_dto import (
    RoleCreateDTO,
)
from src.shared.exceptions.conflict_exception import ConflictException
from src.modules.role.validators.role_reference_validator import (
    role_reference_validator,
)
from src.shared.validators.user_organization_validator import (
    user_organization_validator,
)
from src.shared.validators.user_company_validator import (
    user_company_validator,
)


class RoleCreateService:
    @classmethod
    def execute(self, dto: RoleCreateDTO, user_request: UserRequest):

        role = Role.objects.filter(
            Q(name=dto.name)
            & Q(deleted_at=None)
            & (Q(organization__id=dto.organization_id) if dto.organization_id else Q())
            & (Q(company__id=dto.company_id) if dto.company_id else Q())
        ).first()

        if role is not None:
            raise ConflictException("Perfil já cadastrado!")

        if dto.reference is not None:
            role_reference_validator(dto.reference, user_request)

        if dto.organization_id is not None:
            user_organization_validator(dto.organization_id, user_request)

        if dto.company_id is not None:
            user_company_validator(dto.company_id, user_request)

        created_role = Role.objects.create(
            name=dto.name,
            is_default=dto.is_default,
            reference=dto.reference,
            status=dto.status,
            organization=(
                Organization.objects.get(id=dto.organization_id)
                if dto.organization_id
                else None
            ),
            company=Company.objects.get(id=dto.company_id) if dto.company_id else None,
        )

        if dto.abilities_ids is not None:
            abilities = Ability.objects.filter(id__in=dto.abilities_ids)

            role_abilities = [
                RoleAbility(role_id=role.id, ability=ability) for ability in abilities
            ]

            RoleAbility.objects.bulk_create(role_abilities)

        return created_role
