# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-09-06 11:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0053_auto_20170905_0959'),
    ]

    operations = [
        migrations.AddField(
            model_name='scarico',
            name='lotto',
            field=models.CharField(max_length=5, null=True),
        ),
        migrations.AddField(
            model_name='sospese',
            name='lotto',
            field=models.CharField(max_length=5, null=True),
        ),
    ]
