from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.job import services
from apps.job.models import JobCategoryModel, JobModel, JobApplicationModel
from apps.job.services import JobApplicationService
from apps.share.serializers import CompanySerializer, CityBaseModelSerializer, EmployeeSerializer

from utils.serializers import DynamicFieldsModelSerializer

User = get_user_model()


class JobCategoryBaseModelSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = JobCategoryModel
        service = services.JobCategoryModel
        fields = [
            "id",
            'title',
        ]


class JobModelBaseSerializer(DynamicFieldsModelSerializer):
    company = CompanySerializer(read_only=True)

    city = CityBaseModelSerializer(read_only=True)
    city_id = serializers.IntegerField(write_only=True)

    category = JobCategoryBaseModelSerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = JobModel
        service = services.JobService
        fields = [
            "id",
            'company',
            'category',
            'category_id',
            'title',
            'description',
            'category',
            'city',
            'city_id',
            'typ',
            'salary',
            'skills',
            'educations',
            'about',
            'sex',
            'military_status',
        ]


class JobApplyingBaseSerializer(DynamicFieldsModelSerializer):
    job = JobModelBaseSerializer(read_only=True)
    user = EmployeeSerializer(read_only=True)

    class Meta:
        model = JobApplicationModel
        service = JobApplicationService
        fields = [
            'id',
            'job',
            'user',
            'status',
        ]
        extra_kwargs = {
            'status': {'read_only': True}
        }


class JobApplyingChangeStatusSerializer(DynamicFieldsModelSerializer):
    job = JobModelBaseSerializer(read_only=True)

    class Meta:
        model = JobApplicationModel
        service = JobApplicationService
        fields = [
            'id',
            'job',
            'status',
        ]
