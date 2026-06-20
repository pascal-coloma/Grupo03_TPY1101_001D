

BASE_URL = "https://api.imsambulancias.cl/ims/api"
AUTH_URL = f"{BASE_URL}/auth/"
LOGIN_URL = f"{BASE_URL}/login/"
DESPACHO_URL = f"{BASE_URL}/despachos/add/"

PAYLOAD_DESPACHO = {
    "direccion_origen": "Av. Libertad 123",
    "direccion_destino": "Hospital Regional",
    "descripcion_llamado": "Prueba de carga, puede ser borrado, no asociado a atencion",
    "paciente_rut": "20999999-9"
}
HEADERS_BASE = {"Referer": "https://api.imsambulancias.cl/"}