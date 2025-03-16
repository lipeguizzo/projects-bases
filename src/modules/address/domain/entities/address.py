from django.db import models


class Address(models.Model):
    id = models.AutoField(primary_key=True)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    street = models.CharField(max_length=255)
    neighborhood = models.CharField(max_length=100)
    complement = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "addresses"

    def __str__(self):
        return f"{self.street}, {self.neighborhood}, {self.city} - {self.state}"
