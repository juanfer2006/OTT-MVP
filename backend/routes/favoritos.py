from flask import Blueprint, request

from middleware.auth_middleware import token_requerido
from services.favoritos_service import (agregar_favorito, obtener_favoritos, eliminar_favorito)

favoritos_bp = Blueprint("favoritos", __name__)


@favoritos_bp.route("/favoritos", methods=["POST"])
@token_requerido
def favoritos():

    datos = request.get_json()

    contenido_id = datos.get("contenido_id")

    usuario_id = request.usuario["usuario_id"]

    respuesta = agregar_favorito(
        usuario_id,
        contenido_id
    )

    return respuesta

@favoritos_bp.route("/favoritos", methods=["GET"])
@token_requerido
def listar_favoritos():

    usuario_id = request.usuario["usuario_id"]

    return obtener_favoritos(usuario_id)

@favoritos_bp.route("/favoritos/<int:contenido_id>", methods=["DELETE"])
@token_requerido
def borrar_favorito(contenido_id):

    usuario_id = request.usuario["usuario_id"]

    return eliminar_favorito(
        usuario_id,
        contenido_id
    )