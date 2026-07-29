from flask import Flask

from routes.regiones import regiones_bp
from routes.auth import auth_bp
from routes.favoritos import favoritos_bp
from routes.historial import historial_bp
from routes.dislikes import dislikes_bp
from routes.contenido import contenido_bp
from routes.recomendaciones import recomendaciones_bp
from routes.contenido_detalle_routes import contenido_detalle_bp
from routes.busqueda_routes import busqueda_bp
from routes.categoria_routes import categoria_bp
from routes.seguir_viendo_routes import seguir_viendo_bp
from routes.recuperar_contrasena_routes import recuperar_contrasena_bp
from routes.cerrar_sesion_routes import cerrar_sesion_bp

app = Flask(__name__)

app.register_blueprint(regiones_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(recuperar_contrasena_bp)
app.register_blueprint(categoria_bp)
app.register_blueprint(busqueda_bp)
app.register_blueprint(contenido_detalle_bp)
app.register_blueprint(recomendaciones_bp)
app.register_blueprint(contenido_bp)
app.register_blueprint(dislikes_bp)
app.register_blueprint(historial_bp)
app.register_blueprint(favoritos_bp)
app.register_blueprint(seguir_viendo_bp)
app.register_blueprint(cerrar_sesion_bp)


@app.route("/")
def inicio():
    return {
        "mensaje": "Backend OTT funcionando correctamente"
    }


if __name__ == "__main__":
    app.run(debug=True)