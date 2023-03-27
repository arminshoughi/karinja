from django.db import models


class SexTypeChoices(models.IntegerChoices):
    MALE = 1, 'Male'
    FEMALE = 2, 'Female'


class UserTypeChoices(models.IntegerChoices):
    EMPLOYEE = 1, 'Employee'
    COMPANY = 2, 'Company'


class EducationTypeChoices(models.IntegerChoices):
    ASSOCIATE = 1, 'Associate'
    BACHELOR = 2, 'Bachelor'
    MASTER = 3, 'Master'
    DOCTORAL = 4, 'Doctoral'


class CompanyCountTypeChoices(models.IntegerChoices):
    VERY_SMALL = 1, '1-10'
    SMALL = 2, '10-50'
    MEDIUM = 3, '50-200'
    LARGE = 4, '200-1000'
    VERY_LARGE = 5, '+1000'
