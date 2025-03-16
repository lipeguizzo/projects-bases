from enum import Enum


class EmailTemplate(str, Enum):
    DEFAULT = "default"
    RECOVER_PASSWORD = "recover-password"
    ORGANIZATION_ACTIVATION = "organization-activation"

    @classmethod
    def choices(cls):
        return [(tag, tag.value) for tag in cls]

    @classmethod
    def values(cls):
        return [tag.value for tag in cls]
