# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-07-10 10:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0013_auto_20170708_0815'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produttore',
            name='capacita',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
