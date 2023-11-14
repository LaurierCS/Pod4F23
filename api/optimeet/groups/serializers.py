from rest_framework import serializers
from . import models
from random import randint

def rnd_id(): return randint(1000000000,9999999999)

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Group
        fields = '__all__'

    def create(self, validated_data):
        validated_data['group_id'] = rnd_id()
        return super(GroupSerializer, self).create(validated_data)

class RecSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Recommendations
        fields = '__all__'