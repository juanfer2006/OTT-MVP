document.addEventListener("DOMContentLoaded", async () => {
  if (!isAuthenticated()) {
    window.location.replace("index.html");
    return;
  }

  const favoritesList = document.getElementById("favorites-list");

  if (!favoritesList) return;

  function normalizeFavorites(payload) {
    const source = payload?.favoritos || payload?.items || payload?.data || payload;
    if (Array.isArray(source)) {
      return source;
    }

    if (Array.isArray(payload?.results)) {
      return payload.results;
    }

    return [];
  }

  try {
    const payload = await getFavorites();
    const favorites = normalizeFavorites(payload);

    favoritesList.innerHTML = favorites.length
      ? favorites
          .map(
            (item) => `
              <article class="favorite-card glass-panel">
                <div class="favorite-card__poster" style="background:${item.accent || item.color || "linear-gradient(135deg, #ff6a45 0%, #2f4dff 100%)"};"></div>
                <div class="favorite-card__content">
                  <div class="favorite-card__top">
                    <div>
                      <p class="favorite-card__genre">${item.genre || item.genero || "Película"}</p>
                      <h2>${item.title || item.name || item.titulo || "Sin título"}</h2>
                    </div>
                    <span class="favorite-card__year">${item.year || item.anio || "—"}</span>
                  </div>
                  <p class="favorite-card__description">${item.description || item.descripcion || "Pronto verás aquí tus favoritos."}</p>
                  <div class="favorite-card__footer">
                    <span>${item.duration || item.duracion || "Sin datos"}</span>
                    <a class="btn-home-nav btn-home-nav--ghost" href="reproductor.html">Ver ahora</a>
                  </div>
                </div>
              </article>
            `
          )
          .join("")
      : '<p class="favorites-empty">Aún no tienes películas guardadas. Cuando el backend las envíe, aparecerán aquí.</p>';
  } catch (error) {
    favoritesList.innerHTML = `<p class="favorites-empty">${error.message || "No se pudieron cargar tus favoritos."}</p>`;
  }
});
