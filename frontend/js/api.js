const STREAMHUB_AUTH_KEY = "streamhub_auth";
const STREAMHUB_USERS_KEY = "streamhub_users";

function getRegisteredUsers() {
try {
    const parsed = JSON.parse(localStorage.getItem(STREAMHUB_USERS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
} catch (error) {
    console.warn("No se pudieron leer los usuarios guardados.", error);
    return [];
}
}

function saveRegisteredUsers(users) {
localStorage.setItem(STREAMHUB_USERS_KEY, JSON.stringify(users));
}

function registerUser(user) {
const users = getRegisteredUsers();
const alreadyExists = users.some((item) => item.email.toLowerCase() === user.email.toLowerCase());

if (alreadyExists) {
    return null;
}

users.push({
    id: Date.now(),
    nombre: user.nombre || user.name || "",
    email: user.email,
    password: user.password,
    region: user.region || "",
});

saveRegisteredUsers(users);
saveSession(users[users.length - 1]);
return users[users.length - 1];
}

function authenticateUser(email, password) {
const users = getRegisteredUsers();
const normalizedEmail = (email || "").trim().toLowerCase();

return users.find((user) => user.email.toLowerCase() === normalizedEmail && user.password === password) || null;
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
return Boolean(getSession());
}
