document.addEventListener("DOMContentLoaded", () => {
if (!isAuthenticated()) {
    window.location.replace("index.html");
    return;
}

const video = document.getElementById("video");
const playBtn = document.getElementById("playBtn");
const btnFav = document.getElementById("btn-fav");
const btnDislike = document.getElementById("btn-dislike");

if (playBtn) {
    playBtn.addEventListener("click", () => {
    video.play().catch(() => {
        video.controls = true;
    });
    });
}

if (btnFav) {
    btnFav.addEventListener("click", () => {
    btnFav.textContent = "Guardado";
    btnFav.classList.add("is-active");
    });
}

if (btnDislike) {
    btnDislike.addEventListener("click", () => {
    btnDislike.textContent = "Dislike enviado";
    btnDislike.classList.add("is-active");
    });
}
});
