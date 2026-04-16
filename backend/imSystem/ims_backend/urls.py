from django.urls import path
from .views import *
urlpatterns = [
    path("api/allpersonal",DataPersonal.as_view(), name="allpersonal")
]

