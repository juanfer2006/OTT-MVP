from flask import Flask
from rutas.regiones import regiones_bp

app = Flask(__name__)

app.register_blueprint(regiones_bp)

@app.route("/")
def inicio():
    return {
        "mensaje": "Backend OTT funcionando correctamente 🚀"
    }

if __name__ == "__main__":
    app.run(debug=True)