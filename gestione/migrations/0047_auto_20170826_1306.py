# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-08-26 13:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gestione', '0046_saldo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='saldo',
            name='idcod',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='gestione.IDcod'),
        ),
    ]
