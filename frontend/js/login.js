/* ==========================================================================
StreamFlix · login.js
Maneja únicamente la interfaz del formulario de inicio de sesión:
    - Mostrar / ocultar contraseña
    - Validar que los campos no estén vacíos (y formato básico de correo)
No realiza ninguna petición a un backend/API todavía.
========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ *
* Mostrar / ocultar contraseña
* ------------------------------------------------------------------ */
togglePasswordBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordBtn.setAttribute("aria-pressed", String(isHidden));
    togglePasswordBtn.setAttribute(
    "aria-label",
    isHidden ? "Ocultar contraseña" : "Mostrar contraseña"
    );
});

/* ------------------------------------------------------------------ *
* Utilidades de validación
* ------------------------------------------------------------------ */
function setError(fieldName, message) {
    const group = form.querySelector(`[data-field="${fieldName}"]`);
    const errorEl = document.getElementById(`${fieldName}Error`);

    if (!group || !errorEl) return;

    group.classList.add("has-error");
    errorEl.textContent = message;
}

function clearError(fieldName) {
    const group = form.querySelector(`[data-field="${fieldName}"]`);
    const errorEl = document.getElementById(`${fieldName}Error`);

    if (!group || !errorEl) return;

    group.classList.remove("has-error");
    errorEl.textContent = "";
}

function validateEmail() {
    const value = emailInput.value.trim();

    if (value === "") {
    setError("email", "Ingresa tu correo electrónico.");
    return false;
    }

    if (!EMAIL_REGEX.test(value)) {
    setError("email", "Ingresa un correo electrónico válido.");
    return false;
    }

    clearError("email");
    return true;
}

function validatePassword() {
    const value = passwordInput.value;

    if (value.trim() === "") {
    setError("password", "Ingresa tu contraseña.");
    return false;
    }

    clearError("password");
    return true;
}

/* Limpia el error apenas el usuario empieza a corregir el campo */
emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() !== "") clearError("email");
});

passwordInput.addEventListener("input", () => {
    if (passwordInput.value.trim() !== "") clearError("password");
});

/* ------------------------------------------------------------------ *
* Envío del formulario (solo validación de interfaz por ahora)
* ------------------------------------------------------------------ */
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
    const firstInvalid = !isEmailValid ? emailInput : passwordInput;
    firstInvalid.focus();
    return;
    }

    // Estado de carga simulado en la interfaz.
    // La conexión real con el backend (Flask + JWT) se integrará más adelante en api.js.
    loginBtn.classList.add("is-loading");
    loginBtn.disabled = true;

    setTimeout(() => {
    loginBtn.classList.remove("is-loading");
    loginBtn.disabled = false;

    console.log("Formulario válido. Datos listos para enviar al backend:", {
        email: emailInput.value.trim(),
        password: passwordInput.value,
        remember: document.getElementById("remember").checked,
    });
    }, 900);
});
});