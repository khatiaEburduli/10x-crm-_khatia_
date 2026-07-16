const currentUser = JSON.parse(localStorage.getItem("crm_session"));

if (
    currentUser &&
    (
        window.location.pathname.includes("index.html") ||
        window.location.pathname.includes("signup.html")
    )
) {
    window.location.href = "dashboard.html";
}

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const company = document.getElementById("company").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Clear previous errors
        clearFieldError("fullName");
        clearFieldError("email");
        clearFieldError("password");
        clearFieldError("confirmPassword");

        let hasError = false;

        // Full Name Validation
        if (fullName.length < 3) {
            showFieldError("fullName", "Full name must be at least 3 characters");
            hasError = true;
        }

        // Email Validation
        if (email === "") {
            showFieldError("email", "Email is required.");
            hasError = true;
        }

        if (!emailPattern.test(email)) {
    showFieldError(
        "email",
        "Please enter a valid email address."
    );

    hasError = true;
}

        // Password Validation
        if (password.length < 8) {
            showFieldError("password", "Password must be at least 8 characters.");
            hasError = true;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) {
    showFieldError(
        "password",
        "Password must be at least 8 characters and contain a letter and a number."
    );
    hasError = true;
}

        // Confirm Password Validation
        if (password !== confirmPassword) {
            showFieldError("confirmPassword", "Passwords do not match.");
            hasError = true;
        }

        const user = {
            id: Date.now(),
            fullName: fullName,
            email: email,
            company: company,
            password: password,
            createdAt: new Date().toISOString()
        };

        const users = JSON.parse(localStorage.getItem("crm_users")) || [];

        const existingUser = users.find(function (item) {
    return item.email === email;
});

if (existingUser) {
    showFieldError(
        "email",
        "An account with this email already exists."
    );
    hasError = true;
}

if (hasError) {
    return;
}

        users.push(user);

        localStorage.setItem("crm_users", JSON.stringify(users));

        showToast("Registration Successful!");

        setTimeout(function () {
            window.location.href = "index.html";
        }, 2000);

        console.log(fullName);
        console.log(email);
        console.log(company);
        console.log(password);
        console.log(confirmPassword);
    });

}

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        clearFieldError("loginEmail");
        clearFieldError("loginPassword");

        const users = JSON.parse(localStorage.getItem("crm_users")) || [];
        let hasError = false;

if (email === "") {
    showFieldError("loginEmail", "Email is required");
    hasError = true;
}

if (password === "") {
    showFieldError("loginPassword", "Password is required");
    hasError = true;
}

if (hasError) {
    return;
}

        const user = users.find(function (item) {
            return item.email === email;
        });

       
        if (!user || user.password !== password) {
    showFieldError("loginPassword", "Invalid email or password");
    return;
}
        localStorage.setItem("crm_session", JSON.stringify(user));

showToast("Login successful!");

setTimeout(function () {
    window.location.href = "dashboard.html";
}, 2000);

        console.log("Login Successful!");

    });

}
