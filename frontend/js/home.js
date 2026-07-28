document.addEventListener("DOMContentLoaded", () => {
if (!isAuthenticated()) {
    window.location.replace("index.html");
    return;
}

const session = getSession();
const userName = session?.nombre || session?.email?.split("@")[0] || "usuario";
const heroContainer = document.getElementById("hero");
const rowsContainer = document.getElementById("rows");
const searchInput = document.getElementById("search");
const userPill = document.getElementById("user-pill");

if (userPill) {
    userPill.textContent = `Hola, ${userName}`;
}

const catalog = [
    {
    id: 1,
    title: "Neon Horizon",
    year: "2024",
    duration: "2h 06m",
    rating: "8.9",
    genre: "Ciencia ficción",
    description: "Una corredora de alto riesgo se ve atrapada en una red orbital que amenaza la Tierra.",
    accent: "linear-gradient(135deg, #ff6a45 0%, #2f4dff 100%)",
    badge: "Nuevo",
    },
    {
    id: 2,
    title: "Luna Roja",
    year: "2023",
    duration: "1h 47m",
    rating: "7.8",
    genre: "Drama",
    description: "Un periodista investiga la caída de una ciudad aislada y descubre una verdad devastadora.",
    accent: "linear-gradient(135deg, #1b1036 0%, #5e2d7f 100%)",
    badge: "Top 10",
    },
    {
    id: 3,
    title: "Midnight Circuit",
    year: "2022",
    duration: "1h 54m",
    rating: "8.4",
    genre: "Acción",
    description: "Un piloto clandestino intenta salvar a su barrio de una corporación despiadada.",
    accent: "linear-gradient(135deg, #e4402c 0%, #0f172a 100%)",
    badge: "Destacado",
    },
    {
    id: 4,
    title: "Atlas de Cristal",
    year: "2024",
    duration: "2h 12m",
    rating: "8.2",
    genre: "Fantasia",
    description: "Una arqueóloga encuentra un mapa que revela secretos enterrados bajo la ciudad.",
    accent: "linear-gradient(135deg, #0f766e 0%, #1d4ed8 100%)",
    badge: "Novedad",
    },
    {
    id: 5,
    title: "Velocidad Silenciosa",
    year: "2021",
    duration: "1h 39m",
    rating: "7.6",
    genre: "Thriller",
    description: "Un convoy nocturno se convierte en un laberinto de decisiones imposibles.",
    accent: "linear-gradient(135deg, #23252f 0%, #4b5563 100%)",
    badge: "Suspenso",
    },
    {
    id: 6,
    title: "Paralela 9",
    year: "2025",
    duration: "1h 58m",
    rating: "8.7",
    genre: "Sci‑Fi",
    description: "La línea entre el sueño y la realidad se rompe para un grupo de vecinos.",
    accent: "linear-gradient(135deg, #3b82f6 0%, #0f172a 100%)",
    badge: "Nuevo",
    },
];

const rows = [
    { title: "Para ti", items: catalog.slice(0, 3) },
    { title: "Tendencias hoy", items: catalog.slice(3, 6) },
];

function createCard(item) {
    return `
    <article class="home-card" data-id="${item.id}">
        <a href="reproductor.html" class="home-card__link">
        <div class="home-card__poster" style="background:${item.accent};">
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

    const visibleRows = rows.map((row) => ({
    ...row,
    items: row.items.filter((item) => {
        const hayMatch = [item.title, item.genre, item.description, item.year].join(" ").toLowerCase().includes(normalized);
        return normalized ? hayMatch : true;
    }),
    }));

    heroContainer.innerHTML = "";
    rowsContainer.innerHTML = "";

    if (!normalized && visibleRows[0]?.items?.length) {
    const featured = visibleRows[0].items[0];
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

    if (normalized && !visibleRows.some((row) => row.items.length)) {
    rowsContainer.innerHTML = '<p class="home-empty">No encontramos resultados para esa búsqueda.</p>';
    return;
    }

    rowsContainer.innerHTML = visibleRows
    .filter((row) => row.items.length)
    .map(
        (row) => `
        <section class="home-row" aria-label="${row.title}">
            <div class="home-row__head">
            <h2>${row.title}</h2>
            <a href="favoritos.html">Ver todos</a>
            </div>
            <div class="home-grid">${row.items.map(createCard).join("")}</div>
        </section>
        `
    )
    .join("");
}

searchInput.addEventListener("input", (event) => renderCatalog(event.target.value));

document.getElementById("btn-home").addEventListener("click", () => {
    heroContainer.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("btn-favs").addEventListener("click", () => {
    window.location.href = "favoritos.html";
});

document.getElementById("btn-profile").addEventListener("click", () => {
    window.location.href = "perfil.html";
});

document.getElementById("btn-logout").addEventListener("click", () => {
    clearSession();
    window.location.href = "index.html";
});

renderCatalog();
});