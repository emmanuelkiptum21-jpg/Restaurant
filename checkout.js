document.addEventListener("DOMContentLoaded", () => {

    const checkoutForm = document.getElementById("checkout-form");

    if (!checkoutForm) return;

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // Customer details
        const customerName = document.getElementById("customer-name").value.trim();
        const customerPhone = document.getElementById("customer-phone").value.trim();
        const customerLocation = document.getElementById("customer-location").value.trim();
        const customerNote = document.getElementById("customer-note").value.trim();

        const paymentMethod = document.querySelector(
            'input[name="payment"]:checked'
        ).value;

        // Cart data
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartTotal = Number(localStorage.getItem("cartTotal")) || 0;

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        // Create order
        const order = {
            customerName,
            customerPhone,
            customerLocation,
            customerNote,
            paymentMethod,
            items: cartItems,
            total: cartTotal,
            status: "Pending",
            date: new Date().toLocaleString()
        };

        // Get previous orders
        let orders = JSON.parse(localStorage.getItem("restaurantOrders")) || [];

        // Save new order
        orders.push(order);

        localStorage.setItem(
            "restaurantOrders",
            JSON.stringify(orders)
        );

        // Clear cart
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartTotal");

        alert("Order placed successfully!");

        // Go back to menu
        window.location.href = "menu.html";

    });

});