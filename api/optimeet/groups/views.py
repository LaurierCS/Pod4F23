from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status

from . import models
from . import serializers

@csrf_exempt
@api_view(['POST'])
def groups(request):

    serializer = serializers.GroupSerializer(data = request.data)
    
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
            
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
@api_view(['GET'])    
def group_detail(request, group_id):

    group = models.Group.objects.filter(group_id=group_id)
    
    serializer = serializers.GroupSerializer(group, many = True)
    return Response(serializer.data)

@csrf_exempt
@api_view(['GET'])    
def get_recommendation(request, group_id):
    
    recs = models.Recommendations.objects.filter(group_id=group_id)
    
    serializer = serializers.RecSerializer(recs, many = True)
    
    return Response(serializer.data)



