# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-13 10:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0036_auto_20170813_1017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carico',
            name='q',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='scarico',
            name='q',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='sospese',
            name='q',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=9, null=True),
        ),
    ]
