
const currentUser = JSON.parse(localStorage.getItem("crm_session"));

console.log(currentUser);

if (!currentUser) {
    window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("crm_session");
    window.location.href = "index.html";
});

const addClientBtn = document.getElementById("addClientBtn");

if (addClientBtn) {
    addClientBtn.addEventListener("click", function () {
        window.location.href = "clients.html";
    });
}