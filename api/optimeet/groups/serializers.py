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
 
        
class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Preferences
        fields = '__all__'
    
    def create(self, validated_data):
        validated_data['group_id'] = self.context['group_id']
        validated_data['user_id'] = self.context['user_id']
        
        return super(PreferencesSerializer, self).create(validated_data)

class VotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Votes
        fields = '__all__'
    
    def create(self, validated_data):
        validated_data['group_id'] = self.context['group_id']
        return super(VotesSerializer, self).create(validated_data)