from django.urls import path
from . import views

app_name = "groups"

urlpatterns = [
    path("", views.groups),
    path("<int:group_id>/", views.group_detail)
]