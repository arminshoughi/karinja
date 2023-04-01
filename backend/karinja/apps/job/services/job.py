from apps.job.models import JobModel, JobCategoryModel, JobApplicationModel
from utils.service import BaseService


class JobService(BaseService):
    model = JobModel


class JobCategoryService(BaseService):
    model = JobCategoryModel


class JobApplicationService(BaseService):
    model = JobApplicationModel

    @classmethod
    def get_user_jobs(cls, user):
        return JobService.filter(application__user=user)
