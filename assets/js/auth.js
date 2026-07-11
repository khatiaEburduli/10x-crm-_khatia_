const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const company = document.getElementById("company").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Clear previous errors
    clearFieldError("fullName");
    clearFieldError("email");
    clearFieldError("password");
    clearFieldError("confirmPassword");

    // Full Name Validation
    if (fullName.length < 3) {
        showFieldError("fullName", "Full Name must contain at least 3 characters.");
        return;
    }

    // Email Validation
    if (email === "") {
        showFieldError("email", "Email is required.");
        return;
    }

    if (!email.includes("@")) {
        showFieldError("email", "Please enter a valid email.");
        return;
    }

    // Password Validation
    if (password.length < 8) {
        showFieldError("password", "Password must be at least 8 characters.");
        return;
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
        showFieldError("confirmPassword", "Passwords do not match.");
        return;
    }

    alert("Registration Successful!");

    console.log(fullName);
    console.log(email);
    console.log(company);
    console.log(password);
    console.log(confirmPassword);
});