from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.job.views import JobListViewSet, EmployeeJobModelViewSet, CompanyJobModelViewSet

router = DefaultRouter()
router.register('company', CompanyJobModelViewSet, basename='company_jobs')
router.register('employee', EmployeeJobModelViewSet, basename='employee_jobs')
router.register('', JobListViewSet, basename='jobs')

urlpatterns = [
    path(r'', include(router.urls)),
]
