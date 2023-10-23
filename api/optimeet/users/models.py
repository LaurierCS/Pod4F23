from django.db import models


class Person(models.Model):
    username = models.CharField(max_length=30)
    email = models.CharField(max_length=30)

