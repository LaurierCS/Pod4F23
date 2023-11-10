# Generated by Django 4.2.6 on 2023-11-10 02:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usergroup',
            old_name='groups',
            new_name='group_id',
        ),
        migrations.AlterUniqueTogether(
            name='usergroup',
            unique_together={('group_id', 'user_id')},
        ),
    ]