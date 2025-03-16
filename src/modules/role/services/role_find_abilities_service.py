from django.db.models import Q
from src.modules.role.models import Role, RoleAbility, Ability
from src.shared.types.user_request import UserRequest
from src.shared.exceptions.not_found_exception import NotFoundException


class RoleFindAbilitiesService:
    @classmethod
    def execute(self, id: int, user_request: UserRequest):

        role = Role.objects.filter(
            Q(id=id, deleted_at=None)
            & (
                (
                    Q(is_default=False)
                    & (
                        Q(organization_id=user_request.organization_id)
                        if user_request and user_request.organization_id
                        else Q()
                    )
                    & (
                        Q(company_id=user_request.company_id)
                        if user_request and user_request.company_id
                        else Q()
                    )
                )
                | Q(is_default=True)
            )
        ).first()

        if role is None:
            raise NotFoundException("Perfil não encontrado!")

        abilities = Ability.objects.filter(
            id__in=RoleAbility.objects.filter(role_id=role.id).values_list(
                "ability", flat=True
            )
        )

        return abilities
