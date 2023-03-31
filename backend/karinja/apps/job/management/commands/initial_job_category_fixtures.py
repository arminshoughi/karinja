import json
import os
import time

import requests
from django.core.management.base import BaseCommand
from bs4 import BeautifulSoup
from django.utils import timezone
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from karinja.settings import BASE_DIR


class Command(BaseCommand):
    help = 'Initializing fixtures'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='clearing all data',
        )

    def handle(self, *args, **options):
        job_categories_file_dir = os.path.join(BASE_DIR, '../apps/job/fixtures/job_categories.json')
        job_categories_file = open(job_categories_file_dir, 'w')
        if options['clear']:
            job_categories_file.truncate(0)
            self.stdout.write(self.style.SUCCESS(f"job categories fixture successfully cleared ;)"))

        try:
            # Set up the Selenium driver with headless mode and a user agent
            options = Options()
            options.add_argument('--headless')
            options.add_argument(
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'
            )
            driver = webdriver.Chrome(options=options)

            # Navigate to the website you want to crawl
            driver.get('https://quera.org/magnet/jobs')

            # Wait for the page to load and bypass Cloudflare's JavaScript challenge
            while 'Just a moment...' in driver.title:
                time.sleep(15)
                driver.refresh()
                # TODO: Here it gets caught in a loop :(

            # Once you're past Cloudflare, you can start scraping the website using the driver
            # For example, to get the page's HTML content:
            html = driver.page_source

            # Don't forget to close the driver when you're done
            driver.quit()
        except requests.HTTPError as http_err:
            print(f'HTTP error occurred: {http_err}')
        except Exception as err:
            print(f'Other error occurred: {err}')
        else:
            soup = BeautifulSoup(html, 'html.parser')
            job_categories = soup.select('.css-10dzyqw .css-wor2ha span span')[63:]
            data = []
            for idx, category in enumerate(job_categories):
                data.append({
                    "model": "job.jobcategorymodel",
                    "pk": idx,
                    "fields": {
                        "title": category.contents[0],
                        "created_at": f'{timezone.now()}'
                    }
                })
            job_categories_file.write(json.dumps(data, indent=4))
