#---DJANGO REST FRAMEWORK IMPORTS-----
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission
from rest_framework.permissions import AllowAny
#---DJANGO IMPORTS---
from django.http import HttpResponse
from django.core import serializers
from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db import transaction
#---PYTHON INCLUDES IMPORTS---
import hashlib
import json

#---PERSONAL MODULES IMPORTS---
from load_key import GLOBAL_PRIVATE_KEY


#---MODELS IMPORTS---
from .models import Personal
from .models import Documento
from .models import SuscritosAGrupo
from .models import GrupoPersonal
# Create your views here.
#----CLASS BASED VIEWS----
# Permiso custom: restringe acceso a usuarios con rol control
# Usar en vistas donde solo personal de control debe operar (como por ejemplo asignar trabajores, despachos etc)
class ControlProfileOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'control'
class MedicProfileOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'medic'     
class NurseProfileOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'nurse'

class Login(APIView):
    #TODO: Implementacion de MFA con Google Authenticator (TOTP)
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
            login(request,user)
            #TODO: obtener el rol del usuario para retornarlo dentro del json
            return Response({'message':'OK', 'role': user.rol.nombre_rol}, status=status.HTTP_200_OK)
        except ValueError as v:
            return Response({'error':str(v)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error':'Fallo interno: ' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




#TODO: Creacion de la api para cargar y actualizar datos del inventario
class Inventory(APIView):
    permission_classes  = [ControlProfileOnly]





#TODO: API para obtener datos del personal

class DataPersonal(APIView):
    def get(self, request):
        data_personal = Personal.objects.filter(is_active=True).values(
            'id', 'first_name', 'last_name', 'rut', 'rol__nombre_rol'
        )
        return Response(list(data_personal), status=status.HTTP_200_OK)

#FLUJO para las firmas:
#1. Enfermero/médico cierra ficha
#2. Backend firma documento con CLAVE PRIVADA del usuario
#3. Firma + documento se guardan en S3
#4. Cualquiera descarga y verifica con CLAVE PÚBLICA del usuario
#5. QR apunta a URL lectura → muestra doc + verificación firma

#TODO: Creacion de la validación del TOTP (MFA)
#TODO: Creación de la API de notificaciones
#TODO: Creación de la API para carga de documentos y descarga de documentos (SOLO lectura, generar un QR desde HASH)
#AUN NO FUNCIONA
class DocumentsAPI(APIView):
    def post(self,request):
        pdf_file = request.FILES.get("archivo_pdf")
        if not pdf_file:
           return Response({'error':'failed to find (archivo_pdf) in json format'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        sha256_hash = hashlib.sha256()
        try:
            for chunk in pdf_file.chunks(64):
                sha256_hash.update(chunk)
            file_hash = sha256_hash.hexdigest()
            pdf_file.seek(0)
        except OSError as os:
            return Response({"error":str(os)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except PermissionError as pe:
            return Response({"error": str(pe)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        #TODO:subir firma al s3
        #firma = GLOBAL_PRIVATE_KEY.sign(bytes.fromhex(file_hash))
        #with open("documento_pdf.sig", "wb")as f_sig:
        #    f_sig.write(firma)
        return Response({"success":"success"}, status=status.HTTP_200_OK)

#TODO: Creación de la API para la modificación de los documentos

#TODO: Creación de la API para la gestión de los Equipos de trabajo
class Grupos(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return[AllowAny()]
        return [ControlProfileOnly()]
    def post(self, request):
        data = request.data
        try:
            with transaction.atomic():
                grupo = GrupoPersonal.objects.create(nombre_grupo= data.get('nombre_grupo'))
                for p_fk in data.get('personal', []):
                    persona = Personal.objects.get(id=p_fk)
                    SuscritosAGrupo.objects.create(grupo=grupo, personal=persona)
            return Response({'success':'success'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':'failed to create group: '+str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def patch(self, request):
        data = request.data
        try:
            persona = get_object_or_404(Personal, id=data.get('p_id'))
            grupo_to_update = get_object_or_404(GrupoPersonal,id=data.get('group_id'))
            with transaction.atomic():
                SuscritosAGrupo.objects.filter(
                    grupo=grupo_to_update,
                    personal=persona,
                    fecha_salida=None
                ).update(
                    fecha_salida=timezone.now()
                )
            return Response({'success':'success'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':'failed to update the group: '+str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def get(self, request):
        data = request.data
        query = SuscritosAGrupo.objects.filter(grupo_id=data.get('grupo_id'), fecha_salida=None).values(
            'personal__id', 'personal__first_name','personal__last_name','personal__rut','personal__rol__nombre_rol'
        )

        return Response(list(query), status=status.HTTP_200_OK)
    
            

#TODO: Creación de la API para los estados de los usuarios (en turno, disponible, fuera de servicio)
#TODO: Creación de la API para la gestión de los datos de los pacientes(para cargar al documento)
#TODO: Creacion de la API para despachar las atenciones
#TODO: Creacion de la API de logs para Auditorías
#TODO: Creación de la API de exportación de las atenciones en formatio FHIR HL7
#TODO: Creación de la API de tickets para recuperación de credenciales