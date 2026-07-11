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