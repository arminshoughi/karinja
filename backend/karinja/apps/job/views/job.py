from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import mixins
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from apps.job.services import JobService
from utils.viewsets import UserRelatedDataRestricted
from apps.job.permissions import IsCompany, IsEmployee
from apps.job.serializers import JobModelBaseSerializer


class JobBaseModelMixin(object):
    queryset = JobService.all()
    serializer_class = JobModelBaseSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['typ', 'sex', 'city', 'city__state', 'military_status']
    search_fields = ['title', 'skills']


class JobListViewSet(JobBaseModelMixin, GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    pass


class CompanyJobModelViewSet(JobBaseModelMixin, ModelViewSet):
    permission_classes = [IsCompany]

    def get_queryset(self):
        return self.queryset.filter(company=self.request.user)

    def perform_create(self, serializer):
        serializer.validated_data['company_id'] = self.request.user.id
        serializer.save()

    def perform_update(self, serializer):
        serializer.validated_data['company_id'] = self.request.user.id
        serializer.save()


class EmployeeJobModelViewSet(
    ModelViewSet,
    JobBaseModelMixin,
    UserRelatedDataRestricted,
):
    permission_classes = [IsEmployee]
