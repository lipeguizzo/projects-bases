from django.db.models import Q
from src.modules.role.domain.dto.role_find_many_dto import (
    RoleFindManyDTO,
)
from src.modules.role.models import Role
from src.shared.types.user_request import UserRequest
from src.shared.utils.generate_pagination_metadata import generate_pagination_meta
from src.modules.role.helpers.role_reference_permission_helper import (
    role_reference_permission,
)


class RoleFindManyService:
    @classmethod
    def execute(self, dto: RoleFindManyDTO, user_request: UserRequest):

        [roles, total_roles] = self.find_roles(dto, user_request)

        return {
            "data": roles,
            "meta": generate_pagination_meta(
                "/roles",
                total_roles,
                dto["page"],
                dto["page_size"],
                dto,
            ),
        }

    @classmethod
    def find_roles(self, params: RoleFindManyDTO, user_request: UserRequest):
        dynamic_where = self.generate_dynamic_where(params, user_request)
        order_by = self.format_order_by_column(params)

        skip = (params["page"] - 1) * params["page_size"]
        take = params["page_size"]

        roles = Role.objects.filter(dynamic_where).order_by(order_by)[
            skip : skip + take
        ]

        return [roles, len(roles)]

    @classmethod
    def generate_dynamic_where(
        self, params: RoleFindManyDTO, user_request: UserRequest
    ):

        dynamic_where = Q()

        if user_request.organization:
            dynamic_where |= Q(
                organization__id=user_request.organization.id, is_default=False
            )

        if user_request.company:
            dynamic_where |= Q(company__id=user_request.company.id, is_default=False)

        role_permissions = role_reference_permission(user_request)

        if role_permissions:
            dynamic_where |= Q(reference__in=role_permissions)

        if params.get("search"):
            dynamic_where &= Q(name__icontains=params["search"])

        if params.get("name"):
            dynamic_where &= Q(name__icontains=params["name"])

        if params.get("is_default"):
            dynamic_where &= Q(is_default=params["is_default"])

        if params.get("reference"):
            dynamic_where &= Q(reference=params["reference"])

        if params.get("organization_id"):
            dynamic_where &= Q(organization__id=params["organization_id"])

        if params.get("company_id"):
            dynamic_where &= Q(company__id=params["company_id"])

        if params.get("status") and len(params["status"]) > 0:
            dynamic_where &= Q(status__in=params["status"])

        if params.get("include_deleted"):
            if params["include_deleted"] == True:
                dynamic_where &= Q(deleted_at__isnull=True) | Q(
                    deleted_at__isnull=False
                )
            else:
                dynamic_where &= Q(deleted_at__isnull=False)
        else:
            dynamic_where &= Q(deleted_at__isnull=True)

        return dynamic_where

    @classmethod
    def format_order_by_column(self, params: RoleFindManyDTO):
        order_by = params.get("order_by", None)
        ordering = params.get("ordering", None)

        if order_by is None:
            return "id" if ordering == "asc" else "-id"

        return order_by if ordering == "asc" else f"-{order_by}"
