from django.core import validators
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

from utils.models import BaseModel
from ..consts import SexTypeChoices, UserTypeChoices, EducationTypeChoices, CompanyCountTypeChoices
from ..validators import UsernameValidator, NationalCodeValidator, MobileValidator


class UserManagement(BaseUserManager):
    def create_user(self, username, password, **kwargs):
        user = self.model(username=username, **kwargs)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, username, password):
        return self.create_user(
            username=username, password=password, is_superuser=True, is_active=True
        )


class UserModel(AbstractBaseUser, BaseModel):
    # Real User fields
    first_name = models.CharField(verbose_name='First name', max_length=128, null=True, blank=True)
    last_name = models.CharField(verbose_name='Last name', max_length=256, null=True, blank=True)
    old = models.IntegerField(
        verbose_name='Old', validators=[validators.MinValueValidator(18), validators.MaxValueValidator(65)], null=True,
        blank=True
    )
    education_degree = models.IntegerField(
        verbose_name='Education Degree', choices=EducationTypeChoices.choices,
        default=EducationTypeChoices.ASSOCIATE.value, null=True, blank=True
    )
    national_code = models.CharField(
        verbose_name='National code', max_length=10, validators=[NationalCodeValidator()], null=True, blank=True
    )
    mobile = models.CharField(
        verbose_name='Mobile', max_length=11, validators=[MobileValidator()], null=True, blank=True
    )
    skills = models.TextField(verbose_name='Skills', null=True, blank=True)
    experiences = models.TextField(verbose_name='Experiences', null=True, blank=True)
    educations = models.TextField(verbose_name='Educations', null=True, blank=True)
    languages = models.TextField(verbose_name='Languages', null=True, blank=True)
    birthday = models.DateField(verbose_name='Birthday', null=True, blank=True)
    sex = models.IntegerField(
        verbose_name='Sex', choices=SexTypeChoices.choices, default=SexTypeChoices.MALE.value, null=True, blank=True
    )

    # Legal User fields
    name_en = models.CharField(verbose_name='English name', max_length=128, null=True, blank=True)
    name_fa = models.CharField(verbose_name='Persian name', max_length=128, null=True, blank=True)
    website = models.URLField(verbose_name='Website', null=True, blank=True)
    establishment = models.IntegerField(
        verbose_name='Establishment', null=True, blank=True,
        validators=[validators.MinValueValidator(1300), validators.MaxValueValidator(1403)]
    )
    count_type = models.IntegerField(
        verbose_name='Count type', choices=CompanyCountTypeChoices.choices, null=True, blank=True
    )

    # Shared fields
    username = models.CharField(
        verbose_name='Username', max_length=150, validators=[UsernameValidator()], unique=True,
        error_messages={'unique': 'Sorry, this username already token.'}
    )
    about = models.TextField(verbose_name='About', null=True, blank=True)
    avatar = models.ImageField(verbose_name='Avatar', upload_to='users/avatars/', null=True, blank=True)
    banner = models.ImageField(verbose_name='Banner', upload_to='users/banners/', null=True, blank=True)
    address = models.TextField(verbose_name='Address', null=True, blank=True)

    typ = models.IntegerField(
        verbose_name='Type', choices=UserTypeChoices.choices, default=UserTypeChoices.EMPLOYEE.value
    )
    is_superuser = models.BooleanField(verbose_name='Superuser', default=False)
    is_staff = models.BooleanField(verbose_name='Staff', default=False)
    is_active = models.BooleanField(verbose_name='Active', default=True)
    last_login = models.DateTimeField(verbose_name='Last login', null=True, blank=True)
    updated_at = models.DateTimeField(verbose_name='Last update', null=True, blank=True)
    created_at = models.DateTimeField(verbose_name='Created at', auto_now_add=True)

    objects = UserManagement()
    USERNAME_FIELD = 'username'

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def display_name(self):
        return f'{self.first_name} {self.last_name}'

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    @property
    def is_staff(self):
        return self.is_superuser
