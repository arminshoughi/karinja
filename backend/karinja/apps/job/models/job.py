from django.contrib.auth import get_user_model
from django.db import models

from apps.job.consts import CooperationTypeChoices, MilitaryStatusTypeChoices
from apps.share.consts.users import SexTypeChoices
from apps.share.models import CityModel
from utils.models import BaseModel

User = get_user_model()


class JobCategoryModel(BaseModel):
    title = models.CharField(verbose_name='Title', max_length=256, null=False, blank=False)

    def __str__(self):
        return self.title


class JobModel(BaseModel):
    company = models.ForeignKey(verbose_name='Company', to=User, on_delete=models.CASCADE, null=False, blank=False)
    title = models.CharField(verbose_name='Title', max_length=256, null=False, blank=False)
    description = models.TextField(verbose_name='Description', null=True, blank=True)
    category = models.ForeignKey(
        verbose_name='Categories', to=JobCategoryModel, on_delete=models.CASCADE, null=False, blank=False
    )
    city = models.ForeignKey(verbose_name='City', to=CityModel, on_delete=models.PROTECT, null=True, blank=True)
    typ = models.IntegerField(
        verbose_name='Type of cooperation', choices=CooperationTypeChoices.choices,
        default=CooperationTypeChoices.FULL_TIME.value
    )
    salary = models.IntegerField(verbose_name='Salary', null=True, blank=True)  # If null we consider as an agreement
    skills = models.TextField(verbose_name='Skills', null=True, blank=True)
    educations = models.TextField(verbose_name='Educations', null=True, blank=True)
    about = models.TextField(verbose_name='About', null=True, blank=True)
    sex = models.IntegerField(
        verbose_name='Sex', choices=SexTypeChoices.choices, default=SexTypeChoices.MALE.value, null=True, blank=True
    )
    military_status = models.IntegerField(
        verbose_name='Military Status', choices=MilitaryStatusTypeChoices.choices,
        default=MilitaryStatusTypeChoices.NO_MATTER.value
    )

    class Meta:
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'

    def __str__(self):
        return self.title
