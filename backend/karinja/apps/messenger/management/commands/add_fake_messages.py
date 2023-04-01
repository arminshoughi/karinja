import faker
from tqdm import tqdm
from django.core.management.base import BaseCommand

from apps.messenger.services import MessageService
from apps.share.services import UserService


class Command(BaseCommand):
    help = 'Add fake messages'
    faker_fa = faker.Faker('fa-ir')

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='clearing all data',
        )

    def handle(self, *args, **options):
        if options['clear']:
            MessageService.truncate()
            self.stdout.write(self.style.SUCCESS(f"All messages successfully cleared ;)"))

        for sender in tqdm(UserService.filter(username__in=['shakiba', 'newsha'])):
            for receiver in UserService.exclude(id=sender.id):
                for i in range(25):
                    MessageService.create(**{
                        "sender_id": sender.id, "receiver_id": receiver.id, "body": self.faker_fa.text()
                    })
