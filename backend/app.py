from flask import Flask

from routes.regiones import regiones_bp
from routes.auth import auth_bp
from routes.favoritos import favoritos_bp

app = Flask(__name__)

app.register_blueprint(regiones_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(favoritos_bp)


@app.route("/")
def inicio():
    return {
        "mensaje": "Backend OTT funcionando correctamente"
    }


if __name__ == "__main__":
    app.run(debug=True)