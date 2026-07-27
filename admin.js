let menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];


document.addEventListener("DOMContentLoaded", () => {
    const adminOrdersList = document.getElementById("admin-orders-list");
    const foodName = document.getElementById("food-name");
    const foodPrice = document.getElementById("food-price");
    const foodImage = document.getElementById("food-image");
    const addButton = document.getElementById("add-food-btn");
    const adminMenuList = document.getElementById("admin-menu-list");
    //diplay order function
    function displayOrders() {

        if (!adminOrdersList) return;

        let orders = JSON.parse(
            localStorage.getItem("restaurantOrders")
        ) || [];

        adminOrdersList.innerHTML = "";


        orders.forEach((order, index) => {

            const div = document.createElement("div");

            div.classList.add("admin-order");


            div.innerHTML = `
        
        <h3>Order ${index + 1}</h3>

        <p>
            <strong>Date:</strong> ${order.date}
        </p>


        <p>
            <strong>Status:</strong> 
            <span class="status">
            ${order.status || "Pending"}
            </span>
        </p>


        <h4>Items</h4>


        ${order.items.map(item => `
            <p>
            ${item.quantity} × ${item.name} 
            - Ksh ${item.price * item.quantity}
            </p>
        `).join("")}


        <h3>
        Total: Ksh ${order.total}
        </h3>



        ${order.status !== "Accepted"
                    ?
                    `
        <button 
        class="accept-btn"
        onclick="acceptOrder(${index})">
        Accept
        </button>
        `
                    :
                    `
        <button class="accepted-btn" disabled>
        Accepted ✓
        </button>
        `
                }



        <button 
        class="complete-btn"
        onclick="completeOrder(${index})">
        Complete
        </button>


        `;


            adminOrdersList.appendChild(div);

        });

    }
    // Get existing menu items

    window.editItem = function (index) {

        let item = menuItems[index];

        let newName = prompt("Enter new food name:", item.name);
        let newPrice = prompt("Enter new price:", item.price);
        let newImage = prompt("Enter new image name:", item.image);

        if (newName && newPrice && newImage) {

            menuItems[index] = {
                name: newName,
                price: newPrice,
                image: newImage
            };

            localStorage.setItem(
                "menuItems",
                JSON.stringify(menuItems)
            );

            displayMenuItems();
            updateDashboard();
        }
    };

    // Display items in 


    // Display items in admin
    function displayMenuItems() {

        adminMenuList.innerHTML = "";

        menuItems.forEach((item, index) => {

            const div = document.createElement("div");

            div.classList.add("admin-item");

            div.innerHTML = `

            <img src="./assent/${item.image}" class="admin-food-image">

            <div class="admin-food-info">

                <h3>${item.name}</h3>

                <p>Ksh ${item.price}</p>

            </div>
<button onclick="editItem(${index})" class="edit-btn">
    Edit
</button>

<button onclick="deleteItem(${index})" class="delete-btn">
    Delete
</button>
        `;

            adminMenuList.appendChild(div);

        });

    }

    // accept
    window.acceptOrder = function (index) {

        let orders = JSON.parse(
            localStorage.getItem("restaurantOrders")
        ) || [];


        orders[index].status = "Accepted";


        localStorage.setItem(
            "restaurantOrders",
            JSON.stringify(orders)
        );


        alert("Order accepted successfully");


        displayOrders();

    };


    // Add new item

    addButton.addEventListener("click", () => {


        const newItem = {

            name: foodName.value,

            price: foodPrice.value,

            image: foodImage.value

        };


        if (!newItem.name || !newItem.price || !newItem.image) {

            alert("Please fill all fields");

            return;

        }


        menuItems.push(newItem);


        localStorage.setItem(
            "menuItems",
            JSON.stringify(menuItems)
        );


        alert("Food added successfully");


        foodName.value = "";
        foodPrice.value = "";
        foodImage.value = "";


        displayMenuItems();
        updateDashboard();

    });





    // Delete item

    window.deleteItem = function (index) {

        menuItems.splice(index, 1);


        localStorage.setItem(
            "menuItems",
            JSON.stringify(menuItems)
        );


        displayMenuItems();
        updateDashboard();

    };

    function updateDashboard() {

        // Count menu items
        const totalItems = document.getElementById("total-items");

        if (totalItems) {
            totalItems.textContent = menuItems.length;
        }


        // Count messages
        const totalMessages = document.getElementById("total-messages");

        let messages = JSON.parse(
            localStorage.getItem("restaurantMessages")
        ) || [];


        if (totalMessages) {
            totalMessages.textContent = messages.length;
        }

        // Count Orders
        const totalOrders = document.getElementById("total-orders");

        let orders = JSON.parse(
            localStorage.getItem("restaurantOrders")
        ) || [];


        if (totalOrders) {
            totalOrders.textContent = orders.length;
        }
    }
    window.completeOrder = function (index) {

        let orders = JSON.parse(
            localStorage.getItem("restaurantOrders")
        ) || [];

        orders.splice(index, 1);

        localStorage.setItem(
            "restaurantOrders",
            JSON.stringify(orders)
        );

        displayOrders();
        updateDashboard();

    }


    // Run dashboard when page loads
    displayMenuItems();
    updateDashboard();
    displayOrders();

});