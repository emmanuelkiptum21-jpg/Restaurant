


const menuOpenButton = document.getElementById("menu-open-button");
const menuCloseButton = document.getElementById("menu-close-button");
const navMenu = document.querySelector(".nav-menu");

// Open mobile menu
menuOpenButton.addEventListener("click", () => {
    navMenu.style.left = "0"; // slide in
});

// Close mobile menu
menuCloseButton.addEventListener("click", () => {
    navMenu.style.left = "-300px"; // slide out
});


