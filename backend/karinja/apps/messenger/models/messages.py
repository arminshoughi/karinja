from django.contrib.auth import get_user_model
from django.db import models

from utils.models import BaseModel

User = get_user_model()


class MessagesModel(BaseModel):
    sender = models.ForeignKey(
        verbose_name='Sender', to=User, on_delete=models.CASCADE, null=False, blank=False, related_name='sender'
    )
    receiver = models.ForeignKey(
        verbose_name='Receiver', to=User, on_delete=models.CASCADE, null=False, blank=False, related_name='receiver'
    )
    body = models.TextField(verbose_name='message', null=True, blank=True)

    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'

    def __str__(self):
        return f'message from {self.sender}'
