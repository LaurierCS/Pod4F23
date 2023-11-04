from rest_framework import serializers
from . import models
from .models import rnd_id

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Group
        fields = '__all__'

    def create(self, validated_data):
        validated_data['group_id'] = rnd_id()
        return super(GroupSerializer, self).create(validated_data)
    