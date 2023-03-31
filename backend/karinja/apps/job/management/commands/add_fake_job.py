import faker
from tqdm import tqdm
from django.core.management.base import BaseCommand

from apps.job.consts import CooperationTypeChoices, MilitaryStatusTypeChoices
from apps.job.services import JobService, JobCategoryService
from apps.share.consts.users import CompanyCountTypeChoices, SexTypeChoices
from apps.share.services import UserService, CityService


class Command(BaseCommand):
    help = 'Initializing fixtures'
    faker_en = faker.Faker()
    faker_fa = faker.Faker('fa-ir')

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='clearing all data',
        )

    def handle(self, *args, **options):
        if options['clear']:
            JobService.truncate()
            self.stdout.write(self.style.SUCCESS(f"all jobs successfully cleared ;)"))

        if UserService.all().count() < 100:
            for i in tqdm(range(100)):
                UserService.create_company(**{
                    'username': self.faker_fa.user_name(),
                    'password': self.faker_fa.password(),
                    'name_en': self.faker_fa.company(),
                    'name_fa': self.faker_en.company(),
                    'website': self.faker_fa.company(),
                    'establishment': self.faker_fa.random_int(1300, 1403),
                    'count_type': self.faker_fa.random_element(CompanyCountTypeChoices.choices)[0],
                    'about': self.faker_fa.text(),
                    'address': self.faker_fa.address(),
                })
        for i in tqdm(range(1000)):
            JobService.create(**{
                "company_id": self.faker_en.random_element(UserService.all().values_list('id', flat=True)),
                "title": f"شغل تستی شماره {i}",
                "description": self.faker_fa.text(),
                "category_id": self.faker_en.random_element(JobCategoryService.all().values_list('id', flat=True)),
                "city_id": self.faker_en.random_element(CityService.all().values_list('id', flat=True)),
                "typ": self.faker_fa.random_element(CooperationTypeChoices.choices)[0],
                "salary": self.faker_en.random.randint(300000, 2000000),
                "skills": self.faker_fa.random_choices([
                    'Python', 'JavaScript', 'React', 'Django', 'PHP', "Laravel", 'SQL', 'Postgresql', 'MongoDB',
                    'Redis', 'Docker', 'front-end', 'back-end', 'Mobile', 'Linux', 'C#', 'Node.js', 'Vew.js', 'Java'
                ]),
                "educations": self.faker_fa.text(),
                "about": self.faker_fa.text(),
                "sex": self.faker_fa.random_element(SexTypeChoices.choices)[0],
                "military_status": self.faker_fa.random_element(MilitaryStatusTypeChoices.choices)[0]
            })
        #
        # shakiba = UserService.create_employee(
        #     username='shakiba',
        #     password='1234',
        #     first_name='Shakiba',
        #     last_name='Sarami',
        #     old=24,
        #     education_degree=EducationTypeChoices.BACHELOR.value,
        #     national_code='4610565544',
        #     mobile='09130352070',
        #     skills='Python, JavaScript, MSSQL Server',
        #     experiences='Front-end developer in Electro Mizan Andishe for 2 years, 2020-2022',
        #     educations='Bachelor of Engineering (BEng), Computer Software Engineering, Isfahan, Najaf Abad University',
        #     languages='English (Elementary proficiency)',
        #     birthday='1996-09-15',
        #     sex=SexTypeChoices.FEMALE.value,
        #     avatar='static/shakiba.png',
        # )
        # self.stdout.write(self.style.SUCCESS('Shakiba added'))
