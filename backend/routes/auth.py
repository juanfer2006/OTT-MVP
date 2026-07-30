from flask import Blueprint, request
from services.auth_service import registrar_usuario, iniciar_sesion

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/registro", methods=["POST"])
def registro():

    datos = request.get_json()

    nombre = datos.get("nombre")
    apellido = datos.get("apellido")
    correo = datos.get("correo")
    contraseña = datos.get("contraseña")
    region_id = datos.get("region_id")

    respuesta = registrar_usuario(
        nombre,
        apellido,
        correo,
        contraseña,
        region_id
    )

    return respuesta

@auth_bp.route("/login", methods=["POST"])
def login():

    datos = request.get_json()

    correo = datos.get("correo")
    contraseña = datos.get("contraseña")

    respuesta = iniciar_sesion(
        correo,
        contraseña
    )

    return respuesta

