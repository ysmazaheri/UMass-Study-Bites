import { OrderCart } from "../js-models/OrderCart.js";
import { loadAllMenus } from "../../server/js-databases/db-menu.js";

const orderCart = new OrderCart();
const ls = window.localStorage;

const searchBarElement = document.getElementsByClassName('search-bar')[0];
const backButton = document.getElementById('backBtn');
const menuElement = document.getElementById('menu');
const nextButton = document.getElementById('next-button');
const showOI = document.getElementsByClassName('order-item-added')[0];

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
backButton.addEventListener('click', () => {

    ls.removeItem('OIList');

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

            listItem.addEventListener("click", () => {

                let foodName = foodType.name;
                orderCart.addOI(foodName);
        
                showOI.classList.toggle('order-item-added-tag');
                showOI.innerHTML = "1 order of " + foodName + " added";
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