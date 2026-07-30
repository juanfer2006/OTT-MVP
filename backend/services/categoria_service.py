from database_connection import obtener_conexion


def obtener_por_categoria(categoria):

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM contenido
        WHERE categoria = %s
        ORDER BY titulo
    """, (categoria,))

    peliculas = cursor.fetchall()

    cursor.close()
    conexion.close()

    return {
        "success": True,
        "categoria": categoria,
        "contenido": peliculas
    }