# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-28 21:14
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0022_produttore_pi'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('regione', models.CharField(max_length=20, null=True)),
                ('citta', models.CharField(max_length=20, null=True)),
                ('azienda', models.CharField(blank=True, default=' ', max_length=50, unique=True)),
                ('indirizzo', models.CharField(blank=True, default=' ', max_length=60, null=True)),
                ('acquisizione', models.DateField(default=datetime.date.today)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('tel', models.CharField(blank=True, default=' ', max_length=15, null=True)),
                ('trpag', models.IntegerField(blank=True, default=0, null=True)),
                ('pi', models.CharField(blank=True, default=' ', max_length=11, null=True)),
            ],
        ),
    ]
