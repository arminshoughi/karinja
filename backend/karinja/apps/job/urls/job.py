from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.job.views import JobModelViewSet

router = DefaultRouter()
router.register('', JobModelViewSet, basename='job')

urlpatterns = [
    path(r'', include(router.urls)),
]
