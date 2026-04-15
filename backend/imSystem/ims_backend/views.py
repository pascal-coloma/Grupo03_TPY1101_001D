from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework.permissions import BasePermission
from django.http import HttpResponse
from django.core import serializers
from django.shortcuts import get_object_or_404
import hashlib
from load_key import GLOBAL_PRIVATE_KEY
# Create your views here.
from models import Personal, Documento
# Permiso custom: restringe acceso a usuarios con rol control
# Usar en vistas donde solo personal de control debe operar (como por ejemplo asignar trabajores, despachos etc)
class ControlProfileOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'control'



#login api para todos los usuarios
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
            return Response({'message':'OK', 'role': 'admin'}, status=status.HTTP_200_OK)
        except ValueError as v:
            return Response({'error':str(v)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error':'Fallo interno: ' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




#TODO: Creacion de la api para cargar y actualizar datos del inventario
class Inventory(APIView):
    permission_classes  = [ControlProfileOnly]





#TODO: API para obtener datos del personal

class DataPersonal(APIView):
    def get():
        data_personal = Personal.objects.all()
        data_serialized = serializers.serialize(format='json', queryset=data_personal)
        return HttpResponse(data_serialized, content_type='application/json')
        
class GetDocumentFromHash(APIView):
    def get(hash_):
        file = get_object_or_404(Documento, hash_)

#FLUJO para las firmas:
#1. Enfermero/médico cierra ficha
#2. Backend firma documento con CLAVE PRIVADA del usuario
#3. Firma + documento se guardan en S3
#4. Cualquiera descarga y verifica con CLAVE PÚBLICA del usuario
#5. QR apunta a URL lectura → muestra doc + verificación firma

#TODO: Creacion de la validación del TOTP (MFA)
#TODO: Creación de la API de notificaciones
#TODO: Creación de la API para carga de documentos y descarga de documentos (SOLO lectura, generar un QR desde HASH)
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

#TODO: Creacion de la API para la gestión de claves asimetricas(PUB, PRIV)
#TODO: Creación de la API para la modificación de los documentos
#TODO: Creación de la API para la gestión de los Equipos de trabajo
#TODO: Creación de la API para los estados de los usuarios (en turno, disponible, fuera de servicio)
#TODO: Creación de la API para la gestión de los datos de los pacientes(para cargar al documento)
#TODO: Creacion de la API para despachar las atenciones
#TODO: Creacion de la API de logs para Auditorías
#TODO: Creación de la API de exportación de las atenciones en formatio FHIR HL7
#TODO: Creación de la API de tickets para recuperación de credenciales