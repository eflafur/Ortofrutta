# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-09-27 14:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0074_auto_20170927_0852'),
    ]

    operations = [
        migrations.AddField(
            model_name='carico',
            name='fatt',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
