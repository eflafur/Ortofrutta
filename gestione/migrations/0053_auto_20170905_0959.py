# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-09-05 09:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0052_carico_qu'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='carico',
            name='qu',
        ),
        migrations.AddField(
            model_name='carico',
            name='cassaout',
            field=models.IntegerField(default=0),
        ),
    ]