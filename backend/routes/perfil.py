from flask import Blueprint, request

from middleware.auth_middleware import token_requerido
from services.perfil_service import obtener_perfil

perfil_bp = Blueprint("perfil", __name__)


@perfil_bp.route("/perfil", methods=["GET"])
@token_requerido
def perfil():

    usuario_id = request.usuario["usuario_id"]

    return obtener_perfil(usuario_id)