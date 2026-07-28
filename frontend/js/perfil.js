document.addEventListener("DOMContentLoaded", () => {
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

  if (session) {
    const name = session.nombre || session.email?.split("@")[0] || "Usuario";
    const email = session.email || "usuario@streamhub.com";

    if (profileName) profileName.textContent = name;
    if (profileEmail) profileEmail.textContent = email;
    if (profileNameDetail) profileNameDetail.textContent = name;
    if (profileEmailDetail) profileEmailDetail.textContent = email;
    if (profilePlan) profilePlan.textContent = "Plan Básico";
    if (profileRegion) profileRegion.textContent = session.region || "Colombia";
    if (profileWatchtime) profileWatchtime.textContent = "12h";
  }
});
