from django.db import models

class Group(models.Model):
    #group_id = models.CharField(max_length = 20) # idk how we will generate this
    group_name = models.CharField(max_length = 20)
    
