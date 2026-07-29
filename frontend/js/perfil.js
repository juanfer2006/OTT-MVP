document.addEventListener("DOMContentLoaded", async () => {
  if (!isAuthenticated()) {
    window.location.replace("index.html");
    return;
  }

  const session = getSession();

  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");
  const profileNameDetail = document.getElementById("profile-name-detail");
  const profileEmailDetail = document.getElementById("profile-email-detail");
  const profilePlan = document.getElementById("profile-plan");
  const profileRegion = document.getElementById("profile-region");
  const profileWatchtime = document.getElementById("profile-watchtime");

  function renderProfile(data) {
    const name = data?.nombre || data?.name || data?.email?.split("@")[0] || session?.nombre || session?.name || "Usuario";
    const email = data?.email || data?.correo || session?.email || session?.correo || "usuario@streamhub.com";
    const region = data?.region || data?.pais || session?.region || "Colombia";

    if (profileName) profileName.textContent = name;
    if (profileEmail) profileEmail.textContent = email;
    if (profileNameDetail) profileNameDetail.textContent = name;
    if (profileEmailDetail) profileEmailDetail.textContent = email;
    if (profilePlan) profilePlan.textContent = data?.plan || "Plan Básico";
    if (profileRegion) profileRegion.textContent = region;
    if (profileWatchtime) profileWatchtime.textContent = data?.watchtime || data?.tiempo_visto || "12h";
  }

  try {
    const profilePayload = await getProfile();
    const userData = profilePayload?.usuario || profilePayload?.user || profilePayload?.data || profilePayload;
    renderProfile(userData);
  } catch (error) {
    renderProfile(session);
  }
});
