const searchBarElement = document.getElementById('search-bar');
let foodOptions = document.getElementsByClassName('food-option');

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