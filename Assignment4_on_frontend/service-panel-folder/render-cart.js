
export function renderCart(cart) {

    const cartContainer = document.querySelector(".cart-items");
    cartContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align: center; padding: 20px 20px; color: #7a8393;">
                <div style="font-size: 30px; margin-bottom: 8px;">ℹ️</div>
                <h3 style="margin: 0 0 8px; color: #2b2f3a; font-size: 16px;">No Items Added</h3>
                <p style="margin: 0; font-size: 12px;">Add items to the cart from the services bar</p>
            </div>
        `;
        return;
    }
    
    cart.forEach((service, index) => {
        cartContainer.innerHTML += `
            <div class="table-row">
                <span>${index + 1}</span>
                <span>${service.name}</span>
                <span>₹${service.price}</span>
            </div>
        `;
    });
}

// module.exports = renderCart;