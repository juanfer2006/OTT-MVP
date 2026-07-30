document.addEventListener("DOMContentLoaded", async () => {

    if (!isAuthenticated()) {
        window.location.replace("index.html");
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (!id) {
        window.location.href = "home.html";
        return;
    }

    try {

        const respuesta = await getContenido(id);

        const pelicula = respuesta.contenido;

        document.getElementById("video-title").textContent =
            pelicula.titulo;

        document.getElementById("video-description").textContent =
            pelicula.descripcion;

        document.getElementById("video-genre").textContent =
            pelicula.categoria;

        document.getElementById("video-year").textContent =
            pelicula.anio;

        document.getElementById("video-duration").textContent =
            pelicula.duracion + " min";

        const video = document.getElementById("video");

        video.poster =
            `${API_BASE_URL}/static/portadas/${pelicula.ruta_portada}`;

        video.src =
            `${API_BASE_URL}/static/peliculas/${pelicula.ruta_video}`;

        video.load();

    } catch (error) {

        alert(error.message);

        window.location.href = "home.html";
    }

    // -------- FAVORITOS --------

    const btnFav = document.getElementById("btn-fav");

    if (btnFav) {

        btnFav.addEventListener("click", async () => {

            try {

                await agregarFavorito(id);

                btnFav.textContent = "Guardado";

                btnFav.classList.add("is-active");

            } catch (error) {

                alert(error.message);

            }

        });

    }

    // -------- DISLIKES --------

    const btnDislike = document.getElementById("btn-dislike");

    let tieneDislike = false;

    if (btnDislike) {

        btnDislike.addEventListener("click", async () => {

            try {

                if (!tieneDislike) {

                    await agregarDislike(id);

                    btnDislike.textContent = "Quitar dislike";

                    btnDislike.classList.add("is-active");

                    tieneDislike = true;

                } else {

                    await eliminarDislike(id);

                    btnDislike.textContent = "Dar dislike";

                    btnDislike.classList.remove("is-active");

                    tieneDislike = false;

                }

            } catch (error) {

                alert(error.message);

            }

        });


    }

});