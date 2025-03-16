from django.db.models import Q
from django.utils import timezone
from src.shared.types.user_request import UserRequest
from src.modules.role.models import Role, RoleAbility
from src.shared.exceptions.not_found_exception import NotFoundException
from src.modules.role.validators.role_delete_validator import (
    role_delete_validator,
)
from src.modules.role.validators.role_default_validator import (
    role_default_validator,
)
from src.modules.role.validators.role_reference_validator import (
    role_reference_validator,
)


class RoleDeleteService:
    @classmethod
    def execute(self, id: int, user_request: UserRequest):

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

        role_reference_validator(role.reference, user_request)

        role_delete_validator(id)

        role.deleted_at = timezone.now()
        role.save()

        RoleAbility.objects.filter(role__id=id).delete()

        return role
