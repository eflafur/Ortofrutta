# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-31 21:01
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0026_auto_20170731_1719'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='produttore',
            name='cod',
        ),
        migrations.AddField(
            model_name='idcod',
            name='produttore',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='gestione.Produttore'),
        ),
    ]
