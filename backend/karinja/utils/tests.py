import logging
from io import StringIO
from unittest import TestCase

from django.core.management import call_command
from rest_framework import status
from rest_framework.test import APIClient

from karinja.celery import app
from apps.share.services import UserService


class BaseTestMixin(TestCase):
    def setUp(self):
        # Create an admin user
        self.admin = UserService.create_user(username='admin', password='1234')
        self.employee = UserService.create_employee(username='shakiba', password='1234')
        self.company = UserService.create_company(username='newsha', password='1234')

        self.client = APIClient()

        # Reduce the log level to avoid errors like 'not found'
        logger = logging.getLogger("django.request")
        self.previous_level = logger.getEffectiveLevel()
        logger.setLevel(logging.ERROR)

    def tearDown(self) -> None:
        # Reset the log level back to normal"
        logger = logging.getLogger("django.request")
        logger.setLevel(self.previous_level)

    def authenticate(self, user=None):
        user = self.admin if user is None else user
        self.client.login(username=user.username, password=user.username)

    @staticmethod
    def call_command(command, *args, **kwargs):
        out = StringIO()
        call_command(command, stdout=out, stderr=StringIO(), *args, **kwargs)
        return out.getvalue()

    @staticmethod
    def disable_celery():
        app.conf.update(CELERY_ALWAYS_EAGER=True)


class CrudTestMixin(BaseTestMixin):
    creating_data_valid = {}
    creating_data_invalid = {}
    updating_data_valid = {}
    updating_data_invalid = {}
    service = None
    base_url = None

    def create_obj(self):
        return self.service.create(**self.creating_data_valid)

    def validate_response(self, response, field_value_dict):
        for item in field_value_dict:
            self.assertEqual(response.get(item.key, None), field_value_dict.get(item.key, None))

    def test_create_successfully(self):
        res = self.client.post(path=self.base_url, data=self.creating_data_valid, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.validate_response(res.json(), self.creating_data_valid)

    def test_create_failed(self):
        res = self.client.post(path=self.base_url, data=self.creating_data_invalid, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_successfully(self):
        obj = self.create_obj()
        url = f'{self.base_url}{obj.id}/'
        res = self.client.put(path=url, data=self.updating_data_valid, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.validate_response(res.json(), self.updating_data_valid)

    def test_update_failed(self):
        obj = self.create_obj()
        url = f'{self.base_url}{obj.id}/'
        res = self.client.put(path=url, data=self.updating_data_invalid, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_successfully(self):
        obj = self.create_obj()
        url = f'{self.base_url}{obj.id}/'
        res = self.client.delete(path=url)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_failed(self):
        url = f'{self.base_url}99999999/'  # '99999999' is random id which does not exists
        res = self.client.delete(path=url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
