from django.urls import path
from .views import *
urlpatterns = [
    path("api/login/", Login.as_view(), name="Login"),
    path("api/allpersonal/",DataPersonal.as_view(), name="allpersonal"),
    path("api/registroPacientes/", RegistrosPacientesAPI.as_view(),name="RegistroPacientesAPI"),
    path("api/suscribirAgrupo/",Grupos.as_view(),name="Grupos"),
]

