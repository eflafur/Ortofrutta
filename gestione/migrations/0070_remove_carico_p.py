# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-09-21 14:45
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0069_auto_20170921_1443'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='carico',
            name='p',
        ),
    ]
