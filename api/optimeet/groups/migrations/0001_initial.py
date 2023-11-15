

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('group_id', models.CharField(blank=True, max_length=10, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('host_id', models.CharField(max_length=64)),
                ('max_capacity', models.IntegerField(default=5)),
                ('status', models.CharField(choices=[('A', 'Active'), ('F', 'Finished')], default='A', max_length=1)),
            ],
        ),
        migrations.CreateModel(

            name='UserGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=64)),
                ('groups', models.CharField(max_length=10)),
            ]
        ),

        migrations.CreateModel(
            name='Recommendations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_id', models.CharField(max_length=50)),
                ('place_name', models.CharField(max_length=50)),
                ('place_url', models.CharField(max_length=100)),
                ('times', models.JSONField()),
                ('group_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='groups.group')),

            ],
        ),
    ]
