function showFieldError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + "Error");

    input.classList.add("input-error");
    error.textContent = message;
}


function clearFieldError(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + "Error");

    input.classList.remove("input-error");
    error.textContent = "";
}

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.style.visibility = "visible";
    toast.style.opacity = "1";

    setTimeout(function () {
        toast.style.opacity = "0";
        toast.style.visibility = "hidden";
    }, 3000);
}
