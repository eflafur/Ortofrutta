# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-09-18 18:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0066_carico_costo'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
