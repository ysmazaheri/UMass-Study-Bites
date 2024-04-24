import { OrderCart } from "../js-models/OrderCart.js";
import { loadAllMenus } from "../js-databases/db-menu.js";

const orderCart = new OrderCart();

const searchBarElement = document.getElementsByClassName('search-bar')[0];
const foodOptions = document.getElementsByClassName('food-option');
const foodOptionsArr = [].slice.call(foodOptions);
//let diningHallTitles = document.getElementsByClassName('dining-hall-title');
let menuElement = document.getElementById('menu');


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


// Loading menus
loadMenus();
async function loadMenus(){
    let menus = await loadAllMenus();
    menus = menus.filter(x => x.diningHall === "Franklin Dining Commons");
    let breakfastMenu = menus.filter(x => x.meal === "Breakfast")[0];
    let food = breakfastMenu.food;
    menuElement.innerHTML = '';
    let categories = Object.keys(food);
    categories.forEach(category => {
        let container = document.createElement('div');
        container.classList.add('food-type-container'); 
        let foodTypeHeader = document.createElement('div');
        foodTypeHeader.classList.add('food-type-title');
        foodTypeHeader.textContent = category;
        container.appendChild(foodTypeHeader);

        let foodOptionList = document.createElement('div');
        foodOptionList.classList.add('food-option-list');
        food[category].forEach(foodType => {
            let listItem = document.createElement('div');
            listItem.classList.add('food-option');
            listItem.textContent = foodType.name;
            foodOptionList.appendChild(listItem);
        });
        container.appendChild(foodOptionList);

        menuElement.appendChild(container);

    });
}