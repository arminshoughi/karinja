from rest_framework.viewsets import ModelViewSet

from apps.job.permissions import IsCompany
from apps.job.serializers import JobModelBaseSerializer
from apps.job.services import JobService
from utils.viewsets import UserRelatedDataRestricted


class JobModelViewSet(ModelViewSet, UserRelatedDataRestricted):
    queryset = JobService.all()
    serializer_class = JobModelBaseSerializer
    permission_classes = [IsCompany]
