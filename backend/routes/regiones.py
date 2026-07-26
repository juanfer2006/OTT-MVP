from flask import Blueprint
from database_connection import obtener_conexion

regiones_bp = Blueprint("regiones", __name__)

@regiones_bp.route("/regiones", methods=["GET"])
def obtener_regiones():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.execute("SELECT * FROM region")

    regiones = cursor.fetchall()

    cursor.close()
    conexion.close()

    return regiones

