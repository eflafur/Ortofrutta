# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-07-02 10:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0003_sito_sigla'),
    ]

    operations = [
        migrations.AddField(
            model_name='produttore',
            name='citta',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='produttore',
            name='regione',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
