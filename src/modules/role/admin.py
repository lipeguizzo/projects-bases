from django.contrib import admin
from .models import Role, RoleAbility, Ability

admin.site.register(Role)
admin.site.register(Ability)
admin.site.register(RoleAbility)
