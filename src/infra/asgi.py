import os

from infra.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "infra.settings")

application = get_asgi_application()
