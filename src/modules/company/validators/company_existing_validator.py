from src.modules.company.models import Company
from src.shared.exceptions.not_found_exception import NotFoundException


def company_existing_validator(company_id: int):

    company = Company.objects.filter(id=company_id, deleted_at=None).first()

    if company is None:
        raise NotFoundException("Empresa não encontrada!")
