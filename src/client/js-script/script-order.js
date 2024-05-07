import { OrderCart } from "../js-models/OrderCart.js";
import { loadAllMenus } from "../../server/js-databases/db-menu.js";

const orderCart = new OrderCart();
const ls = window.localStorage;

const searchBarElement = document.getElementsByClassName('search-bar')[0];
const backButton = document.getElementById('backBtn');
const menuElement = document.getElementById('menu');
const nextButton = document.getElementById('next-button');
const showOI = document.getElementsByClassName('order-item-added')[0];

// Filter food options using search bar query
function filterOptions() {
    let foodOptions = document.getElementsByClassName('food-option');
    let foodOptionsArr = [].slice.call(foodOptions);
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

// NEXT BUTTON - Only progresses if an item is in the "cart"
nextButton.addEventListener('click', () => {
    // If no valid order items are selected, alert
    if (orderCart.OIListLength() === 0) {
        alert("Please select a food item")
        return;
    }
    // Navigate to order-confirmation.html
    window.location.href = 'order-confirmation.html';
});

// Hardcoded back Button
backButton.addEventListener('click', () => {
    // Undo order progress
    ls.removeItem('OIList');
    // Navigate to location-select.html
    window.location.href = 'location-select.html';
});


// Loading menus
loadMenus();
async function loadMenus(){
    // Load all menus
    let menus = await loadAllMenus();
    // Default to Franklin DC Breakfast
    menus = menus.filter(x => x.diningHall === "Franklin Dining Commons");
    let breakfastMenu = menus.filter(x => x.meal === "Breakfast")[0];
    // Load content for default
    let food = breakfastMenu.food;
    menuElement.innerHTML = '';
    let categories = Object.keys(food);
    // For each food category...
    categories.forEach(category => {
        // Create the div for the category that will contain the individual foods
        let container = document.createElement('div');
        container.classList.add('food-type-container'); 
        let foodTypeHeader = document.createElement('div');
        foodTypeHeader.classList.add('food-type-title');
        // Capitalize the first letter of each word in the category
        foodTypeHeader.textContent = capitalizeEveryWord(category);
        container.appendChild(foodTypeHeader);
        // Add each food under the category to the container div
        let foodOptionList = document.createElement('div');
        foodOptionList.classList.add('food-option-list');
        food[category].forEach(foodType => {
            let listItem = document.createElement('div');
            listItem.classList.add('food-option');
            // Capitalize the first letter of each word in the food name
            listItem.textContent = capitalizeEveryWord(foodType.name);
            // Make each food item clickable to add to cart
            listItem.addEventListener("click", () => {
                let foodName = capitalizeEveryWord(foodType.name);
                // When clicked, add to cart
                orderCart.addOI(foodName);
                showOI.classList.toggle('order-item-added-tag');
                // Get the total number now in the cart
                let totalCount = orderCart.getIOValueByName(foodName);
                // When clicked, notify the user that it has been added to cart, displaying the total
                showOI.innerHTML = `${totalCount} order(s) of ${foodName} total`;
                setTimeout(() => {
                    showOI.classList.toggle('order-item-added-tag');
                }, 1500)
                
        
            });

            foodOptionList.appendChild(listItem);
        });
        container.appendChild(foodOptionList);

        menuElement.appendChild(container);

    });
}

// Split up a sentence into each word, and capitalize the first letter of each word and decapitalize all others
// Reduces the reliance on database-level formatting, which is useful for webscraping
function capitalizeEveryWord(sentence) {
    let words = sentence.split(" ");
    let capitalizedWords = words.map((word => word[0].toUpperCase() + word.substring(1).toLowerCase()));
    let capitalizedSentence = capitalizedWords.join(" ");
    return capitalizedSentence;
}