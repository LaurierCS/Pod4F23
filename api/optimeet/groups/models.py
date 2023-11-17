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
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE, default="")
    class Meta:
        unique_together = [["group_id","user_id"]]

class Recommendations(models.Model):
    group_id = models.ForeignKey(Group, models.CASCADE)
    activity_id = models.CharField(max_length=50)
    place_name = models.CharField(max_length=50)
    place_url = models.CharField(max_length=100)
    times = models.JSONField()
    
class Votes(models.Model):
    
    PREFERENCES_ACTIVE = "Preferences Active"
    PREFERENCES_COMPLETE = "Preferences Complete"
    RECOMMENDATION_ACTIVE = "Recommendation Active"
    RECOMMENDATION_COMPLETE = "Recommendation Complete"
    
    voting_status_choices = [
        (PREFERENCES_ACTIVE, "Preferences Active"),
        (PREFERENCES_COMPLETE, "Preferences Complete"),
        (RECOMMENDATION_ACTIVE, "Recommendation Active"),
        (RECOMMENDATION_COMPLETE, "Recommendation Complete"),
    ]

    group_id = models.ForeignKey(Group, related_name='group_votes', on_delete=models.CASCADE)
    max_capacity = models.IntegerField(blank=True)
    voting_status = models.CharField(max_length=50, choices=voting_status_choices, default=PREFERENCES_ACTIVE)
    results_of_voted = models.JSONField(blank=True)
    
