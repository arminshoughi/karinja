import json
import os

from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.share.consts.users import EducationTypeChoices, SexTypeChoices, CompanyCountTypeChoices, UserTypeChoices

import faker

from karinja.settings import BASE_DIR


class Command(BaseCommand):
    help = 'create bank'
    faker = faker.Faker('fa-ir')

    def handle(self, *args, **options):
        user_data = [
            {
                "model": "share.usermodel",
                "pk": 1,
                "fields": {
                    "username": 'admin',
                    "password": make_password('1234'),
                    "is_superuser": True,
                    "is_active": True,
                    "created_at": f'{timezone.now()}'
                }
            },
            {
                "model": "share.usermodel",
                "pk": 2,
                "fields": {
                    "username": 'shakiba',
                    "password": make_password('1234'),
                    "first_name": 'Shakiba',
                    "last_name": 'Sarami',
                    "old": 24,
                    "education_degree": EducationTypeChoices.BACHELOR.value,
                    "national_code": "4610565544",
                    "mobile": '09130352070',
                    "skills": 'Python, JavaScript, MSSQL Server',
                    "experiences": 'Front-end developer in Electro Mizan Andishe for 2 years, 2020-2022',
                    "educations": 'Bachelor of Engineering (BEng), Computer Software Engineering, Isfahan, Najaf Abad University',
                    "languages": 'English (Elementary proficiency)',
                    "birthday": '1996-09-15',
                    "sex": SexTypeChoices.FEMALE.value,
                    "avatar": 'static/shakiba.png',
                    "typ": UserTypeChoices.EMPLOYEE.value,
                    "created_at": f'{timezone.now()}'
                }
            },
            {
                "model": "share.usermodel",
                "pk": 3,
                "fields": {
                    "username": 'newsha',
                    "password": make_password('1234'),
                    "name_en": 'Karinja',
                    "name_fa": 'کارینجا',
                    "website": 'karinja.ir',
                    "establishment": 1393,
                    "count_type": CompanyCountTypeChoices.SMALL.value,
                    "about": """
                       کارینجا یک سامانه جستجوی 
                       مشاغل برای پیشرفت در مسیر شغلی است ایجاد ارتباط آسان و سریع بین متخصصین و شرکت‌های معتبر در
                        ایران، مهم‌ترین وظیفه و خدمت کارینجا است که به صورت کاملا رایگان به کارجویان ارائه می‌شود.
                        با جستجو در فرصت‌های شغلی از طریق کارینجا، به آسانی شغل مناسب و مورد علاقه‌تان را پیدا کنید
                    """,
                    "avatar": 'static/newsha.png',
                    "address": 'استان تهران، تهران، خیابان حسین مردی، شرکت الکترو میزان کارینجا',
                    "typ": UserTypeChoices.COMPANY.value,
                    "created_at": f'{timezone.now()}'
                }
            },
        ]
        user_file_dir = os.path.join(BASE_DIR, '../apps/share/fixtures/users.json')
        user_file = open(user_file_dir, 'w')
        user_file.write(json.dumps(user_data, indent=4))
