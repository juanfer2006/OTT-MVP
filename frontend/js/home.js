document.addEventListener("DOMContentLoaded", async () => {
  if (!isAuthenticated()) {
    window.location.replace("index.html");
    return;
  }

  const session = getSession();
  const userName = session?.nombre || session?.name || session?.email?.split("@")[0] || "usuario";
  const heroContainer = document.getElementById("hero");
  const rowsContainer = document.getElementById("rows");
  const searchInput = document.getElementById("search");
  const userPill = document.getElementById("user-pill");

  if (userPill) {
    userPill.textContent = `Hola, ${userName}`;
  }

  let catalogItems = [];

  function normalizeItem(item) {
    return {
      id: item.id,
      title: item.titulo,
      year: item.anio,
      duration: `${item.duracion} min`,
      genre: item.categoria,
      description: item.descripcion,

      poster: `${API_BASE_URL}/static/portadas/${item.ruta_portada}`,
      video: `${API_BASE_URL}/static/peliculas/${item.ruta_video}`,

      rating: "★",
      badge: "Nuevo"
    };
  }

  function normalizeCatalogPayload(payload) {
    const source = payload?.contenido || payload?.items || payload?.peliculas || payload?.data || payload;
    if (Array.isArray(source)) {
      return source.map(normalizeItem);
    }

    if (Array.isArray(payload?.results)) {
      return payload.results.map(normalizeItem);
    }

    return [];
  }

  function createCard(item) {
    return `
    <article class="home-card" data-id="${item.id}">
      <a href="reproductor.html?id=${item.id}" class="home-card__link">
        <div
          class="home-card__poster"
          style="
            background-image:url('${item.poster}');
            background-size:cover;
            background-position:center;
          "
        >
        
          <span class="home-card__badge">${item.badge}</span>
        </div>
      </a>
      <div class="home-card__content">
        <div class="home-card__meta">
          <span>${item.genre}</span>
          <span>${item.year}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="home-card__footer">
          <span>${item.duration}</span>
          <span>★ ${item.rating}</span>
        </div>
      </div>
    </article>
    `;
  }

  function renderCatalog(query = "") {
    const normalized = query.toLowerCase().trim();
    const visibleItems = catalogItems.filter((item) => {
      const hayMatch = [item.title, item.genre, item.description, item.year]
        .join(" ")
        .toLowerCase()
        .includes(normalized);

      return normalized ? hayMatch : true;
    });

    heroContainer.innerHTML = "";
    rowsContainer.innerHTML = "";

    if (!normalized && visibleItems.length) {
      const featured = visibleItems[0];
      heroContainer.innerHTML = `
        <div class="home-hero__panel" style="background:${featured.accent};">
          <div>
            <p class="home-hero__eyebrow">Hoy en StreamHub</p>
            <h2>${featured.title}</h2>
            <p>${featured.description}</p>
            <div class="home-hero__actions">
              <button class="home-hero__button" type="button">Reproducir</button>
              <button class="home-hero__button home-hero__button--ghost" type="button">Agregar a favoritos</button>
            </div>
          </div>
        </div>
      `;
    }

    if (normalized && !visibleItems.length) {
      rowsContainer.innerHTML = '<p class="home-empty">No encontramos resultados para esa búsqueda.</p>';
      return;
    }

    rowsContainer.innerHTML = `
      <section class="home-row" aria-label="Contenido recomendado">
        <div class="home-row__head">
          <h2>Contenido recomendado</h2>
          <a href="favoritos.html">Ver todos</a>
        </div>
        <div class="home-grid">${visibleItems.map(createCard).join("")}</div>
      </section>
    `;
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => renderCatalog(event.target.value));
  }

  document.getElementById("btn-home")?.addEventListener("click", () => {
    heroContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("btn-favs")?.addEventListener("click", () => {
    window.location.href = "favoritos.html";
  });

  document.getElementById("btn-profile")?.addEventListener("click", () => {
    window.location.href = "perfil.html";
  });

  document.getElementById("btn-logout")?.addEventListener("click", async () => {

    try {

      await apiRequest("/cerrar_sesion", {
        method: "POST"
      });

    } catch (e) {}

    clearSession();

    window.location.href = "index.html";

  });

  try {
    const payload = await getCatalog();
    catalogItems = normalizeCatalogPayload(payload);
    renderCatalog();
  } catch (error) {
    rowsContainer.innerHTML = `<p class="home-empty">${error.message || "No se pudo cargar el catálogo."}</p>`;
  }
});