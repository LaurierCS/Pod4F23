from typing import Any
from django.db import models

class Group(models.Model):
        
    ACTIVE = "A"
    FINISHED = "F"
    
    status_choices = [(ACTIVE, "Active"), (FINISHED, "Finished")]
        
    group_id = models.CharField(max_length=10, primary_key=True, blank=True) 
        
    name = models.CharField(max_length = 30)
    host_id = models.CharField(max_length=64)
    max_capacity = models.IntegerField(default=5)
    status = models.CharField(max_length=1, choices=status_choices, default = ACTIVE)  

class Recommendations(models.Model):
    group_id = models.ForeignKey(Group, models.CASCADE)
    activity_id = models.CharField(max_length=50)
    place_name = models.CharField(max_length=50)
    place_url = models.CharField(max_length=100)
    times = models.JSONField()
    