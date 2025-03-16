import os
from django.db.models import Q
from src.modules.authentication.domain.dto.auth_register_dto import AuthRegisterDTO
from src.modules.user.models import User
from src.modules.role.models import Role
from src.modules.organization.models import Organization
from src.modules.address.models import Address
from src.shared.exceptions.conflict_exception import ConflictException
from src.shared.utils.hash import hash
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.domain.enums.status_enum import Status
from src.modules.mail.services.mail_service import MailService
from src.modules.mail.domain.enums.mail_template_enum import EmailTemplate
from src.modules.mail.domain.interfaces.mail_option_interface import IMailOption
from src.modules.authentication.domain.interfaces.auth_recover_password_interface import (
    IAuthRecoverPassword,
)

from src.modules.user.validators.user_password_validator import user_password_validator


class AuthRegisterService:
    def execute(dto: AuthRegisterDTO):
        is_admin_organization = dto.reference == RoleReferences.ADMIN_ORGANIZATION

        user = User.objects.filter(
            (Q(name=dto.name) | Q(email=dto.email)) & Q(deleted_at=None)
        ).first()

        if user:
            raise ConflictException("Nome ou e-mail de usuário já cadastrado!")

        if is_admin_organization:

            organization = Organization.objects.filter(
                (Q(name=dto.organization_name) | Q(email=dto.organization_email))
                & Q(deleted_at=None)
            ).first()

            if organization:
                raise ConflictException("Nome ou e-mail da organização já cadastrado!")

        user_password_validator(dto.password)

        createdUser = User.objects.create(
            name=dto.name,
            email=dto.email,
            gender=dto.gender,
            phone=dto.phone,
            status=Status.WAITING if is_admin_organization else Status.ACTIVE,
            password=hash(dto.password),
            role=Role.objects.get(id=2 if is_admin_organization else 4),
            organization=(
                Organization.objects.create(
                    name=dto.organization_name,
                    trade_name=dto.organization_trade_name,
                    email=dto.organization_email,
                    status=Status.WAITING,
                    address=Address.objects.create(
                        state=dto.address.state,
                        city=dto.address.city,
                        street=dto.address.street,
                        neighborhood=dto.address.neighborhood,
                        complement=dto.address.complement,
                    ),
                )
                if is_admin_organization
                else None
            ),
        )

        if is_admin_organization:
            context: IAuthRecoverPassword = {
                "name": createdUser.organization.name,
                "url": os.getenv("FRONT_END_URL", ""),
            }
            options: IMailOption = {
                "to": os.getenv("ADMIN_EMAIL", ""),
                "subject": "Cadastro de organização:",
                "template": EmailTemplate.ORGANIZATION_ACTIVATION,
                "context": context,
            }
            MailService.send(options=options)

        return createdUser
