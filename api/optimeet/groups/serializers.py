from rest_framework import serializers
from . import models
from .models import UserGroup, Votes
from random import randint

def rnd_id(): return randint(1000000000,9999999999)

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Group
        fields = '__all__'

    def create(self, validated_data):
        validated_data['group_id'] = rnd_id()
        return super(GroupSerializer, self).create(validated_data)

    

class UserGroupSerializer(serializers.ModelSerializer): 
    class Meta:
        model = UserGroup
        fields = '__all__'
    def create(self, validated_data):
        validated_data['group_id'] = self.context['group_id']
        return super(UserGroupSerializer, self).create(validated_data)


class RecSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Recommendations
        fields = '__all__'

class VotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Votes
        fields = '__all__'
    def create(self, validated_data):
        group_id = self.context['group_id']
        max_capacity = self.context['max_capacity']
        validated_data['group_id'] = group_id
        validated_data['max_capacity'] = max_capacity
        return super().create(validated_data)