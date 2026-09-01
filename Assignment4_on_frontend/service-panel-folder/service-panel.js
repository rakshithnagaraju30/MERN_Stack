import { renderCart } from "./render-cart.js";
import { calculateTotal } from "./calculate-total.js";
import { sendEmail, subscribtionMail } from "./emailService.js";




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


// this add service to the cart and also remove the service from the cart if it is already added to the cart and calculate the total price of the cart and also render the cart and also toggle the booking form state
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

// this is to warn user if no item in the cart and user clicks on book now button or anywhere on the book card
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

// Handle the "Book Now" button click event
const bookButton = document.getElementById("book-button");
const bookForm = document.getElementById("book-form");

bookButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (cart.length != 0) {
        const isValid = validateForm();
        if (isValid) {
            const bookCard = document.querySelector(".book-card-and-button");
            const addedCard = document.querySelector(".added-card");

            sendEmail(bookForm)
                .then(() => {
                    bookCard.classList.add("slide-up");
                    addedCard.classList.add("slide-up");

                    document.querySelectorAll(".add-btn").forEach((button) => {
                        button.textContent = "Add Item";
                        button.classList.remove("danger");
                    });

                    bookCard.insertAdjacentHTML("beforeend", `
                        <div class="success-message-card">
                            <p class="success-email-message">! Email has been sent successfully</p>
                        </div>
                    `);

                    cart = [];
                    renderCart(cart);
                    calculateTotal(cart);
                    toggleBookingFormState();
                    

                    setTimeout(() => {
                        const successCard = bookCard.querySelector(".success-message-card");
                        if (successCard) {
                            successCard.classList.add("fade-out");
                        }
                        
                        setTimeout(() => {
                            const msg = bookCard.querySelector(".success-message-card");
                            if (msg) msg.remove();
                            
                            bookCard.classList.remove("slide-up");
                            addedCard.classList.remove("slide-up");
                        }, 400);
                    }, 3000);
                })
                .catch(() => {
                    alert("Failed to send email. Please try again.");
                });
        }
        else {
            alert("Please fill in all fields correctly.");
        }
    }
});


//by default toggle the booking form state on page load
toggleBookingFormState();

// Initialize cart display on page load
renderCart(cart);
calculateTotal(cart);

const newsletterForm = document.querySelector(".newsletter-form");
newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    subscribtionMail(newsletterForm).then(() => {
        alert("Successfully subscribed!");
        newsletterForm.reset();
    }).catch((error) => {
        console.error("Subscription Error:", error);
        alert("Failed to subscribe. Please try again.");
    });

    const nameInput = newsletterForm.querySelector("#full-name");
    if (!nameInput.value.trim()) {
        nameInput.setCustomValidity("Please enter your full name.");
        newsletterForm.reportValidity();
        nameInput.setCustomValidity("");
        return;
    }

    const emailInput = newsletterForm.querySelector("#email");
    if (!emailInput.value.trim()) {
        emailInput.setCustomValidity("Please enter your email address.");
        newsletterForm.reportValidity();
        emailInput.setCustomValidity("");
        return;
    }
});

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach(button => {
    button.addEventListener("click", () => addServiceToCart(button));
});


