from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.messenger.views import MessageModelViewSet

router = DefaultRouter()
router.register('', MessageModelViewSet, basename='messages')

urlpatterns = [
    path(r'', include(router.urls)),
]
