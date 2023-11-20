from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.views import APIView

from . import models
from .models import UserGroup
from . import serializers
from .serializers import UserGroupSerializer

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

##add user to group
@csrf_exempt
@api_view(['POST'])
def add_users_to_group(request, group_id):
    try:
        group = models.Group.objects.get(pk=group_id)
    except models.Group.DoesNotExist:
        raise Http404  
    
  
    serializer = serializers.UserGroupSerializer(data = request.data, context={'group_id': group_id})
    
    
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET'])  
def votes(request, group_id):
        votes = models.Votes.objects.filter(group_id=group_id)
        serializer = serializers.VotesSerializer(votes, many=True)
        return Response(serializer.data)
    
@csrf_exempt
@api_view(['POST'])
def create_vote(request, group_id):

    try:
        group = models.Group.objects.get(group_id=group_id)
    except models.Group.DoesNotExist:
        raise Http404  
    
    request.data['group_id'] = group_id
    serializer = serializers.VotesSerializer(data=request.data, context={'group_id': group_id})
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)    
# #for testing
# class UserGroupListAPIView(APIView):
#     def get(request, self):
#         user_groups = UserGroup.objects.all()
#         serializer = UserGroupSerializer(user_groups, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
# #see all the groups a user is part of
# class UserGroupListAPIView(APIView):
#     def get(self, request, *args, **kwargs):
#         user_id = self.kwargs.get('user_id')
#         user_groups = UserGroup.objects.filter(user_id=user_id)
#         serializer = UserGroupSerializer(user_groups, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
