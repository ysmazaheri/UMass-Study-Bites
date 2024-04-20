
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

// Initialize Google map, markers, and info window using async
// Initialize map click filtering behaviors
// Intiialize location-option click filtering behaviors 
initMap();

// Intiialize location-search value-change filtering behaviors 
// Refine markers and list of options every time the input value changes
searchBarElement.addEventListener('input', (query) => { 
    filterOptions(); 
    filterMap();
});

// INITIALIZE MAP FEATURE
// Initialize Google map, markers, and info window using async
async function initMap() {
    // Request libraries when needed, not in the script tag.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    // Initialize map for campus
    map = new Map(document.getElementById("map"), {
        center: { lat: 42.390226433882404, lng: -72.5266487745724 },
        zoom: 14,
        mapId: "StudyBitesHomeWindow",
    });
    // Create an info window to share between markers.
    infoWindow = new InfoWindow();
    // Default map markers for each DC
    markers = [];
    diningHalls.forEach(({ position, title }, i) => {
        const pin = new PinElement({
          glyph: `${i + 1}`,
        });
        const marker = new AdvancedMarkerElement({
          position,
          map,
          title: title,
          content: pin.element,
        });
        // Add marker to the list of markers for future access
       markers[markers.length] = marker;
      });
  
    // Initialize map click filtering behaviors
    initializeMapInteractions();
    // Intiialize location-option click filtering behaviors 
    initializeOptionsInteractions();
}

// INITIALIZE MAP INTERACTION BEHAVIOR
function initializeMapInteractions() {
    // Add all marker interactions
    markers.forEach(marker => {
        // Add a click listener for each marker, and set up the info window.
        marker.addListener("click", ({ domEvent, latLng }) => {
            // Clicking marker updates and shows the info window
            infoWindow.close();
            infoWindow.setContent(marker.title);
            infoWindow.open(marker.map, marker);
            // Clicking marker filters search bar, options, and map
            searchBarElement.value = marker.title;
            filterOptions();
            filterMap();
          });
    })
    // When info window is closed, unfilter search bar, options, and map
    infoWindow.addListener("close",  () => {
        searchBarElement.value = "";
        filterOptions();
        filterMap();
    });
}

// INITIALIZE OPTIONS INTERACTION BEHAVIOR
// To each option, when it is selected, filter search bar, options, and map
function initializeOptionsInteractions() {
    // Update the list of what location options are on the page currently, in case it has changed
    let locationOptions = document.getElementsByClassName('location');
    let locationOptionsArr = [].slice.call(locationOptions);
    // Clicking option filters search bar, options, and map
    locationOptionsArr.forEach(option => {
        option.addEventListener("click", () => {
            searchBarElement.value = option.innerHTML;
            filterOptions();
            filterMap();
        });
    });
}

// NEXT BUTTON
document.getElementById('nextBtn').addEventListener('click', function() {
    // Navigate to location-select.html
    window.location.href = 'location-select.html';
  });

// GOOGLE MAP MARKER FILTER
function filterMap() {
    // Get the search query
    let query = String(searchBarElement.value).toLowerCase();
    // Filter via contains
    markers.forEach(marker => {
        // Get marker's location
        let markerLoc = marker.title.toLowerCase();
        // Remove/show markers by toggling visibility
        if (markerLoc.includes(query)) {
            // Show if matches query
            marker.map = map;
        } else {
            // Show if doesn't match the query
            marker.map = null;
        }
    });
}

// LOCATION OPTION FILTER
function filterOptions() {
    // Update the list of what location options are on the page currently, in case it has changed
    let locationOptions = document.getElementsByClassName('location');
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