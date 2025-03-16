from typing import TypedDict, TypeVar
from src.modules.mail.domain.enums.mail_template_enum import EmailTemplate
from src.modules.mail.domain.interfaces.attachment_interface import IAttachment

T = TypeVar("T")


class IMailOption(TypedDict):
    to: str | list[str]
    subject: str
    template: EmailTemplate
    context: T
    attachments: list[IAttachment] | None
