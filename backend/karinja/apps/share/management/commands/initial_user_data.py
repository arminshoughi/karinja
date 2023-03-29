from django.core.management.base import BaseCommand

from apps.share.consts import SexTypeChoices, EducationTypeChoices, CompanyCountTypeChoices
from apps.share.services import UserService

import faker


class Command(BaseCommand):
    help = 'create bank'
    faker = faker.Faker('fa-ir')

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='clearing all data',
        )

    def handle(self, *args, **options):
        if options['clear']:
            UserService.truncate()
            self.stdout.write(self.style.SUCCESS(f"Users data Successfully cleared ;)"))

        admin = UserService.create_user(
            username='admin',
            password='1234',
            is_superuser=True,
            is_active=True
        )
        self.stdout.write(self.style.SUCCESS('Admin added'))

        shakiba = UserService.create_employee(
            username='shakiba',
            password='1234',
            first_name='Shakiba',
            last_name='Sarami',
            old=24,
            education_degree=EducationTypeChoices.BACHELOR.value,
            national_code='4610565544',
            mobile='09130352070',
            skills='Python, JavaScript, MSSQL Server',
            experiences='Front-end developer in Electro Mizan Andishe for 2 years, 2020-2022',
            educations='Bachelor of Engineering (BEng), Computer Software Engineering, Isfahan, Najaf Abad University',
            languages='English (Elementary proficiency)',
            birthday='1996-09-15',
            sex=SexTypeChoices.FEMALE.value,
            avatar='static/shakiba.png',
        )
        self.stdout.write(self.style.SUCCESS('Shakiba added'))

        newsha = UserService.create_company(
            username='newsha',
            password='1234',
            name_en='Karinja',
            name_fa='کارینجا',
            website='karinja.ir',
            establishment=1393,
            count_type=CompanyCountTypeChoices.SMALL.value,
            about="""
            کارینجا یک سامانه جستجوی 
            مشاغل برای پیشرفت در مسیر شغلی است ایجاد ارتباط آسان و سریع بین متخصصین و شرکت‌های معتبر در
             ایران، مهم‌ترین وظیفه و خدمت کارینجا است که به صورت کاملا رایگان به کارجویان ارائه می‌شود.
             با جستجو در فرصت‌های شغلی از طریق کارینجا، به آسانی شغل مناسب و مورد علاقه‌تان را پیدا کنید
            """,
            avatar='static/newsha.png',
            address='استان تهران، تهران، خیابان حسین مردی، شرکت الکترو میزان کارینجا',
        )
        self.stdout.write(self.style.SUCCESS('Newsha added'))
