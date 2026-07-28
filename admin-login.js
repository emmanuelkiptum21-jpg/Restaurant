document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("admin-login-form");
    const email = document.getElementById("admin-email");
    const password = document.getElementById("admin-password");
    const togglePassword = document.querySelector(".toggle-password");

    // Show / Hide Password
    if (togglePassword) {

        togglePassword.addEventListener("click", () => {

            if (password.type === "password") {

                password.type = "text";
                togglePassword.classList.remove("fa-eye");
                togglePassword.classList.add("fa-eye-slash");

            } else {

                password.type = "password";
                togglePassword.classList.remove("fa-eye-slash");
                togglePassword.classList.add("fa-eye");

            }

        });

    }

    // Login
    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const adminEmail = "admin@tastyeataly.com";
        const adminPassword = "12345";

        if (
            email.value.trim() === adminEmail &&
            password.value.trim() === adminPassword
        ) {

            localStorage.setItem("adminLogin", "true");

            alert("Login Successful!");

            window.location.href = "admin.html";

        } else {

            alert("Invalid email or password.");

        }

    });

});