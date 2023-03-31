from django.db import models

from utils.models import BaseModel


class StateModel(BaseModel):
    title = models.CharField(verbose_name='State', max_length=64, null=False, blank=False)

    class Meta:
        verbose_name = 'State'
        verbose_name_plural = 'States'
        
    def __str__(self):
        return self.title
