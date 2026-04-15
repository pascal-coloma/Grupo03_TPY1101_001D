from django.db import models
from django.contrib.auth.models import AbstractUser

class RolPersonal(models.Model):
    nombre_rol = models.CharField(max_length=50) # medico, tens, chofer, control

    def __str__(self):
        return self.nombre_rol

class GrupoPersonal(models.Model):
    nombre_grupo = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre_grupo

class Personal(AbstractUser):
    role = models.CharField(max_length=50) 
    totp_secret = models.CharField(max_length=32, blank=True, null=True)
    public_key = models.TextField(blank=True, null=True)
    
    rut = models.CharField(max_length=12, unique=True)

    grupo = models.ForeignKey(GrupoPersonal, on_delete=models.SET_NULL, null=True, blank=True)
    rol_Grupo = models.ForeignKey(RolPersonal, on_delete=models.PROTECT, null=True)

    def __str__(self):
        return f"{self.get_full_name()} ({self.role})"
---------------------------------
class Paciente(models.Model):
    rut = models.CharField(max_length=12, unique=True)
    nombre_completo = models.CharField(max_length=255)
    edad = models.IntegerField()
    direccion = models.CharField(max_length=255)
    condicion_paciente = models.TextField()

    def __str__(self):
        return self.nombre_completo

class Ambulancia(models.Model):
    patente = models.CharField(max_length=10, unique=True)
    modelo = models.CharField(max_length=100)
    estado_disponibilidad = models.CharField(max_length=50, default="Disponible")

    def __str__(self):
        return f"{self.modelo} - {self.patente}"
------------------------------------
class InsumoMedico(models.Model):
    nombre_insumo = models.CharField(max_length=100)
    stock_total = models.IntegerField()
    unidad_medida = models.CharField(max_length=20) # mg, ml, unidades
    tipo = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre_insumo

class Atencion(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    ambulancia = models.ForeignKey(Ambulancia, on_delete=models.PROTECT)
    personal = models.ForeignKey(Personal, on_delete=models.PROTECT)

  #estos datos pueden ir en una tabla aparte ya que la tabla atencion debe tener info precisa para el hash
    hora_salida = models.DateTimeField()                          
    hora_llegada = models.DateTimeField(null=True, blank=True)
    signos_vitales = models.TextField()
    
    # Aquí se guarda el HASH que mencionaste
    sello_electronico = models.TextField(blank=True, null=True, help_text="Hash de integridad")
    estado_sello = models.CharField(max_length=20, default="Pendiente")

    def __str__(self):
        return f"Atención {self.id} - {self.paciente.nombre_completo}"

class DetalleInsumoAtencion(models.Model):
    atencion = models.ForeignKey(Atencion, on_delete=models.CASCADE, related_name='insumos_utilizados')
    insumo = models.ForeignKey(InsumoMedico, on_delete=models.PROTECT)
    dosis = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.insumo.nombre_insumo} en Atencion {self.atencion.id}"

# necesitamos guardar el hash y el documento crear una tabla  y en la tabla atencion debe guardar la direccion del domuento hash para luego guardarla y cargarla
# Create your models here.
#TODO: creacion de los modelos de la base de datos
# Para usuario considerar usar el modelo de django por defecto
# Campos requeridos en modelo User custom:
# - role          CharField        → diferencia médico/enfermero/tens/control/chofer
# - totp_secret   CharField(32)    → secreto MFA Google Authenticator
# - public_key    TextField        → verifica firmas asimétricas del usuario
# - is_active     BooleanField     → Django ya lo trae, NO agregar, pero a tener en mente para 
# no agregar duplicados
