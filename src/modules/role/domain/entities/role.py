from django.db import models

from src.shared.domain.enums.status_enum import Status
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.modules.organization.domain.entities.organization import Organization
from src.modules.company.domain.entities.company import Company


class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    is_default = models.BooleanField(default=False)
    status = models.CharField(max_length=50, choices=Status.choices)
    reference = models.CharField(max_length=50, choices=RoleReferences.choices)
    organization = models.ForeignKey(
        Organization,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="roles",
    )
    company = models.ForeignKey(
        Company, null=True, blank=True, on_delete=models.SET_NULL, related_name="roles"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "roles"

    def __str__(self):
        return self.name
