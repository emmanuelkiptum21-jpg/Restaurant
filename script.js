// home page
const orderButton = document.querySelector(".order-now");
const contactButton = document.querySelector(".contact-us");

// Order Button
if (orderButton) {
  orderButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./menu.html";
  });
}
// Contact Button
if (contactButton) {
  contactButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./contact.html";
  });
}


// Menu page


document.addEventListener("DOMContentLoaded", () => {

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemCount = document.querySelector(".cart-icon span");
  const cartItemsList = document.querySelector(".cart-item");
  const cartTotal = document.querySelector(".cart-total");
  const cartIcon = document.querySelector(".cart-icon");
  const sidebar = document.getElementById("sidebar");
  const closeButton = document.querySelector(".sidebar-close");

  let cartItems = [];
  let totalAmount = 0;

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {

      const name = document.querySelectorAll(".card-title")[index].textContent;
      const price = parseFloat(
        document.querySelectorAll(".price")[index]
          .textContent.replace("Ksh ", "")
      );

      const existingItem = cartItems.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push({ name, price, quantity: 1 });
      }

      totalAmount += price;
      updateCart();
    });
  });

  function updateCart() {
    cartItemCount.textContent = cartItems.length;
    updateCartList();
    cartTotal.textContent = `Ksh ${totalAmount.toFixed(2)}`;
  }

  function updateCartList() {
    cartItemsList.innerHTML = "";

    cartItems.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("indivdual-cart-item");

      div.innerHTML = `
        <span>${item.quantity}x ${item.name}</span>
        <span>
          Ksh ${(item.price * item.quantity).toFixed(2)}
          <button data-index="${index}" class="remove-btn">X</button>
        </span>
      `;

      cartItemsList.appendChild(div);
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        removeItem(index);
      });
    });
  }

  function removeItem(index) {
    const removed = cartItems.splice(index, 1)[0];
    totalAmount -= removed.price * removed.quantity;
    updateCart();
  }

  cartIcon.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
  });

  closeButton.addEventListener("click", () => {
    sidebar.classList.remove("sidebar-open");
  });

});



// contact


document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("#contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();


      const name = document.querySelector("#name").value.trim();
      const phone = document.querySelector("#phone").value.trim();
      const email = document.querySelector("#email").value.trim();
      const comment = document.querySelector("#comment").value.trim();


      if (!name || !phone || !email || !comment) {
        alert("Please fill in all fields!");
        return;
      }


      const message = {
        name: name,
        phone: phone,
        email: email,
        comment: comment,
        date: new Date().toLocaleString()
      };

      // Get existing messages from localStorage
      let messages = JSON.parse(localStorage.getItem("restaurantMessages")) || [];

      // Add new message
      messages.push(message);

      // Save back to localStorage
      localStorage.setItem("restaurantMessages", JSON.stringify(messages));

      // Clear form
      form.reset();

      alert("Thank you! Your message has been sent.");
    });
  }

});



