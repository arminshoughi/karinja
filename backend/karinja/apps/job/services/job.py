from apps.job.models import JobModel, JobCategoryModel
from utils.service import BaseService


class JobService(BaseService):
    model = JobModel


class JobCategoryService(BaseService):
    model = JobCategoryModel
