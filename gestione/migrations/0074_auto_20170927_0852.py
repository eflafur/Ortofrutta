# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-09-27 08:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0073_auto_20170927_0746'),
    ]

    operations = [
        migrations.AddField(
            model_name='carico',
            name='cv',
            field=models.CharField(default=0, max_length=10),
        ),
        migrations.AddField(
            model_name='carico',
            name='mrg',
            field=models.SmallIntegerField(default=False),
        ),
    ]
