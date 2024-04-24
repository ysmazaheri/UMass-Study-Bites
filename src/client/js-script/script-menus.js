import { loadAllMenus } from "../js-databases/db-menu.js";
import { OrderStorage } from "../js-models/OrderStorage.js";

const searchBarElement = document.getElementById('search-bar');
let foodOptions = document.getElementsByClassName('food-option');
let diningHallTitles = document.getElementsByClassName('dining-hall-title');
let menuElement = document.getElementById('menu');

// Refine search every time the input value changes
searchBarElement.addEventListener('input', filterOptions);

function filterOptions() {
    // Update the list of what food options are on the page currently, in case it has changed
    foodOptions = document.getElementsByClassName('food-option');
    let foodOptionsArr = [].slice.call(foodOptions);
    // Get the search query
    let query = String(searchBarElement.value).toLowerCase();
    // Filter via contains
    foodOptionsArr.forEach(foodOption => {
        // Food options are list items. The contents are children HTML elements, buttons
        let foodLabel = foodOption.children[0];
        let foodName = String(foodLabel.value).toLowerCase();
        // Remove/show items by toggling 'hiding'
        if (foodName.includes(query)) {
            // Show if matches query
            foodOption.style.visibility = 'visible';
            foodOption.style.height = '35px';
        } else {
            // Show if doesn't match query
            foodOption.style.visibility = 'hidden';
            foodOption.style.height = '0px';
        }
    });
}

loadMenus();
//loads all menus, then chooses the first breakfast menu from Franklin to populate the menus page
//This is purely placeholder functionality
//In live version (milestone 3/4), we will need to keep only 1 menu per meal per hall per day, and pull the relevant menu
async function loadMenus(){
    let menus = await loadAllMenus();
    menus = menus.filter(x => x.diningHall === "Franklin Dining Commons");
    let breakfastMenu = menus.filter(x => x.meal === "Breakfast")[0];
    let food = breakfastMenu.food;
    diningHallTitles[0].textContent = breakfastMenu.diningHall;
    menuElement.innerHTML = '';
    let categories = Object.keys(food);
    categories.forEach(category => {
        let container = document.createElement('div');
        container.classList.add('food-type-container'); 
        let foodTypeHeader = document.createElement('div');
        foodTypeHeader.classList.add('food-type');
        foodTypeHeader.textContent = category;
        container.appendChild(foodTypeHeader);

        let foodOptionList = document.createElement('ul');
        foodOptionList.classList.add('food-option-list');
        food[category].forEach(foodType => {
            let listItem = document.createElement('li');
            listItem.classList.add('food-option');
            let itemButton = document.createElement('input');
            itemButton.type = 'button';
            itemButton.value = foodType.name;
            itemButton.classList.add('food-button');

            listItem.appendChild(itemButton);
            foodOptionList.appendChild(listItem);
        });
        container.appendChild(foodOptionList);


        menuElement.appendChild(container);

    });
}



let diningHallLoc = String(OrderStorage.getPickUp());

/* Event Listeners*/
document.getElementById("breakfast-button").addEventListener("click", function() {
    displayMenu("Breakfast", diningHallLoc);
});

document.getElementById("lunch-button").addEventListener("click", function() {
    displayMenu("Lunch", diningHallLoc);
});

document.getElementById("dinner-button").addEventListener("click", function() {
    displayMenu("Dinner", diningHallLoc);
});

document.getElementById("late-night-button").addEventListener("click", function() {
    displayMenu("Latenight", diningHallLoc);
});

/*Meal Button Helper - Get Meal Menu*/
async function displayMenu(mealType, diningHallLocation) {
    let menus = await loadAllMenus();
    menus = menus.filter(x => x.diningHall === diningHallLocation);

    let menu = getMenuByMealType(menus, mealType);

    let food = menu.food;
    diningHallTitles[0].textContent = menu.diningHall;
    menuElement.innerHTML = '';
    let categories = Object.keys(food);
    categories.forEach(category => {
        let container = document.createElement('div');
        container.classList.add('food-type-container'); 
        let foodTypeHeader = document.createElement('div');
        foodTypeHeader.classList.add('food-type');
        foodTypeHeader.textContent = category;
        container.appendChild(foodTypeHeader);

        let foodOptionList = document.createElement('ul');
        foodOptionList.classList.add('food-option-list');
        food[category].forEach(foodType => {
            let listItem = document.createElement('li');
            listItem.classList.add('food-option');
            let itemButton = document.createElement('input');
            itemButton.type = 'button';
            itemButton.value = foodType.name;
            itemButton.classList.add('food-button');

            listItem.appendChild(itemButton);
            foodOptionList.appendChild(listItem);
        });
        container.appendChild(foodOptionList);

        menuElement.appendChild(container);
    });
}

/*Helper for displayMenu*/
function getMenuByMealType(menus, mealType) {
    return menus.find(menu => menu.meal.toLowerCase() === mealType.toLowerCase());
}