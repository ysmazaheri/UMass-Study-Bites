import Menu from '../js-models/menu.js';
import { OrderStorage } from "../js-models/OrderStorage.js";

const searchBarElement = document.getElementById('search-bar');
let foodOptions = document.getElementsByClassName('food-option');
let diningHallTitles = document.getElementsByClassName('dining-hall-title');
let mealTitle = document.getElementsByClassName('meal-title')[0];
let menuElement = document.getElementById('menu');
const URL = "http://localhost:3000";

// Refine search every time the input value changes
searchBarElement.addEventListener('input', filterOptions);

function filterOptions() {
    // Update the list of what food options are on the page currently, in case it has changed
    foodOptions = document.getElementsByClassName('food-option');
    let foodOptionsArr = [].slice.call(foodOptions);
    // Get the search query
    let query = String(searchBarElement.value).toLowerCase();
    console.log(query);
    // Filter via contains
    foodOptionsArr.forEach(foodOption => {
        // Food options are list items. The contents are children HTML elements, buttons
        let foodLabel = foodOption.children[0];
        let foodName = String(foodLabel.textContent).toLowerCase();
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

//loadMenu("Breakfast", "Franklin Dining Commons");
let currLoc = "Franklin Dining Commons";
let currMeal = "Breakfast";

//loads requested menu from PouchDB to populate the menus page
async function loadMenu(meal, diningHall){
    searchBarElement.value = "";

    //Attempts to retrieve menu by meal and dining hall. If it fails, displays a message to the user
    let currMenu = undefined;
    try{
        let menuResponse = await fetch(`${URL}/menu-read?diningHall=${diningHall}&meal=${meal}`, {
          method: "GET",
        });
        currMenu = await menuResponse.json();
    }catch(ex){
        console.log('Failed to retrieve menu');
        diningHallTitles[0].textContent = diningHall;
        mealTitle.textContent = meal;
        menuElement.innerHTML = `<h1>There Is No Available Menu For the Selected Criteria.</h1><p>Please Choose a Different Location/Time.</p>`;
        return;
    }
    currLoc = diningHall;
    currMeal = meal;
    if(currMenu === undefined){
        diningHallTitles[0].textContent = diningHall;
        mealTitle.textContent = meal;
        menuElement.innerHTML = `<h1>There Is No Available Menu For the Selected Criteria.</h1><p>Please Choose a Different Location/Time.</p>`;
        return;
    }
    console.log(currMenu);

    let food = currMenu.food;
    food = JSON.parse(food);
    if(food === undefined) return;
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
        console.log(category);
        let fc = food[category];
        console.log(fc);
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

//Removes current instances of menus from local PouchDB instance, then fills it with placeholder menus below
//This ensures there are no duplicate entries, and lends itself to a more efficient full implementation

async function refreshMenus() {

  //refresh menus
  try{
    let menuResponse = await fetch(`${URL}/menu-refresh`, {
      method: "GET",
    });
    console.log('Refreshed Menus');
  }catch(ex){
    console.log('Error refreshing menus');
  }


  //Retrieve all current menus from PouchDB
  try{
    let menuResponse = await fetch(`${URL}/menu-all`, {
      method: "GET",
    });
    let menuJson = await menuResponse.json();
    let menuArr = menuJson.menus;
    console.log(menuArr);
  }catch(ex){
    console.log('Error retrieving menus');
  }

  loadMenu(currMeal,currLoc);

}




/* Event Listeners, allows user to choose the displayed menu*/
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
    await loadMenu("Dinner", currLoc);
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

let refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener('click', refreshMenus);