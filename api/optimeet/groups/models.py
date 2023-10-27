from django.db import models

class Group(models.Model):
    
    ACTIVE = "A"
    FINISHED = "F"
    status_choices = [(ACTIVE, "Active"), (FINISHED, "Finished")]
    
    name = models.CharField(max_length = 30, default='')
    host_id = models.CharField(max_length=64, default='')
    max_capacity = models.IntegerField(default=5) 
    status = models.CharField(max_length=1, choices=status_choices, default = ACTIVE)  