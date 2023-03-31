from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet

from apps.job.permissions import IsCompany
from apps.job.serializers import JobModelBaseSerializer
from apps.job.services import JobService
from utils.viewsets import UserRelatedDataRestricted


class JobModelViewSet(ModelViewSet, UserRelatedDataRestricted):
    queryset = JobService.all()
    serializer_class = JobModelBaseSerializer
    permission_classes = [IsCompany]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['typ', 'sex', 'city', 'city__state', 'military_status']
    search_fields = ['title', 'skills']

