from functools import wraps
from django.http import HttpRequest

PUBLIC_KEY = "IS_PUBLIC"


def public(func):
    @wraps(func)
    def wrapper(request: HttpRequest, *args, **kwargs):
        request.META[PUBLIC_KEY] = "true"
        return func(request, *args, **kwargs)

    return wrapper
