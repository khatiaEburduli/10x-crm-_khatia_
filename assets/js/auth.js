// Check if a user session already exists
const currentUser = JSON.parse(localStorage.getItem("crm_session"));

// If the user is already logged in and is on the login or signup page,
// redirect them straight to the dashboard
if (
    currentUser &&
    (
        window.location.pathname.includes("index.html") ||
        window.location.pathname.includes("signup.html")
    )
) {
    window.location.href = "dashboard.html";
}

// Get reference to the signup form
const signupForm = document.getElementById("signupForm");

// Only attach the submit handler if the signup form exists on this page
if (signupForm) {

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Grab and sanitize form field values
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const company = document.getElementById("company").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Regex pattern used to validate basic email format
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
            showFieldError("email", "Email is required");
            hasError = true;
        }

        if (!emailPattern.test(email)) {
    showFieldError(
        "email",
        "Please enter a valid email address"
    );

    hasError = true;
}

        // Password Validation
        if (password.length < 8) {
            showFieldError("password", "Password must be at least 8 characters");
            hasError = true;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) {
    showFieldError(
        "password",
        "Password must be at least 8 characters and contain a letter and a number"
    );
    hasError = true;  
}

        // Confirm Password Validation
        if (password !== confirmPassword) {
            showFieldError("confirmPassword", "Passwords do not match");
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

        showToast("Account created successfully! Please log in");

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1500);

       
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
const sessionUser = {

    fullName: user.fullName,

    email: user.email

};

localStorage.setItem(
    "crm_session",
    JSON.stringify(sessionUser)
);



showToast("Login successful!");


    window.location.href = "dashboard.html";


        
    });

}
