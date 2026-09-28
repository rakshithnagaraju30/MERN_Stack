export function calculateTotal(cart) {
    const total = cart.reduce((sum, service) => sum + service.price, 0);  
    
    const totalContainer = document.querySelector(".total");
    totalContainer.innerHTML = `
        <span>Total Amount</span>
        <span class="total-price">₹ ${total}</span>
    `;
}