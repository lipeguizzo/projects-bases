from ninja import NinjaAPI
from src.shared.guards.auth_guard import AuthGuard
from src.infra.api.exceptions import exception_handler
from src.modules.authentication.controllers.auth_controller import router as auth_router
from src.modules.organization.controllers.organization_controller import (
    router as organization_router,
)
from src.modules.company.controllers.company_controller import (
    router as company_router,
)
from src.modules.role.controllers.role_controller import (
    router as role_router,
)
from src.modules.user.controllers.user_controller import (
    router as user_router,
)
from src.modules.stored_file.controllers.stored_file_controller import (
    router as stored_file_router,
)


api = NinjaAPI(
    title="Project Basic API",
    version="1.0.0",
    description="API documentation.",
    auth=[AuthGuard()],
)


@api.exception_handler(Exception)
def global_exception_handler(request, exc):
    return exception_handler(request, exc)


api.add_router("/auth", auth_router)
api.add_router("/organizations", organization_router)
api.add_router("/companies", company_router)
api.add_router("/roles", role_router)
api.add_router("/users", user_router)
api.add_router("/files", stored_file_router)
