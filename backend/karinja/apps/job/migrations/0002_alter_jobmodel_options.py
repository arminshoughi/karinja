# Generated by Django 3.2 on 2023-03-31 13:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='jobmodel',
            options={'verbose_name': 'Job', 'verbose_name_plural': 'Jobs'},
        ),
    ]
