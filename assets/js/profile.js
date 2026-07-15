const currentUser = JSON.parse(localStorage.getItem("crm_session"));

if (!currentUser) {
    window.location.href = "index.html";
}

document.getElementById("profileName").textContent = currentUser.fullName;

document.getElementById("profileEmail").textContent = currentUser.email;

document.getElementById("profileCompany").textContent =
    currentUser.company || "No company";

document.getElementById("memberDate").textContent =
    new Date(currentUser.createdAt).toLocaleDateString();

const initials = currentUser.fullName
    .split(" ")
    .map(function (word) {
        return word[0];
    })
    .join("")
    .toUpperCase();

document.getElementById("avatar").textContent = initials;

document.getElementById("fullName").value = currentUser.fullName;

document.getElementById("company").value = currentUser.company || "";



const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const company = document.getElementById("company").value.trim();

    clearFieldError("fullName");
    clearFieldError("company");

    if (fullName.length < 3) {
        showFieldError(
            "fullName",
            "Full Name must contain at least 3 characters."
        );
        return;
    }

    if (company === "") {
        showFieldError(
            "company",
            "Company is required."
        );
        return;
    }

    const users = JSON.parse(localStorage.getItem("crm_users")) || [];

    const user = users.find(function (item) {
        return item.email === currentUser.email;
    });

    user.fullName = fullName;
    user.company = company;

    localStorage.setItem("crm_users", JSON.stringify(users));

    currentUser.fullName = fullName;
    currentUser.company = company;

    localStorage.setItem("crm_session", JSON.stringify(currentUser));

    document.getElementById("profileName").textContent = fullName;
    document.getElementById("profileCompany").textContent = company;

    const initials = fullName
        .split(" ")
        .map(function (word) {
            return word[0];
        })
        .join("")
        .toUpperCase();

    document.getElementById("avatar").textContent = initials;

    showToast("Profile updated successfully!");

});




const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("crm_session");

    window.location.href = "index.html";

});


const passwordForm = document.getElementById("passwordForm");

passwordForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    clearFieldError("currentPassword");
    clearFieldError("newPassword");
    clearFieldError("confirmPassword");

    if (currentPassword === "") {
        showFieldError("currentPassword", "Current password is required.");
        return;
    }

    if (currentPassword !== currentUser.password) {
        showFieldError("currentPassword", "Current password is incorrect.");
        return;
    }

    if (
    newPassword.length < 8 ||
    !/[A-Za-z]/.test(newPassword) ||
    !/[0-9]/.test(newPassword)
) {
    showFieldError(
        "newPassword",
        "Password must be at least 8 characters and contain a letter and a number."
    );
    return;
}

    if (newPassword === currentPassword) {
        showFieldError(
            "newPassword",
            "New password must be different from current password."
        );
        return;
    }

    if (confirmPassword !== newPassword) {
        showFieldError(
            "confirmPassword",
            "Passwords do not match."
        );
        return;
    }

    const users = JSON.parse(localStorage.getItem("crm_users")) || [];

    const user = users.find(function (item) {
        return item.email === currentUser.email;
    });

    user.password = newPassword;

    localStorage.setItem("crm_users", JSON.stringify(users));

    currentUser.password = newPassword;

    localStorage.setItem("crm_session", JSON.stringify(currentUser));

    passwordForm.reset();

    showToast("Password changed successfully!");

});




const resetDataBtn = document.getElementById("resetDataBtn");

resetDataBtn.addEventListener("click", function () {

    const isConfirmed = confirm(
        "Are you sure you want to delete all clients?"
    );

    if (!isConfirmed) {
        return;
    }

    localStorage.removeItem("crm_clients");

    showToast("CRM data has been reset successfully!");

});