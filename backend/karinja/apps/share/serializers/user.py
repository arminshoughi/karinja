from django.contrib.auth import get_user_model

from utils.serializers import DynamicFieldsModelSerializer
from .. import services

User = get_user_model()


class UserBaseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        service = services.UserService
        fields = [
            "id",
            'username',
            'password',
            'about',
            'avatar',
            'banner',
            'address',
            'typ',
        ]
        extra_kwargs = {
            'typ': {'read_only': True},
            'password': {'write_only': True}
        }


class EmployeeSerializer(UserBaseSerializer):
    class Meta(UserBaseSerializer.Meta):
        fields = UserBaseSerializer.Meta.fields + [
            'first_name',
            'last_name',
            'old',
            'education_degree',
            'national_code',
            'mobile',
            'skills',
            'experiences',
            'educations',
            'languages',
            'birthday',
            'sex',
        ]
        required_fields = (
            'first_name',
            'last_name',
            'old',
            'education_degree',
            'national_code',
        )


class CompanySerializer(UserBaseSerializer):
    class Meta(UserBaseSerializer.Meta):
        fields = UserBaseSerializer.Meta.fields + [
            'name_en',
            'name_fa',
            'website',
            'establishment',
            'count_type',
        ]
        required_fields = (
            'name_fa',
            'establishment',
            'count_type',
        )


class UserRegisterSerializer(UserBaseSerializer):
    class Meta:
        model = User
        service = services.UserService
        exclude = [
            'updated_at', 'created_at', 'last_login', 'is_active', 'is_superuser', 'is_deleted',
            'deleted_at',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
