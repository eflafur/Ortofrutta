# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-09-27 15:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0076_carico_fattimp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carico',
            name='cv',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
