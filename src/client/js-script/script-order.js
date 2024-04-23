import { OrderCart } from "../js-models/OrderCart.js";

const orderCart = new OrderCart();

const searchBarElement = document.getElementsByClassName('search-bar')[0];
const foodOptions = document.getElementsByClassName('food-option');
const foodOptionsArr = [].slice.call(foodOptions);

function filterOptions() {

    // Get the search query
    let query = String(searchBarElement.value).toLowerCase();

    // Filter via contains
    foodOptionsArr.forEach(foodOption => {
        
        // Keeping food name case consistent with query
        let foodName = String(foodOption.innerHTML).toLowerCase();
        
        // Hiding block if query doesn't lead into name
        if (foodName.includes(query)) foodOption.style.display = "block";
        else foodOption.style.display = "none";

    });

}

searchBarElement.addEventListener('input', filterOptions);

const showOI = document.getElementsByClassName('order-item-added')[0];

// Checking which food items were selected
for (let i = 0; i < foodOptions.length; i++) {

    foodOptions[i].addEventListener("click", () => {

        let foodName = String(foodOptionsArr[i].innerHTML);
        orderCart.addOI(foodName);

        showOI.classList.toggle('order-item-added-tag');
        showOI.innerHTML = "1 order of " + foodName + " added";
        setTimeout(() => {

            showOI.classList.toggle('order-item-added-tag');
            console.log("hello");

        }, 1500)

    });

}

const nextButton = document.getElementById('next-button');

// NEXT BUTTON
nextButton.addEventListener('click', () => {
    // If no valid location is selected, alert
    if (orderCart.OIListLength() === 0) {
        alert("Please select a food item")
        return;
    }

    // Navigate to location-select.html
    window.location.href = 'order-confirmation.html';
});

// Back Button

const backButton = document.getElementById('backBtn');

backButton.addEventListener('click', () => {

    // Navigate to location-select.html
    window.location.href = 'location-select.html';
});