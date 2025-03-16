from django.db import models

from src.modules.role.domain.entities.role import Role
from src.modules.role.domain.entities.ability import Ability


class RoleAbility(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    ability = models.ForeignKey(Ability, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "role_abilities"
        unique_together = ("role", "ability")
