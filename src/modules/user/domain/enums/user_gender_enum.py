from enum import Enum


class UserGender(str, Enum):
    M = "M"
    F = "F"
    O = "O"

    @classmethod
    def choices(cls):
        return [(tag, tag.value) for tag in cls]

    @classmethod
    def values(cls):
        return [tag.value for tag in cls]
