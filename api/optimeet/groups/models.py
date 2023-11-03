from typing import Any
from django.db import models
from random import randint
import django

def rnd_id(): return randint(1000000000,9999999999)

class Group(models.Model):
        
    ACTIVE = "A"
    FINISHED = "F"
    
    
    status_choices = [(ACTIVE, "Active"), (FINISHED, "Finished")]
        
    group_id = models.CharField(max_length=10, default=rnd_id(), primary_key=True) 
        
    name = models.CharField(max_length = 30, default='')
    host_id = models.CharField(max_length=64, default='')
    max_capacity = models.IntegerField(default=5)
    status = models.CharField(max_length=1, choices=status_choices, default = ACTIVE)  
    
