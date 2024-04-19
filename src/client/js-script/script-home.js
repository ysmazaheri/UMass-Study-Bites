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
    // Update the list of what location options are on the page currently, in case it has changed
    locationOptions = document.getElementsByClassName('location');
    let locationOptionsArr = [].slice.call(locationOptions);
    // Get the search query
    let query = String(searchBarElement.value).toLowerCase();
    // Filter via contains
    locationOptionsArr.forEach(locationOption => {
        // Location options are list items
        let locationName = String(locationOption.innerHTML).toLowerCase();
        // Remove/show items by toggling 'hiding'
        if (locationName.includes(query)) {
            // Show if matches query
            locationOption.style.display = 'list-item';
        } else {
            // Show if doesn't match the query
            locationOption.style.display = 'none';
        }
    });
}