import requests
import threading
from statistics import mean
import time
import csv

BASE_URL = "https://api.imsambulancias.cl/ims/api"
AUTH_URL = f"{BASE_URL}/auth/"
LOGIN_URL = f"{BASE_URL}/login/"
DESPACHO_URL = f"{BASE_URL}/despachos/add/"

CREDENCIALES = {"username": "21431791-4", "password": "l8ro5FPAUco1qy88"}
PAYLOAD_DESPACHO = {
    "direccion_origen": "Av. Libertad 123",
    "direccion_destino": "Hospital Regional",
    "descripcion_llamado": "Prueba de carga, puede ser borrado, no asociado a atencion",
    "paciente_rut": "20999999-9"
}
HEADERS_BASE = {"Referer": "https://api.imsambulancias.cl/"}

# Criterios de corte: si se supera cualquiera, se considera que el server "no da más"
UMBRAL_ERROR_RATE = 0.10      # 10% de requests fallando
UMBRAL_MS_PROMEDIO = 5000      # 5 segundos promedio
TIMEOUT_REQUEST = 100         # segundos antes de que requests aborte por timeout

resultados_lock = threading.Lock()
resultados = []
status = []


def autenticar(s: requests.Session) -> bool:
    res = s.post(AUTH_URL, json=CREDENCIALES)
    if res.status_code != 200:
        print("AUTH falló:", res.text)
        return False
    totp = input("TOTP: ")
    s.get(LOGIN_URL)
    csrf = s.cookies.get('csrftoken')
    resl = s.post(LOGIN_URL, json={"totp_code": totp},
                  headers={**HEADERS_BASE, "X-CSRFToken": csrf})
    print("LOGIN:", resl.status_code)
    return resl.status_code == 200


def worker(s: requests.Session, csrf: str):
    headers = {**HEADERS_BASE, "X-CSRFToken": csrf}
    try:
        r = s.post(DESPACHO_URL, json=PAYLOAD_DESPACHO, headers=headers, timeout=TIMEOUT_REQUEST)
        with resultados_lock:
            resultados.append((r.status_code, r.elapsed.total_seconds() * 1000))
    except requests.exceptions.RequestException as e:
        # timeout, conexión rechazada, conexión reseteada, etc. -> se cuenta como falla dura
        with resultados_lock:
            resultados.append((0, TIMEOUT_REQUEST * 1000))
        print(f"  [ERROR DE CONEXION] {type(e).__name__}: {e}")


def ejecutar_carga(s: requests.Session, n_concurrentes: int) -> dict:
    csrf = s.cookies.get('csrftoken')
    resultados.clear()
    hilos = [threading.Thread(target=worker, args=(s, csrf)) for _ in range(n_concurrentes)]

    inicio = time.time()
    for h in hilos:
        h.start()
    for h in hilos:
        h.join()
    duracion_total = time.time() - inicio

    codigos = [r[0] for r in resultados]
    tiempos = [r[1] for r in resultados]
    errores = sum(1 for c in codigos if c == 0 or c >= 400)
    error_rate = errores / n_concurrentes if n_concurrentes else 0
    promedio = mean(tiempos) if tiempos else 0

    print(f"\n--- Carga: {n_concurrentes} concurrentes ---")
    print(f"Promedio ms: {promedio:.0f}")
    print(f"Errores: {errores}/{n_concurrentes} ({error_rate*100:.1f}%)")
    print(f"Tiempo total tanda: {duracion_total:.2f}s")

    status.append({"nivel": n_concurrentes, "promedio_ms": round(promedio), "error_rate": round(error_rate, 3)})

    return {"promedio": promedio, "error_rate": error_rate}


def guardar_csv(nombre):
    filename=f"{nombre}.csv"
    with open(filename, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["nivel", "promedio_ms", "error_rate"])
        writer.writeheader()
        writer.writerows(status)
    print(f"\nResultados guardados en {filename}")


def main():
    s = requests.Session()
    if not autenticar(s):
        print("Error al autenticar, abortando.")
        return

    nivel = 1
    paso = 40
    nivel_max_seguridad = 1000  # tope duro por si el server nunca rompe

    while nivel <= nivel_max_seguridad:
        metrica = ejecutar_carga(s, nivel)

        if metrica["error_rate"] > UMBRAL_ERROR_RATE:
            print(f"\n>>> Punto de quiebre encontrado: tasa de error {metrica['error_rate']*100:.1f}% en nivel {nivel}")
            break
        if metrica["promedio"] > UMBRAL_MS_PROMEDIO:
            print(f"\n>>> Punto de quiebre encontrado: latencia promedio {metrica['promedio']:.0f}ms en nivel {nivel}")
            break

        nivel += paso

    print("\n----Estadisticas por nivel------")
    for el in status:
        print(f"Nivel: {el['nivel']}, promedio: {el['promedio_ms']}ms, error_rate: {el['error_rate']*100:.1f}%")
    nombre=input("Ingresa nombre para guardar el CSV: ")
    guardar_csv(nombre)


if __name__ == "__main__":
    main()