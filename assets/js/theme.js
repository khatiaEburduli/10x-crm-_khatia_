const themeButton = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("crm_theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");

    if (themeButton) {
        themeButton.textContent = "☀️ Light Mode";
    }
}

if (themeButton) {
    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("crm_theme", "dark");
            themeButton.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("crm_theme", "light");
            themeButton.textContent = "🌙 Dark Mode";
        }
    });
}