# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-15 09:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0041_auto_20170813_2326'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='regione',
            field=models.CharField(max_length=28, null=True),
        ),
    ]
