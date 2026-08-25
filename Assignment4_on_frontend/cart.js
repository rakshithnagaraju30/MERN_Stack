function addItem(button){

    let serviceItem = button.parentElement;
    let serviceName = serviceItem.querySelector(".service-name").textContent;
    let servicePrice = serviceItem.querySelector('.price').textContent;
    let buttonName = serviceItem.querySelector(".ghost-btn");
    
    // if (buttonName.textContent === "Add item") {

        let serialNumber = document.querySelectorAll(".cart-items span").length/3 + 1;
        let cartItems = document.querySelector(".cart-items");
        cartItems.innerHTML += `<span>${serialNumber}</span><span>${serviceName}</span><span>${servicePrice}</span>`;
        buttonName.textContent = "Remove Item";
        buttonName.classList.add("danger");
    // }   
    // else if (buttonName.textContent === "Remove Item") {
    //     buttonName.textContent = "Add item";
    //     buttonName.classList.remove("danger");
    //     let cartItems = document.querySelector(".table-head");
    //     let tableItems = cartItems.querySelectorAll("span");
    //     //remove the item from the table
    //     for (let i = 0; i < tableItems.length; i+=3) {
    //         if (tableItems[i+1].textContent === serviceName) {
    //             tableItems[i].remove();
    //             tableItems[i+1].remove();
    //             tableItems[i+2].remove();
    //             break;
    //         }
    //     }
    // }
    
}

let cartItems = document.querySelector(".cart-items");


function countItemsPrice(){

}
