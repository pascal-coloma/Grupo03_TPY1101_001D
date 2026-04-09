from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework.permissions import BasePermission
# Create your views here.

# Permiso custom: restringe acceso a usuarios con rol control
# Usar en vistas donde solo personal de control debe operar (como por ejemplo asignar trabajores, despachos etc)
class ControlProfileOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'control'




class Login(APIView):
    permission_classes = []
    def post(self, request):
        data_user = request.data.get('username')
        data_pass = request.data.get('password')

        try:
            user = authenticate (
                request,
                username = data_user,
                password = data_pass
            )
            if user is None:
                return Response(
                {'error':'Fallo al cargar al usuario, estás seguro de haber ingresado las credenciales correctas?'}
                ,status=status.HTTP_401_UNAUTHORIZED)
            user_role = user.role
            login(request,user)
            return Response({'message':'OK', 'role': str(user_role)}, status=status.HTTP_200_OK)
        except ValueError as v:
            return Response({'error':str(v)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error':'Fallo interno: ' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
