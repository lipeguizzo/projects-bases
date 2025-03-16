from enum import Enum


class AbilityCodes(str, Enum):
    ADMIN = "ADMIN"
    ORGANIZATIONS = "ORGANIZATIONS"
    COMPANIES = "COMPANIES"
    USERS = "USERS"
    ROLES = "ROLES"

    @classmethod
    def choices(cls):
        return [(tag, tag.value) for tag in cls]

    @classmethod
    def values(cls):
        return [tag.value for tag in cls]
