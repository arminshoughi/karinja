from .base import *

ALLOWED_HOSTS = ['*']

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": 'karinja_db',
        "USER": 'karinja_user',
        "PASSWORD": 'karinja_password@',
        "HOST": 'localhost',
        "PORT": '5432',
    }
}

DEBUG = True
