import { loadAllMenus } from "../../server/js-databases/db-menu.js";
import { OrderStorage } from "../js-models/OrderStorage.js";

const searchBarElement = document.getElementById('search-bar');
let foodOptions = document.getElementsByClassName('food-option');
let diningHallTitles = document.getElementsByClassName('dining-hall-title');
let mealTitle = document.getElementsByClassName('meal-title')[0];
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

loadMenu("Breakfast", "Franklin Dining Commons");
let currLoc = "";
let currMeal = "";
//loads all menus, then chooses the first matching breakfast menu from PouchDB to populate the menus page
//This is purely placeholder functionality
//In live version (milestone 3/4), we will need to keep only 1 menu per meal per hall per day, and pull the relevant menu
async function loadMenu(meal, diningHall){
    searchBarElement.value = "";
    let menus = await loadAllMenus();
    menus = menus.filter(x => x.diningHall === diningHall);
    menus = menus.filter(x => x.meal === meal);
    currLoc = diningHall;
    currMeal = meal;
    if(menus.length === 0){
        diningHallTitles[0].textContent = diningHall;
        mealTitle.textContent = meal;
        menuElement.innerHTML = `<h1>There Is No Available Menu For the Selected Criteria.</h1><p>Please Choose a Different Location/Time.</p>`;
        return;
    }
    let currMenu = menus[0];
    let food = currMenu.food;
    diningHallTitles[0].textContent = currMenu.diningHall;
    mealTitle.textContent = currMenu.meal;
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
            let itemButton = document.createElement('button');
            itemButton.type = 'button';
            itemButton.textContent = foodType.name;
            itemButton.classList.add('food-button');

            listItem.appendChild(itemButton);
            foodOptionList.appendChild(listItem);
        });
        container.appendChild(foodOptionList);


        menuElement.appendChild(container);

    });
}



/* Event Listeners*/
document.getElementById("breakfast").addEventListener("click", async function() {
    await loadMenu("Breakfast", currLoc);
});

document.getElementById("lunch").addEventListener("click", async function() {
    await loadMenu("Lunch", currLoc);
});

document.getElementById("dinner").addEventListener("click", async function() {
    await loadMenu("Dinner", currLoc);
});

document.getElementById("late-night").addEventListener("click", async function() {
    await loadMenu("Latenight", currLoc);
});

document.getElementById("franklin").addEventListener("click", async function() {
    await loadMenu(currMeal, "Franklin Dining Commons");
});

document.getElementById("worcester").addEventListener("click", async function() {
    await loadMenu(currMeal, "Worcester Dining Commons");
});

document.getElementById("berkshire").addEventListener("click", async function() {
    await loadMenu(currMeal, "Berkshire Dining Commons");
});

document.getElementById("hampshire").addEventListener("click", async function() {
    await loadMenu(currMeal, "Hampshire Dining Commons");
});
