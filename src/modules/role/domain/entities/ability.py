from django.db import models

from src.modules.role.domain.enums.ability_codes_enum import AbilityCodes
from src.modules.role.domain.enums.ability_actions_enum import AbilityActions


class Ability(models.Model):
    id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=50, choices=AbilityCodes.choices)
    action = models.CharField(max_length=50, choices=AbilityActions.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "abilities"

    def __str__(self):
        return f"{self.code} - {self.action}"
