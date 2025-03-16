import os
from typing import TypeVar
from pybars import Compiler
from email.mime.image import MIMEImage
from django.core.mail import EmailMultiAlternatives
from src.modules.mail.domain.interfaces.mail_option_interface import IMailOption
from src.modules.mail.domain.interfaces.attachment_interface import IAttachment
from src.modules.mail.domain.enums.mail_template_enum import EmailTemplate

T = TypeVar("T")


class MailService:

    @classmethod
    def send(self, options: IMailOption[T]):
        from_email = os.getenv("MAIL_DEFAULT", "")
        subject = options["subject"]
        to = options["to"]
        template = options["template"]
        context = options["context"]
        attachments = options.get("attachments", [])

        default_attachments: list[IAttachment] = [
            {
                "filename": "facebook.png",
                "path": "public/templates/assets/icons/facebook.png",
                "cid": "facebook",
                "contentType": "image/png",
            },
            {
                "filename": "instagram.png",
                "path": "public/templates/assets/icons/instagram.png",
                "cid": "instagram",
                "contentType": "image/png",
            },
            {
                "filename": "whatsapp.png",
                "path": "public/templates/assets/icons/whatsapp.png",
                "cid": "whatsapp",
                "contentType": "image/png",
            },
        ]

        email_content = self.render_handlebars_template(template, context)

        email = EmailMultiAlternatives(subject, "", from_email, [to])
        email.attach_alternative(email_content, "text/html")

        all_attachments = default_attachments + (attachments or [])

        self.load_attachments(all_attachments, email)

        email.send()

    @classmethod
    def render_handlebars_template(self, template: EmailTemplate, context: T):
        template_path = "public/templates/views/" + template + ".hbs"

        with open(template_path, "r", encoding="utf-8") as f:
            main_template_content = f.read().strip()

        compiler = Compiler()

        partial_names = ["header", "button", "footer"]
        partials = {name: self.load_partial(name, compiler) for name in partial_names}

        compiled_template = compiler.compile(main_template_content)

        return compiled_template(context, partials=partials)

    @classmethod
    def load_partial(self, name: str, compiler: Compiler):
        partial_path = f"public/templates/partials/{name}.hbs"
        with open(partial_path, "r", encoding="utf-8") as file:
            content = file.read().strip()
            return compiler.compile(content)

    @classmethod
    def load_attachments(
        self, attachments: list[IAttachment], email: EmailMultiAlternatives
    ):
        for attachment in attachments:
            if not os.path.exists(attachment["path"]):
                continue
            with open(attachment["path"], "rb") as f:
                mime_image = MIMEImage(
                    f.read(), _subtype=attachment["contentType"].split("/")[-1]
                )
                mime_image.add_header("Content-ID", f"<{attachment['cid']}>")
                mime_image.add_header(
                    "Content-Disposition", "inline", filename=attachment["filename"]
                )
                email.attach(mime_image)
