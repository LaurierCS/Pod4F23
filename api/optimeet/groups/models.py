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


class UserGroup(models.Model):
    user_id = models.CharField(max_length=64)
    group_id = models.ForeignKey(Group, on_delete=models.DO_NOTHING, default="")
    class Meta:
        unique_together = [["group_id","user_id"]]

class Recommendations(models.Model):
    group_id = models.ForeignKey(Group, models.DO_NOTHING)
    activity_id = models.CharField(max_length=50)
    place_name = models.CharField(max_length=50)
    place_url = models.CharField(max_length=100)
    times = models.JSONField()
    
    loc_lat = models.FloatField()
    loc_long = models.FloatField()

class Preferences(models.Model):
    group_id = models.ForeignKey(Group, on_delete=models.DO_NOTHING, default="")
    user_id = models.CharField(max_length=64, blank=True)
    
    categories = models.JSONField()
    times = models.JSONField()
    
    lat = models.FloatField()
    lon = models.FloatField()
    radius = models.FloatField()

    class Meta:
        unique_together = [["group_id", "user_id"]]

class Votes(models.Model):
    rec_id = models.ForeignKey(Recommendations, on_delete=models.DO_NOTHING)
    group_id = models.ForeignKey(Group, on_delete=models.DO_NOTHING, default="")
    user_id = models.CharField(max_length=64)
    
    selected_time = models.CharField(max_length=20)

    class Meta:
        unique_together = [["rec_id", "user_id"]]
