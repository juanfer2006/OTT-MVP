from database_connection import obtener_conexion


def obtener_perfil(usuario_id):

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            id,
            nombre,
            apellido,
            correo,
            region_id
        FROM usuario
        WHERE id = %s
    """, (usuario_id,))

    usuario = cursor.fetchone()

    cursor.close()
    conexion.close()

    if not usuario:

        return {
            "success": False,
            "mensaje": "Usuario no encontrado."
        }

    return {
        "success": True,
        "usuario": usuario
    }