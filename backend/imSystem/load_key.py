from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import ed25519
from dotenv import load_dotenv
import os
def get_GLOBAL_key():
    try:

        with open("../id_ed25519.pem", 'rb') as key_file:
            private_key_data = key_file.read()
        return private_key_data
    except FileNotFoundError as fnf:
        raise RuntimeError(str(fnf))
    
load_dotenv("../.mikufile")

pwd = os.getenv("PRIVATE_KEY")
if not pwd:
    raise EnvironmentError("Failed to load ENV(.mikufile) file")
private_key =  get_GLOBAL_key()
GLOBAL_PRIVATE_KEY = serialization.load_pem_private_key(private_key,
        password=pwd.encode('utf-8'),
        backend=default_backend())
