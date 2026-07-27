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

  // Load menu items from Admin + menu-data.js

  const menuContainer = document.getElementById("menu-container");


  if (menuContainer) {


    let adminItems = JSON.parse(localStorage.getItem("menuItems")) || [];


    let allMenuItems = [];


    // Load default menu items
    if (typeof menuItems !== "undefined") {
      allMenuItems = [...menuItems];
    }


    // Add admin items
    allMenuItems = [...allMenuItems, ...adminItems];



    allMenuItems.forEach((item) => {


      const card = document.createElement("div");

      card.classList.add("card-list");


      card.innerHTML = `

            <img src="./assent/${item.image}" alt="${item.name}">

            <h4 class="card-title">
                ${item.name}
            </h4>


            <div class="card-price">

                <div class="price">
                    Ksh ${item.price}
                </div>


                <i class="fa-solid fa-plus add-to-cart"></i>


            </div>

        `;


      menuContainer.appendChild(card);


    });

  }

});

// CART SYSTEM

let cartItems = [];
let totalAmount = 0;


document.addEventListener("click", (e) => {


  // Add to cart
  if (e.target.classList.contains("add-to-cart")) {


    const card = e.target.closest(".card-list");


    const name = card.querySelector(".card-title").textContent;


    const price = parseFloat(
      card.querySelector(".price")
        .textContent
        .replace("Ksh ", "")
    );


    const existingItem = cartItems.find(
      item => item.name === name
    );


    if (existingItem) {

      existingItem.quantity++;

    } else {

      cartItems.push({
        name: name,
        price: price,
        quantity: 1
      });

    }


    totalAmount += price;


    updateCart();

  }



});


function updateCart() {

  const cartItemCount = document.querySelector(".cart-icon span");
  const cartTotal = document.querySelector(".cart-total");


  cartItemCount.textContent = cartItems.length;


  updateCartList();


  cartTotal.textContent =
    `Ksh ${totalAmount.toFixed(2)}`;

}



function updateCartList() {

  const cartItemsList = document.querySelector(".cart-item");


  cartItemsList.innerHTML = "";


  cartItems.forEach((item, index) => {


    const div = document.createElement("div");


    div.classList.add("indivdual-cart-item");


    div.innerHTML = `

 <span>
 ${item.quantity}x ${item.name}
 </span>


 <span>
 Ksh ${(item.price * item.quantity).toFixed(2)}
<button class="remove-btn" onclick="removeItem(${index})">
 X
</button>
 </span>

 `;


    cartItemsList.appendChild(div);


  });


}



window.removeItem = function (index) {

  const removed = cartItems.splice(index, 1)[0];


  totalAmount -= removed.price * removed.quantity;


  updateCart();

}
const cartIcon = document.querySelector(".cart-icon");
const sidebar = document.getElementById("sidebar");
const closeButton = document.querySelector(".sidebar-close");
const checkoutBtn = document.querySelector(".check-btn");


if (cartIcon) {
  cartIcon.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
  });
}


if (closeButton) {
  closeButton.addEventListener("click", () => {
    sidebar.classList.remove("sidebar-open");
  });
}
if (checkoutBtn) {

  checkoutBtn.addEventListener("click", () => {

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let orders = JSON.parse(localStorage.getItem("restaurantOrders")) || [];

    const order = {
      items: cartItems,
      total: totalAmount,
      date: new Date().toLocaleString()
    };

    orders.push(order);

    localStorage.setItem(
      "restaurantOrders",
      JSON.stringify(orders)
    );

    alert("Order placed successfully!");

    cartItems = [];
    totalAmount = 0;
    updateCart();

    sidebar.classList.remove("sidebar-open");

  });

}





// contact

const adminOrdersList = document.getElementById("admin-orders-list");

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

}) 



if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        let orders = JSON.parse(localStorage.getItem("orders")) || [];

        const newOrder = {
            items: cartItems,
            total: totalAmount,
            date: new Date().toLocaleString()
        };

        orders.push(newOrder);

        localStorage.setItem("orders", JSON.stringify(orders));

        alert("Order placed successfully!");

        cartItems = [];
        totalAmount = 0;

        updateCart();

    });

}