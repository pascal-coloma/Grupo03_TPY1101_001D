from django.db import models

# Create your models here.
#TODO: creacion de los modelos de la base de datos
# Para usuario considerar usar el modelo de django por defecto
# Campos requeridos en modelo User custom:
# - role          CharField        → diferencia médico/enfermero/tens/control/chofer
# - totp_secret   CharField(32)    → secreto MFA Google Authenticator
# - public_key    TextField        → verifica firmas asimétricas del usuario
# - is_active     BooleanField     → Django ya lo trae, NO agregar, pero a tener en mente para 
# no agregar duplicados