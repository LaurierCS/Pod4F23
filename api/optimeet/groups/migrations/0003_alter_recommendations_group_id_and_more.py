# Generated by Django 4.2.6 on 2023-11-22 02:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0002_rename_groups_usergroup_group_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recommendations',
            name='group_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='groups.group'),
        ),
        migrations.AlterField(
            model_name='usergroup',
            name='group_id',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.DO_NOTHING, to='groups.group'),
        ),
        migrations.CreateModel(
            name='Votes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=64)),
                ('group_id', models.ForeignKey(default='', on_delete=django.db.models.deletion.DO_NOTHING, to='groups.group')),
                ('rec_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='groups.recommendations')),
            ],
            options={
                'unique_together': {('rec_id', 'user_id')},
            },
        ),
    ]