const loginForm = document.getElementById("admin-login-form");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("admin-email").value.trim();
    const password = document.getElementById("admin-password").value.trim();

    const adminEmail = "admin@tastyeataly.com";
    const adminPassword = "12345";

    if (email === adminEmail && password === adminPassword) {

        localStorage.setItem("adminLogin", "true");

        alert("Login Successful!");

        window.location.href = "admin.html";

    } else {

        alert("Invalid email or password.");

    }

});