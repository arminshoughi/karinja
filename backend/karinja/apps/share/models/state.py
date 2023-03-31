from django.db import models

from utils.models import BaseModel


class StateModel(BaseModel):
    title = models.CharField(verbose_name='State', max_length=64, null=False, blank=False)

    def __str__(self):
        return self.title
