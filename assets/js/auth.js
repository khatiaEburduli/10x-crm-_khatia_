const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const company = document.getElementById("company").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    clearFieldError("fullName");

     if (fullName.length < 3) { //მინიმუმ 3 ასოს უნდა შეიცაავდეს სახელი
        showFieldError("fullName", "Full Name must contain at least 3 characters.");
        return;
    }

    if (email === "") {  //ეს ამმოწმებს ჩაწერილია საერთოდ მეილი თუ არა
    alert("Email is required.");
    return;
}

if (!email.includes("@")) { // ეს ამოწმებს სწორ ფორმატში არის თუ არა ჩაწერილი
    alert("Please enter a valid email.");
    return;
}

if (password.length <8) {
    alert("Password must be at least 8 characters");
    return;
}
if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
}

alert("Registration Successful!");


     console.log(fullName);
     console.log(email);
     console.log(company);
     console.log(password);
     console.log(confirmPassword);
});
