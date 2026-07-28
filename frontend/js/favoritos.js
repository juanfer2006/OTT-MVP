document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated()) {
    window.location.replace("index.html");
    return;
  }

  const favoritesList = document.getElementById("favorites-list");

  const favorites = [];

  if (!favoritesList) return;

  favoritesList.innerHTML = favorites.length
    ? favorites
        .map(
          (item) => `
            <article class="favorite-card glass-panel">
              <div class="favorite-card__poster" style="background:${item.accent || "linear-gradient(135deg, #ff6a45 0%, #2f4dff 100%)"};"></div>
              <div class="favorite-card__content">
                <div class="favorite-card__top">
                  <div>
                    <p class="favorite-card__genre">${item.genre || "Película"}</p>
                    <h2>${item.title || "Sin título"}</h2>
                  </div>
                  <span class="favorite-card__year">${item.year || "—"}</span>
                </div>
                <p class="favorite-card__description">${item.description || "Pronto verás aquí tus favoritos."}</p>
                <div class="favorite-card__footer">
                  <span>${item.duration || "Sin datos"}</span>
                  <a class="btn-home-nav btn-home-nav--ghost" href="reproductor.html">Ver ahora</a>
                </div>
              </div>
            </article>
          `
        )
        .join("")
    : '<p class="favorites-empty">Aún no tienes películas guardadas. Cuando el backend las envíe, aparecerán aquí.</p>';
});
