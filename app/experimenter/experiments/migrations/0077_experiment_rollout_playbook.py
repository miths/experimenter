# Generated by Django 2.1.11 on 2019-11-22 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("experiments", "0076_experiment_rollout_type")]

    operations = [
        migrations.AddField(
            model_name="experiment",
            name="rollout_playbook",
            field=models.CharField(
                blank=True,
                choices=[
                    ("low_risk", "Low Risk Schedule"),
                    ("high_risk", "High Risk Schedule"),
                    ("marketing", "Marketing Launch Schedule"),
                    ("custom", "Custom"),
                ],
                max_length=255,
                null=True,
            ),
        )
    ]
