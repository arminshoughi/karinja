from django.contrib.auth import get_user_model

from apps.share.consts import UserTypeChoices
from utils.service import BaseService

UserModel = get_user_model()


class UserService(BaseService):
    model = UserModel

    @classmethod
    def create_user(cls, username, password, **kwargs):
        user = cls.model(username=username, **kwargs)
        user.set_password(password)
        user.save()
        return user

    @classmethod
    def create_employee(cls, username, password, **kwargs):
        kwargs.update({
            'typ': UserTypeChoices.EMPLOYEE.value,
            'is_superuser': False,
            'is_active': True
        })
        return cls.create_user(username, password, **kwargs)

    @classmethod
    def create_company(cls, username, password, **kwargs):
        kwargs.update({
            'typ': UserTypeChoices.COMPANY.value,
            'is_superuser': False,
            'is_active': True
        })
        return cls.create_user(username, password, **kwargs)
