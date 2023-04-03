from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.job.views import JobListViewSet, EmployeeJobModelViewSet, CompanyJobModelViewSet, JobCategoryListViewSet

router = DefaultRouter()
router.register('company', CompanyJobModelViewSet, basename='company_jobs')
router.register('employee', EmployeeJobModelViewSet, basename='employee_jobs')
router.register('category', JobCategoryListViewSet, basename='categories')
router.register('', JobListViewSet, basename='jobs')

urlpatterns = [
    path(r'', include(router.urls)),
]
