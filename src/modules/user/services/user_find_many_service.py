from django.db.models import Q
from src.modules.user.domain.dto.user_find_many_dto import (
    UserFindManyDTO,
)
from src.modules.user.models import User
from src.shared.types.user_request import UserRequest
from src.shared.utils.generate_pagination_metadata import generate_pagination_meta


class UserFindManyService:
    @classmethod
    def execute(self, dto: UserFindManyDTO, user_request: UserRequest):

        [users, total_users] = self.find_users(dto, user_request)

        return {
            "data": users,
            "meta": generate_pagination_meta(
                "/users",
                total_users,
                dto["page"],
                dto["page_size"],
                dto,
            ),
        }

    @classmethod
    def find_users(self, params: UserFindManyDTO, user_request: UserRequest):
        dynamic_where = self.generate_dynamic_where(params, user_request)
        order_by = self.format_order_by_column(params)

        skip = (params["page"] - 1) * params["page_size"]
        take = params["page_size"]

        users = User.objects.filter(dynamic_where).order_by(order_by)[
            skip : skip + take
        ]

        return [users, len(users)]

    @classmethod
    def generate_dynamic_where(
        self, params: UserFindManyDTO, user_request: UserRequest
    ):

        dynamic_where = Q()

        if user_request.organization:
            dynamic_where &= Q(organization__id=user_request.organization.id)

        if user_request.company:
            dynamic_where &= Q(company__id=user_request.company.id)

        if params.get("search"):
            dynamic_where &= Q(name__icontains=params["search"]) | Q(
                email__icontains=params["search"]
            )

        if params.get("name"):
            dynamic_where &= Q(name__icontains=params["name"])

        if params.get("email"):
            dynamic_where &= Q(email__icontains=params["email"])

        if params.get("gender"):
            dynamic_where &= Q(gender=params["gender"])

        if params.get("role_reference"):
            dynamic_where &= Q(role__reference=params["role_reference"])

        if params.get("role_id"):
            dynamic_where &= Q(role__id=params["role_id"])

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
    def format_order_by_column(self, params: UserFindManyDTO):
        order_by = params.get("order_by", None)
        ordering = params.get("ordering", None)

        if order_by is None:
            return "id" if ordering == "asc" else "-id"

        return order_by if ordering == "asc" else f"-{order_by}"
