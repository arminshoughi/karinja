from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import mixins, status
from rest_framework import filters
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from apps.job.services import JobService, JobApplicationService, JobCategoryService
from apps.job.permissions import IsCompany, IsEmployee
from apps.job.serializers import JobModelBaseSerializer, JobApplyingBaseSerializer, JobCategoryBaseModelSerializer, \
    JobApplyingChangeStatusSerializer


class JobBaseModelMixin(object):
    queryset = JobService.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['typ', 'sex', 'city', 'city__state', 'military_status']
    search_fields = ['title', 'skills']


class JobListViewSet(JobBaseModelMixin, GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    serializer_class = JobModelBaseSerializer

    @action(url_path='apply', methods=['GET'], detail=True, permission_classes=[IsEmployee])
    def apply(self, request, pk):
        application, _ = JobApplicationService.get_or_create(job=self.get_object(), user=self.request.user)
        serializer = JobApplyingBaseSerializer(application)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class JobCategoryListViewSet(GenericViewSet, mixins.ListModelMixin):
    serializer_class = JobCategoryBaseModelSerializer
    queryset = JobCategoryService.all()
    permission_classes = [IsAuthenticated]
    pagination_class = None


class CompanyJobModelViewSet(JobBaseModelMixin, ModelViewSet):
    permission_classes = [IsCompany]
    serializer_class = JobModelBaseSerializer

    def get_queryset(self):
        return self.queryset.filter(company=self.request.user)

    def perform_create(self, serializer):
        serializer.validated_data['company_id'] = self.request.user.id
        serializer.save()

    def perform_update(self, serializer):
        serializer.validated_data['company_id'] = self.request.user.id
        serializer.save()

    @action(url_path='applications', methods=['GET'], detail=True, permission_classes=[IsCompany])
    def applications(self, request, pk):
        application = JobApplicationService.filter(job=self.get_object())
        serializer = JobApplyingBaseSerializer(application, many=True)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    @action(
        url_path='change_status/(?P<application_id>[0-9]+)', methods=['PUT'], detail=True, permission_classes=[IsCompany],
        serializer_class=JobApplyingChangeStatusSerializer
    )
    def change_status(self, request, pk, application_id):
        application = JobApplicationService.filter(job=self.get_object(), id=application_id).first()
        serializer = JobApplyingChangeStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        application.status = serializer.validated_data.get('status', False)
        application.save()
        return Response(JobApplyingBaseSerializer(application).data, status=status.HTTP_201_CREATED)


class EmployeeJobModelViewSet(
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    JobBaseModelMixin,
    GenericViewSet,
):
    permission_classes = [IsEmployee]
    queryset = JobApplicationService.all()
    serializer_class = JobApplyingBaseSerializer
    filterset_fields = ['job__typ', 'job__sex', 'job__city', 'job__city__state', 'job__military_status']
    search_fields = ['job__title', 'job__skills']

    def get_queryset(self):
        return JobApplicationService.filter(user=self.request.user)
