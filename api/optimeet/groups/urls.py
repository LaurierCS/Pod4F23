from django.urls import path
from . import views

app_name = "groups"

urlpatterns = [
    path("", views.groups),
    path("<str:group_id>/", views.group_detail),
    path('<str:group_id>/users/', views.add_users_to_group, name='add_users_to_group'),
    #path('usergroups/', views.UserGroupListAPIView.as_view(), name='usergroup-list'),#get all usergroup
    #path('usergroups/<str:user_id>/', views.UserGroupListAPIView.as_view(), name='usergroup-byuser'),#get usergroup by user_id
]