# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-07-20 12:18
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0019_auto_20170720_1216'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produttore',
            name='acquisizione',
            field=models.DateField(blank=True, default=datetime.datetime(2017, 7, 20, 12, 18, 4, 66998), null=True),
        ),
    ]