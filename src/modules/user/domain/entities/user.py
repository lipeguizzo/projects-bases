from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from src.shared.domain.enums.status_enum import Status
from src.modules.organization.domain.entities.organization import Organization
from src.modules.company.domain.entities.company import Company
from src.modules.role.domain.entities.role import Role
from src.modules.stored_file.domain.entities.stored_file import StoredFile
from src.modules.user.domain.enums.user_gender_enum import UserGender
from src.shared.utils.hash import hash, check


class UserManager(BaseUserManager):
    def create_user(self, name, email, password, role=4, **extra_fields):
        role = Role.objects.get(id=role)

        user = self.model(
            name=name,
            email=email,
            password=hash(password),
            gender=UserGender.M,
            phone="",
            status=Status.ACTIVE,
            role=role,
            **extra_fields,
        )

        user.save(using=self._db)
        return user

    def create_superuser(self, name, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(name, email, password, 1, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    gender = models.CharField(max_length=10, choices=UserGender.choices)
    phone = models.CharField(max_length=15)
    status = models.CharField(max_length=10, choices=Status.choices)
    organization = models.ForeignKey(
        Organization, on_delete=models.SET_NULL, null=True, blank=True
    )
    company = models.ForeignKey(
        Company, on_delete=models.SET_NULL, null=True, blank=True
    )
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    avatar = models.ForeignKey(
        StoredFile, on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = UserManager()

    class Meta:
        db_table = "users"

    def check_password(self, password):
        return check(password, self.password)

    def __str__(self):
        return self.name
