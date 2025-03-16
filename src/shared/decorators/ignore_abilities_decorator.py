from functools import wraps
from django.http import HttpRequest

IGNORE_ABILITIES_KEY = "IGNORE_ABILITIES"


def ignore_abilities(func):
    @wraps(func)
    def wrapper(request: HttpRequest, *args, **kwargs):
        request.META[IGNORE_ABILITIES_KEY] = "true"
        return func(request, *args, **kwargs)

    return wrapper
