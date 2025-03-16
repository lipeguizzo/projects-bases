from src.modules.organization.models import Organization
from src.shared.exceptions.not_found_exception import NotFoundException


def organization_existing_validator(organization_id: int):

    organization = Organization.objects.filter(
        id=organization_id, deleted_at=None
    ).first()

    if organization is None:
        raise NotFoundException("Organização não encontrada!")
