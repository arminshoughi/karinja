from django.db import models

from apps.share.models import StateModel
from utils.models import BaseModel


class CityModel(BaseModel):
    state = models.ForeignKey(verbose_name='State', to=StateModel, on_delete=models.CASCADE, null=False, blank=False)
    title = models.CharField(verbose_name='City', max_length=64, null=False, blank=False)

    def __str__(self):
        return f'{self.state} - {self.title}'
