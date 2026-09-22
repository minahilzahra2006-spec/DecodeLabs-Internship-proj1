// ==============================
// MOBILE NAVIGATION
// ==============================

const menuButton = document.querySelector(".menu-button");
const navMenu = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


// ==============================
// SHOPPING CART
// ==============================

const cartButton = document.querySelector(".cart-button");
const cartPanel = document.querySelector(".cart-panel");
const closeCart = document.querySelector(".close-cart");

const cartButtons = document.querySelectorAll(".add-cart");
const cartCount = document.querySelector(".cart-count");

const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");

let cart = [];


// Open Cart

cartButton.addEventListener("click", () => {

    cartPanel.classList.add("open");

});


// Close Cart

closeCart.addEventListener("click", () => {

    cartPanel.classList.remove("open");

});


// Add Items

cartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        cartPanel.classList.add("open");

    });

});


// Update Cart

function updateCart() {

    cartItemsContainer.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;


    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    }


    cart.forEach((item, index) => {

        totalItems += item.quantity;

        totalPrice += item.price * item.quantity;


        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>

            <button class="remove-item" data-index="${index}">
                Remove
            </button>
        `;


        cartItemsContainer.appendChild(cartItem);

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent = totalPrice.toFixed(2);


    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            cart.splice(index, 1);

            updateCart();

        });

    });

}


// ==============================
// CHECKOUT
// ==============================

const checkoutButton =
    document.querySelector(".checkout-button");

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    cartPanel.classList.remove("open");

    document.querySelector("#contact").scrollIntoView({
        behavior: "smooth"
    });

});


// ==============================
// ORDER FORM
// ==============================

const orderForm =
    document.querySelector("#order-form");

const formMessage =
    document.querySelector("#form-message");


orderForm.addEventListener("submit", (event) => {

    event.preventDefault();


    formMessage.textContent =
        "Thank you! Your order has been received. We will contact you shortly.";

    formMessage.classList.add("success-message");


    orderForm.reset();

});