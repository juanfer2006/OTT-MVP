/* ==========================================================================
StreamFlix · login.js
Maneja únicamente la interfaz del formulario de inicio de sesión:
    - Mostrar / ocultar contraseña
    - Validar que los campos no estén vacíos (y formato básico de correo)
No realiza ninguna petición a un backend/API todavía.
========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
if (isAuthenticated()) {
    window.location.replace("home.html");
    return;
}

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");
const rememberCheckbox = document.getElementById("remember");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

togglePasswordBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordBtn.setAttribute("aria-pressed", String(isHidden));
    togglePasswordBtn.setAttribute("aria-label", isHidden ? "Ocultar contraseña" : "Mostrar contraseña");
});

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

emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() !== "") clearError("email");
});

passwordInput.addEventListener("input", () => {
    if (passwordInput.value.trim() !== "") clearError("password");
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
    const firstInvalid = !isEmailValid ? emailInput : passwordInput;
    firstInvalid.focus();
    return;
    }

    const user = authenticateUser(emailInput.value.trim(), passwordInput.value);

    if (!user) {
    setError("password", "Correo o contraseña incorrectos.");
    return;
    }

    loginBtn.classList.add("is-loading");
    loginBtn.disabled = true;

    saveSession({ ...user, remember: rememberCheckbox.checked });

    setTimeout(() => {
    window.location.href = "home.html";
    }, 700);
});
});