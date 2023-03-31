from django.contrib import admin

from utils.admin import BaseModelAdmin

from .. import models


@admin.register(models.StateModel)
class CityModelAdmin(BaseModelAdmin):
    list_per_page = 20
    search_fields = ('title',)
    list_display = ('id', 'title')


@admin.register(models.CityModel)
class CityModelAdmin(BaseModelAdmin):
    list_per_page = 20
    search_fields = ('title',)
    list_display = ('id', 'state', 'title')
    list_filter = ('state',)
