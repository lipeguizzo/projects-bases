from django.db import models

from src.modules.address.domain.entities.address import Address
from src.modules.stored_file.domain.entities.stored_file import StoredFile
from src.shared.domain.enums.status_enum import Status


class Organization(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    trade_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField()
    status = models.CharField(max_length=50, choices=Status.choices())
    address = models.ForeignKey(
        Address, on_delete=models.CASCADE, related_name="organizations"
    )
    avatar = models.ForeignKey(
        StoredFile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="organizations",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "organizations"

    def __str__(self):
        return self.name
