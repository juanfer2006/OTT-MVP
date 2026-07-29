const STREAMHUB_AUTH_KEY = "streamhub_auth";
const STREAMHUB_USERS_KEY = "streamhub_users";

const API_BASE_URL = (window.API_BASE_URL || "http://127.0.0.1:5000").replace(/\/$/, "");
const API_ENDPOINTS = {
  login: window.API_ENDPOINTS?.login || "/login",
  register: window.API_ENDPOINTS?.register || "/registro",
  recoverPassword: window.API_ENDPOINTS?.recoverPassword || "/recuperar-password",
  profile: window.API_ENDPOINTS?.profile || "/perfil",
  catalog: window.API_ENDPOINTS?.catalog || "/contenido",
  favorites: window.API_ENDPOINTS?.favorites || "/favoritos"
};

function getRegisteredUsers() {
  return [];
}

function saveRegisteredUsers() {
  localStorage.removeItem(STREAMHUB_USERS_KEY);
}

function normalizeSessionPayload(payload) {
  const user = payload?.usuario || payload?.user || payload?.data?.usuario || payload?.data?.user || payload?.data || payload;
  const token = payload?.token || payload?.access_token || payload?.accessToken || payload?.data?.token || payload?.data?.access_token || null;

  return {
    ...(user && typeof user === "object" ? user : {}),
    token,
    ...(payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {})
  };
}

async function apiRequest(path, options = {}) {
  const headers = { ...(options.headers || {}) };

  if (options.body && !(options.body instanceof FormData) && !headers["Content-Type"] && !headers["content-type"]) {
    headers["Content-Type"] = "application/json";
  }

  const session = getSession();
  if (options.auth !== false && session?.token) {
    headers.Authorization = `Bearer ${session.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    ...options,
    headers
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.mensaje || payload?.message || payload?.error || "No se pudo completar la solicitud.";
    throw new Error(message);
  }

  return payload;
}

async function authenticateUser(email, password) {
  const payload = await apiRequest(API_ENDPOINTS.login, {
    method: "POST",
    body: JSON.stringify({
      correo: email,
      email,
      password,
      contraseña: password
    })
  });

  const session = normalizeSessionPayload(payload);
  saveSession(session);
  return session;
}

async function registerUser(user) {
  const payload = await apiRequest(API_ENDPOINTS.register, {
    method: "POST",
    body: JSON.stringify({
      nombre: user.nombre || user.name || "",
      correo: user.email,
      email: user.email,
      password: user.password,
      contraseña: user.password,
      region: user.region || ""
    })
  });

  const session = normalizeSessionPayload(payload);
  saveSession(session);
  return session;
}

async function requestPasswordRecovery(email, newPassword) {
  return apiRequest(API_ENDPOINTS.recoverPassword, {
    method: "POST",
    body: JSON.stringify({
      correo: email,
      nueva_password: newPassword
    })
  });
}

async function getProfile() {
  return apiRequest(API_ENDPOINTS.profile, { method: "GET" });
}

async function getCatalog() {
  return apiRequest(API_ENDPOINTS.catalog, { method: "GET" });
}

async function getFavorites() {
  return apiRequest(API_ENDPOINTS.favorites, { method: "GET" });
}

function saveSession(user) {
  if (!user) return;
  localStorage.setItem(STREAMHUB_AUTH_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(STREAMHUB_AUTH_KEY);
}

function getSession() {
  try {
    const raw = localStorage.getItem(STREAMHUB_AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("No se pudo leer la sesión activa.", error);
    return null;
  }
}

function isAuthenticated() {
  const session = getSession();
  return Boolean(session && (session.token || session.access_token || session.email || session.correo));
}
