from django.test import TestCase
from .models import Group, UserGroup  # Import your models
from django.urls import reverse
from rest_framework import status

class APITestCase(TestCase):
    def setUp(self):
        # Create test groups and users
        self.group1 = Group.objects.create(group_id='1234567890', name='Group 1', host_id='host123', max_capacity=5)
        self.group2 = Group.objects.create(group_id='2345678901', name='Group 2', host_id='host234', max_capacity=10)
        
        self.user1 = UserGroup.objects.create(user_id=1)
        self.user2 = UserGroup.objects.create(user_id=2)
        self.user3 = UserGroup.objects.create(user_id=3)
        self.user4 = UserGroup.objects.create(user_id=4)



