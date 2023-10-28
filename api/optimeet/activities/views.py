from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

import json
import os

@csrf_exempt
@api_view(['GET'])
def get_activities(request):
    
    here = os.path.dirname(os.path.abspath(__file__))
    
    with open(os.path.join(here, 'Activities.json')) as file:
        
        activities = json.load(file)

    return Response(activities)
