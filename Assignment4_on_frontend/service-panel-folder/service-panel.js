// const { renderCart } = require("./render-cart.js");
// // import renderCart from "./render-cart.js";
// // import { calculateTotal } from "./calculate-total.js";
// const { calculateTotal } = require("./calculate-total.js");
// // renderCart();

import { renderCart } from "./render-cart.js";
import { calculateTotal } from "./calculate-total.js";

// list of services
const services = [
    { id: 1, name: "Dry Cleaning", price: 200 },
    { id: 2, name: "Wash & Fold", price: 100 },
    { id: 3, name: "Ironing", price: 30 },
    { id: 4, name: "Stain Removal", price: 500 },
    { id: 5, name: "Leather & Suede Cleaning", price: 999 },
    { id: 6, name: "Wedding Dress Cleaning", price: 2800 }
];

// Current Application State
let cart = [];



// function addItem(button) {

//     // Find clicked service row
//     const serviceItem = button.parentElement;

//     const serviceName = serviceItem.querySelector(".service-name").textContent.replace(/[^\w\s&]/g, "").trim();

//     const servicePrice = Number(
//         serviceItem
//             .querySelector(".price")
//             .textContent
//             .replace("₹", "")
//             .replace(".00", "")
//     );

//     // Find service object
//     const service = services.find(item =>
//         item.name === serviceName &&
//         item.price === servicePrice
//     );

//     if (!service) return;

//     // REMOVE ITEM
//     if (button.textContent === "Remove Item") {

//         cart = cart.filter(item => item.id !== service.id);

//         renderCart();

//         button.textContent = "Add Item";
//         button.classList.remove("danger");

//         return;
//     }

//     // Already exists
//     const alreadyExists = cart.some(item => item.id === service.id);

//     if (alreadyExists) return;

//     // Add into cart
//     cart.push(service);

//     renderCart();

//     button.textContent = "Remove Item";
//     button.classList.add("danger");

// }


// ================================
// Render Cart
// ================================

function addServiceToCart(button) {
    const service = button.parentElement;
    const serviceId = parseInt(service.id);

    const selectedService = services.find(item => item.id === serviceId);

    if (!selectedService) return;   
    
    const alreadyExists = cart.some(item => item.id === selectedService.id);

    if (alreadyExists) {
        removeServiceFromCart(selectedService.id);
        button.textContent = "Add Item";
        button.classList.remove("danger");
        return;
    };
    


  
    cart.push(selectedService);

    renderCart(cart);
    calculateTotal(cart);
    toggleBookingFormState();

    button.textContent = "Remove Item";
    button.classList.add("danger");
   
}

//remove item from cart
function removeServiceFromCart(serviceId) {
    cart = cart.filter(item => item.id !== serviceId);
    renderCart(cart);
    calculateTotal(cart);
    toggleBookingFormState();
}

// function renderCart() {


    

//     const cartContainer = document.querySelector(".cart-items");

//     cartContainer.innerHTML = "";
    
//     cart.forEach((service, index) => {

//         cartContainer.innerHTML += `

//             <div class="table-row">
//                 <span>${index + 1}</span>
//                 <span>${service.name}</span>
//                 <span>₹${service.price}</span>
//             </div>
            
//         `;
           
//     });
    
    
// }




// function calculateTotal() {
        
//         const total = cart.reduce((sum, service) => sum + service.price, 0);
//         // const total = cart.reduce((sum, service) => sum + service.price, 0);
//         const totalContainer = document.querySelector(".total-price");
//         totalContainer.textContent = `Total: ₹${total}`;
//     }


// validate user input for name, email, and phone number



function validateForm() {

    const bookCard = document.querySelector("#book-now");


    function isValidEmail(email) {
  // A standard, widely adopted regex pattern for basic email verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    }

    function isValidPhoneNumber(phone) {
        // A simple regex pattern for basic phone number validation (10 digits)
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }

    function isValidName(name) {
        // A simple regex pattern for basic name validation (only letters and spaces)
        const nameRegex = /^[a-zA-Z\s]+$/;
        return nameRegex.test(name);
    }

    if (!bookCard) {
        return false;
    }
    // check correctness of each type of input field and return false if any of them is empty or invalid

    const nameInput = bookCard.querySelector("input[type='text']");
    const emailInput = bookCard.querySelector("input[type='email']");
    const phoneInput = bookCard.querySelector("input[type='tel']");

    // if (!nameInput || !emailInput || !phoneInput) {
    //     return false;
        
    // }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    
    if (!name || !email || !phone) {
        return false;
    }

    else{
            if (!isValidName(name)) {
                return false;
            }

            if (!isValidEmail(email)) {
                return false;
                // alert("Please enter a valid email address.");
            }

            if (!isValidPhoneNumber(phone)) {
                return false;
                // alert("Please enter a valid phone number.");
            }
    }        

    return Boolean(name && email && phone);
}

function toggleBookingFormState() {
    const bookButton = document.getElementById("book-button");
    const bookCard = document.querySelector("#book-now");
    const hasItems = cart.length > 0;


    if (bookButton) {
        bookButton.disabled = !hasItems;
    }

    if (bookCard) {
        const inputs = bookCard.querySelectorAll("input");
        inputs.forEach((input) => {
            input.readOnly = !hasItems;
            if (!hasItems) {
                input.value = "";
            }
        });
    }
}





const bookCard = document.querySelector("#book-now");
bookCard.addEventListener("click", (e) => {
    // Only show warning for input/label clicks, not for button (button has its own handler)

    //warn user clicks on anywhere on the book card when cart is empty or form is disabled
    if (cart.length === 0 ) {
    
        // Remove existing warning first
        const existingWarning = document.querySelector(".cart-warning-message");
        if (existingWarning) {
            existingWarning.remove();
        }
        
        // Create and insert new warning with icon
        const warningMsg = document.createElement("p");
        warningMsg.className = "cart-warning-message";
        warningMsg.innerHTML = "<span style='color: #e74c3c; margin-right: 6px;'>⊘</span>Add the items to the cart to book";
        
        // Insert after the button
        const button = document.getElementById("book-button");
        button.insertAdjacentElement("afterend", warningMsg);
        
        // Auto-hide immediately
        setTimeout(() => {
            const msg = document.querySelector(".cart-warning-message");
            if (msg) msg.remove();
        }, 3000);
    }
});

//dom for book item button with validation
const bookButton = document.getElementById("book-button");
bookButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Show warning if cart is empty
    if (cart.length === 0) {
        // Remove existing warning first
        const existingWarning = document.querySelector(".cart-warning-message");
        if (existingWarning && cart.length !== 0) {
            existingWarning.remove();
        }
        
        // Create and insert new warning with icon
        const warningMsg = document.createElement("p");
        warningMsg.className = "cart-warning-message";
        warningMsg.innerHTML = "<span style='color: #e74c3c; margin-right: 6px;'>⊘</span>Add the items to the cart to book";
        
        // Insert after the button
        bookButton.insertAdjacentElement("afterend", warningMsg);
        
        // Auto-hide immediately
        setTimeout(() => {
            const msg = document.querySelector(".cart-warning-message");
            if (msg) msg.remove();
        },3000);
        return;
    }
    
    // Remove warning if it exists
    const warningMsg = document.querySelector(".cart-warning-message");
    if (warningMsg) warningMsg.remove();
    
    if (cart.length != 0) {
        const isValid = validateForm();
        if (isValid) {
            const bookCard = document.querySelector(".book-card-and-button");
            const addedCard = document.querySelector(".added-card");
            
            // Start slide-up animation
            bookCard.classList.add("slide-up");
            addedCard.classList.add("slide-up");

            document.querySelectorAll(".add-btn").forEach((button) => {
                        button.textContent = "Add Item";
                        button.classList.remove("danger");
                });
            cart = [];
            renderCart(cart);
            calculateTotal(cart);
            toggleBookingFormState();

            // Show success message after slight delay
            setTimeout(() => {
                bookCard.insertAdjacentHTML("beforeend", `
                    <div class="success-message-card">
                        <p class="success-email-message">! Email has been sent successfully</p>
                    </div>
                `);            }, 200);

            // Reset after 3 seconds
            setTimeout(() => {
                const successCard = bookCard.querySelector(".success-message-card");
                if (successCard) {
                    successCard.classList.add("fade-out");
                }
                
                setTimeout(() => {

                    
                    // Remove success card
                    const msg = bookCard.querySelector(".success-message-card");
                    if (msg) msg.remove();
                    
                    // Slide everything back down
                    bookCard.classList.remove("slide-up");
                    addedCard.classList.remove("slide-up");
                    
                    // Reset form and cart
                    bookCard.querySelectorAll("input").forEach((input) => {
                        input.value = "";
                    });
                }, 400);
            }, 3000);
        }
        else {
            alert("Please fill in all fields correctly.");
        }

    
    }
   
});



toggleBookingFormState();

// Initialize cart display on page load
renderCart(cart);
calculateTotal(cart);

const newsletterForm = document.querySelector(".newsletter-form");
newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = newsletterForm.querySelector("#full-name");
    if (!nameInput.value.trim()) {
        nameInput.setCustomValidity("Please enter your full name.");
        newsletterForm.reportValidity();
        nameInput.setCustomValidity("");
        return;
    }

    alert("Successfully subscribed!");
    newsletterForm.reset();
});

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach(button => {
    button.addEventListener("click", () => addServiceToCart(button));
});

// Add click listener to entire book-card to show warning when cart is empty


/**
 * clicked on book now button
 * then validate the form and if valid then show alert and reset the form
 * else show alert to fill all fields
 */
