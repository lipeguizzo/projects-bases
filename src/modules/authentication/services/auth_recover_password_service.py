import os
from src.modules.authentication.domain.dto.auth_recover_password_dto import (
    AuthRecoverPasswordDTO,
)
from src.modules.user.models import User
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.services.token_sign_service import TokenSignService
from src.shared.domain.enums.period_expiration_enum import PeriodExpiration
from src.modules.mail.services.mail_service import MailService
from src.modules.mail.domain.enums.mail_template_enum import EmailTemplate
from src.modules.mail.domain.interfaces.mail_option_interface import IMailOption
from src.modules.authentication.domain.interfaces.auth_recover_password_interface import (
    IAuthRecoverPassword,
)


class AuthRecoverPasswordService:
    def execute(dto: AuthRecoverPasswordDTO):
        user = User.objects.filter(email=dto.email, deleted_at=None).first()

        if user is None:
            raise NotFoundException("E-mail incorreto!")

        token = TokenSignService.execute(
            user=user, time=10, period=PeriodExpiration.MINUTE
        )
        url = (
            f'{os.getenv("FRONT_END_URL", "")}/recuperar-senha/nova-senha?token={token}'
        )

        context: IAuthRecoverPassword = {"name": user.name, "url": url}
        options: IMailOption = {
            "to": user.email,
            "subject": "Recuperação de Senha:",
            "template": EmailTemplate.RECOVER_PASSWORD,
            "context": context,
        }
        MailService.send(options=options)

        return {"message": "E-mail enviado com sucesso!"}
