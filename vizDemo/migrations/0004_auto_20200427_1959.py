# Generated by Django 3.0.4 on 2020-04-27 19:59

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vizDemo', '0003_auto_20200423_1317'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cleanedevent',
            name='data',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=dict),
        ),
    ]
