
// UI components
const searchBarElement = document.getElementById('search-bar-text');
let map;
let markers = [];
let infoWindow;

// Data
const diningHalls = [ {
        position: { lat: 42.39316, lng: -72.52515 },
        title: "Worcester Dining Commons",
    }, {
        position: { lat: 42.38927, lng: -72.52245 },
        title: "Franklin Dining Commons",
    }, {
        position: { lat: 42.38382, lng: -72.53051 },
        title: "Hampshire Dining Commons",
    }, {
        position: { lat: 42.38180, lng: -72.52984 },
        title: "Berkshire Dining Commons",
    },];

// NEXT BUTTON
document.getElementById('nextBtn').addEventListener('click', function() {
    // Navigate to order.html
    window.location.href = 'order.html';
  });

// BACK BUTTON
document.getElementById('backBtn').addEventListener('click', function() {
  // Navigate to home.html
  window.location.href = 'home.html';
});

// LOCATION FILTER
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
        // Location options are list items. The contents are children HTML elements, buttons
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