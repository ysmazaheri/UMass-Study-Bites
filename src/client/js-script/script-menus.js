import { loadAllMenus } from "../js-databases/db-menu.js";

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