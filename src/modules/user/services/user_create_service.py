from django.db.models import Q
from src.shared.types.user_request import UserRequest
from src.modules.user.models import User
from src.modules.organization.models import Organization
from src.modules.company.models import Company
from src.modules.role.models import Role
from src.modules.user.domain.dto.user_create_dto import (
    UserCreateDTO,
)
from src.shared.exceptions.conflict_exception import ConflictException
from src.shared.validators.user_role_validator import (
    user_role_validator,
)
from src.shared.validators.user_organization_validator import (
    user_organization_validator,
)
from src.shared.validators.user_company_validator import (
    user_company_validator,
)
from src.shared.utils.hash import hash
from src.modules.user.validators.user_password_validator import user_password_validator


class UserCreateService:
    @classmethod
    def execute(self, dto: UserCreateDTO, user_request: UserRequest):

        user = User.objects.filter(
            (Q(name=dto.name) | Q(email=dto.email)) & Q(deleted_at=None)
        ).first()

        if user is not None:
            raise ConflictException("Usuário já cadastrado!")

        if dto.role_id is not None:
            user_role_validator(dto.role_id, user_request)

        if dto.organization_id is not None:
            user_organization_validator(dto.organization_id, user_request)

        if dto.company_id is not None:
            user_company_validator(dto.company_id, user_request)

        user_password_validator(dto.password)

        created_user = User.objects.create(
            name=dto.name,
            email=dto.email,
            password=hash(dto.password),
            gender=dto.gender,
            phone=dto.phone,
            status=dto.status,
            role=Role.objects.get(id=dto.role_id) if dto.role_id else None,
            organization=(
                Organization.objects.get(id=dto.organization_id)
                if dto.organization_id
                else None
            ),
            company=Company.objects.get(id=dto.company_id) if dto.company_id else None,
        )

        return created_user
