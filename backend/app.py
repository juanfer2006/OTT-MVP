from flask import Flask
from database_connection import obtener_conexion

app = Flask(__name__)

@app.route("/")
def inicio():
    try:
        conexion = obtener_conexion()
        conexion.close()

        return {
            "mensaje": "Backend conectado correctamente con MySQL"
        }

    except Exception as e:
        return {
            "error": str(e)
        }, 500


if __name__ == "__main__":
    app.run(debug=True)