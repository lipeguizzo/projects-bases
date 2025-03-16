from django.db.models import Q
from src.shared.types.user_request import UserRequest
from src.modules.role.models import Role, RoleAbility, Ability
from src.modules.role.domain.dto.role_update_dto import (
    RoleUpdateDTO,
)
from src.modules.role.validators.role_default_validator import (
    role_default_validator,
)
from src.shared.exceptions.conflict_exception import ConflictException
from src.shared.exceptions.not_found_exception import NotFoundException


class RoleUpdateService:
    @classmethod
    def execute(self, id: int, dto: RoleUpdateDTO, user_request: UserRequest):

        role = Role.objects.filter(
            Q(id=id)
            & Q(deleted_at=None)
            & (
                Q(organization__id=user_request.organization.id)
                if user_request.organization
                else Q()
            )
            & (Q(company__id=user_request.company.id) if user_request.company else Q())
        ).first()

        if role is None:
            raise NotFoundException("Perfil não encontrado!")

        role_default_validator(role)

        existing_role = Role.objects.filter(
            ~Q(id=id) & (Q(name=dto.name)) & Q(deleted_at=None)
        ).first()

        if existing_role is not None:
            raise ConflictException("Perfil já cadastrado!")

        if dto.name is not None:
            role.name = dto.name
        if dto.is_default is not None:
            role.is_default = dto.is_default
        if dto.reference is not None:
            role.reference = dto.reference
        if dto.status is not None:
            role.status = dto.status

        if dto.abilities_ids is not None:
            RoleAbility.objects.filter(role__id=id).delete()

            abilities = Ability.objects.filter(id__in=dto.abilities_ids)

            role_abilities = [
                RoleAbility(role_id=role.id, ability=ability) for ability in abilities
            ]

            RoleAbility.objects.bulk_create(role_abilities)

        role.save()

        return role
