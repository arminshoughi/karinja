from django.contrib import admin

from utils.admin import BaseModelAdmin

from .. import models


@admin.register(models.MessagesModel)
class MessageModelAdmin(BaseModelAdmin):
    list_per_page = 20
    list_display = ('sender', 'receiver', 'sender', 'created_at')
