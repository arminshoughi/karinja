import json
import os

from django.utils import timezone
from tqdm import tqdm
from django.core.management import BaseCommand

from karinja.settings import BASE_DIR


class Command(BaseCommand):
    help = 'create state and city '

    def handle(self, *args, **options):
        state_file_dir = os.path.join(BASE_DIR, '../apps/share/fixtures/states.json')
        state_file = open(state_file_dir, 'w')

        city_file_dir = os.path.join(BASE_DIR, '../apps/share/fixtures/cities.json')
        city_file = open(city_file_dir, 'w')

        state_and_city_file_dir = os.path.join(BASE_DIR, '../apps/share/static/state_and_cities.json')
        with open(state_and_city_file_dir, 'r') as file:
            states = json.load(file)

        state_data = []
        city_data = []
        city_pk = 0
        for idx, state in enumerate(tqdm(states)):
            state_data.append({
                "model": "share.statemodel",
                "pk": idx,
                "fields": {
                    "title": state['province'],
                    "created_at": f'{timezone.now()}'
                }
            })
            for city in state['cities']:
                city_data.append({
                    "model": "share.citymodel",
                    "pk": city_pk,
                    "fields": {
                        "state_id": idx,
                        "title": city.replace(" شهرستان", ''),
                        "created_at": f'{timezone.now()}'
                    }
                })
                city_pk += 1

        state_file.write(json.dumps(state_data, indent=4))
        city_file.write(json.dumps(city_data, indent=4))

        self.stdout.write(self.style.SUCCESS(f"States and Cities successfully initialized"))
