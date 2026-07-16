const currentUser = JSON.parse(localStorage.getItem("crm_session"));

if (!currentUser) {
    window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("crm_session");
        window.location.href = "index.html";
    });
}