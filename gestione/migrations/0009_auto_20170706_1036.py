# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-07-06 10:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0008_auto_20170706_1033'),
    ]

    operations = [
        migrations.RenameField(
            model_name='preferenza',
            old_name='Fatturato',
            new_name='fatturato',
        ),
        migrations.RenameField(
            model_name='preferenza',
            old_name='Margine',
            new_name='margine',
        ),
        migrations.AddField(
            model_name='produttore',
            name='trpag',
            field=models.IntegerField(null=True),
        ),
    ]