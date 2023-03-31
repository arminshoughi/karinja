from django.contrib import admin

from utils.admin import BaseModelAdmin

from .. import models


@admin.register(models.JobCategoryModel)
class AccountModelAdmin(BaseModelAdmin):
    list_per_page = 20
    search_fields = ('title',)
    list_display = ('title', 'created_at')


@admin.register(models.JobModel)
class AccountModelAdmin(BaseModelAdmin):
    list_per_page = 20
    search_fields = ('title',)
    list_display = ('company', 'title', 'category', 'city', 'typ', 'salary')
    list_filter = ('category', 'city', 'typ', 'sex', 'military_status')
