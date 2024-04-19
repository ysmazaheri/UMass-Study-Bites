// NEXT BUTTON
document.getElementById('nextBtn').addEventListener('click', function() {
    // Navigate to location-select.html
    window.location.href = 'location-select.html';
  });

// LOCATION FILTER
const searchBarElement = document.getElementById('search-bar-text');
let locationOptions = document.getElementsByClassName('location');

// Refine search every time the input value changes
searchBarElement.addEventListener('input', filterOptions);

function filterOptions() {
    // Update the list of what food options are on the page currently, in case it has changed
    locationOptions = document.getElementsByClassName('location');
    let locationOptionsArr = [].slice.call(locationOptions);
    // Get the search query
    let query = String(searchBarElement.value).toLowerCase();
    // Filter via contains
    locationOptionsArr.forEach(locationOption => {
        // Food options are list items. The contents are children HTML elements, buttons
        let locationName = String(locationOption.innerHTML).toLowerCase();
        // Remove/show items by toggling 'hiding'
        if (locationName.includes(query)) {
            // Show if matches query
            locationOption.style.visibility = 'visible';
            locationOption.style.height = '35px';
        } else {
            // Show if matches query
            locationOption.style.visibility = 'hidden';
            locationOption.style.height = '0px';
        }
    });
}