# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-07-08 08:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0012_remove_produttore_preferenza'),
    ]

    operations = [
        migrations.AddField(
            model_name='produttore',
            name='fatturato',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='produttore',
            name='margine',
            field=models.IntegerField(null=True),
        ),
    ]