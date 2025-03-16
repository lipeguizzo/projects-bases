from functools import wraps
from django.http import HttpRequest
from src.modules.role.domain.enums.ability_codes_enum import AbilityCodes
from src.modules.role.domain.enums.ability_actions_enum import AbilityActions

ABILITIES_KEY = "ABILITIES"


def require_abilities(code: AbilityCodes, action: AbilityActions):
    def decorator(func):
        @wraps(func)
        def wrapper(request: HttpRequest, *args, **kwargs):
            request.META[ABILITIES_KEY] = {"code": code, "action": action}
            return func(request, *args, **kwargs)

        return wrapper

    return decorator
