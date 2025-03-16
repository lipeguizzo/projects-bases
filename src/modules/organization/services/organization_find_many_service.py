from django.db.models import Q
from src.modules.organization.domain.dto.organization_find_many_dto import (
    OrganizationFindManyDTO,
)
from src.modules.organization.models import Organization
from src.shared.types.user_request import UserRequest
from src.shared.utils.generate_pagination_metadata import generate_pagination_meta


class OrganizationFindManyService:
    @classmethod
    def execute(self, dto: OrganizationFindManyDTO, user_request: UserRequest):

        [organizations, total_organizations] = self.find_organizations(
            dto, user_request
        )

        return {
            "data": organizations,
            "meta": generate_pagination_meta(
                "/organizations",
                total_organizations,
                dto["page"],
                dto["page_size"],
                dto,
            ),
        }

    @classmethod
    def find_organizations(
        self, params: OrganizationFindManyDTO, user_request: UserRequest
    ):
        dynamic_where = self.generate_dynamic_where(params, user_request)
        order_by = self.format_order_by_column(params)

        skip = (params["page"] - 1) * params["page_size"]
        take = params["page_size"]

        organizations = Organization.objects.filter(dynamic_where).order_by(order_by)[
            skip : skip + take
        ]

        return [organizations, len(organizations)]

    @classmethod
    def generate_dynamic_where(
        self, params: OrganizationFindManyDTO, user_request: UserRequest
    ):
        dynamic_where = Q()

        if user_request.organization:
            dynamic_where &= Q(id=user_request.organization.id)

        if params.get("search"):
            dynamic_where &= (
                Q(name__icontains=params["search"])
                | Q(trade_name__icontains=params["search"])
                | Q(email__icontains=params["search"])
            )

        if params.get("name"):
            dynamic_where &= Q(name__icontains=params["name"])

        if params.get("trade_name"):
            dynamic_where &= Q(trade_name__icontains=params["trade_name"])

        if params.get("email"):
            dynamic_where &= Q(email__icontains=params["email"])

        if params.get("status") and len(params["status"]) > 0:
            dynamic_where &= Q(status__in=params["status"])

        if params.get("state"):
            dynamic_where &= Q(address__state__icontains=params["state"])

        if params.get("city"):
            dynamic_where &= Q(address__city__icontains=params["city"])

        if params.get("street"):
            dynamic_where &= Q(address__street__icontains=params["street"])

        if params.get("neighborhood"):
            dynamic_where &= Q(address__neighborhood__icontains=params["neighborhood"])

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
    def format_order_by_column(self, params: OrganizationFindManyDTO):
        order_by = params.get("order_by", None)
        ordering = params.get("ordering", None)

        if order_by is None:
            return "id" if ordering == "asc" else "-id"

        return order_by if ordering == "asc" else f"-{order_by}"
