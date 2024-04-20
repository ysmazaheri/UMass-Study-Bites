
// UI components
const searchBarElement = document.getElementById('search-bar-text');
let map;
let markers = [];
let infoWindow;

// Data
const dorms = [
    {
      position: { lat: 42.3898, lng: -72.5270 }, // Baker Hall
      title: "Baker Hall"
    },
    {
      position: { lat: 42.3904, lng: -72.5283 }, // Brett Hall
      title: "Brett Hall"
    },
    {
      position: { lat: 42.3915, lng: -72.5263 }, // Butterfield Hall
      title: "Butterfield Hall"
    },
    {
      position: { lat: 42.3912, lng: -72.5274 }, // Chadbourne Hall
      title: "Chadbourne Hall"
    },
    {
      position: { lat: 42.3910, lng: -72.5280 }, // Gorman Hall
      title: "Gorman Hall"
    },
    {
      position: { lat: 42.3892, lng: -72.5279 }, // Greenough Hall
      title: "Greenough Hall"
    },
    {
      position: { lat: 42.3933, lng: -72.5284 }, // Van Meter Hall
      title: "Van Meter Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5274 }, // Wheeler Hall
      title: "Wheeler Hall"
    },
    {
      position: { lat: 42.3911, lng: -72.5278 }, // Birch Hall
      title: "Birch Hall"
    },
    {
      position: { lat: 42.3907, lng: -72.5277 }, // Elm Hall
      title: "Elm Hall"
    },
    {
      position: { lat: 42.3906, lng: -72.5283 }, // Linden Hall
      title: "Linden Hall"
    },
    {
      position: { lat: 42.3906, lng: -72.5279 }, // Maple Hall
      title: "Maple Hall"
    },
    {
      position: { lat: 42.3906, lng: -72.5277 }, // Oak Hall
      title: "Oak Hall"
    },
    {
      position: { lat: 42.3906, lng: -72.5276 }, // Sycamore Hall
      title: "Sycamore Hall"
    },
    {
      position: { lat: 42.3897, lng: -72.5266 }, // North Apartment A
      title: "North Apartment A"
    },
    {
      position: { lat: 42.3900, lng: -72.5262 }, // North Apartment B
      title: "North Apartment B"
    },
    {
      position: { lat: 42.3903, lng: -72.5258 }, // North Apartment C
      title: "North Apartment C"
    },
    {
      position: { lat: 42.3907, lng: -72.5254 }, // North Apartment D
      title: "North Apartment D"
    },
    {
      position: { lat: 42.3915, lng: -72.5260 }, // Crabtree Hall
      title: "Crabtree Hall"
    },
    {
      position: { lat: 42.3905, lng: -72.5273 }, // Dwight Hall
      title: "Dwight Hall"
    },
    {
      position: { lat: 42.3898, lng: -72.5264 }, // Hamlin Hall
      title: "Hamlin Hall"
    },
    {
      position: { lat: 42.3910, lng: -72.5285 }, // Johnson Hall
      title: "Johnson Hall"
    },
    {
      position: { lat: 42.3893, lng: -72.5257 }, // Knowlton Hall
      title: "Knowlton Hall"
    },
    {
      position: { lat: 42.3899, lng: -72.5277 }, // Leach Hall
      title: "Leach Hall"
    },
    {
      position: { lat: 42.3914, lng: -72.5272 }, // Lewis Hall
      title: "Lewis Hall"
    },
    {
      position: { lat: 42.3911, lng: -72.5289 }, // Mary Lyon Hall
      title: "Mary Lyon Hall"
    },
    {
      position: { lat: 42.3905, lng: -72.5263 }, // Thatcher Hall
      title: "Thatcher Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5267 }, // Dickinson Hall
      title: "Dickinson Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5261 }, // Field Hall
      title: "Field Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5270 }, // Grayson Hall
      title: "Grayson Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5255 }, // Webster Hall
      title: "Webster Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5279 }, // Cance Hall
      title: "Cance Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5277 }, // Coolidge Hall
      title: "Coolidge Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5272 }, // Crampton Hall
      title: "Crampton Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Emerson Hall
      title: "Emerson Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // James Hall Hall
      title: "James Hall Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // John Adams Hall Hall
      title: "John Adams Hall Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // John Quincy Adams Hall
      title: "John Quincy Adams Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Kennedy Hall Hall
      title: "Kennedy Hall Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // MacKimmie Hall
      title: "MacKimmie Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Melville Hall
      title: "Melville Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Moore Hall
      title: "Moore Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Patterson Hall
      title: "Patterson Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Pierpont Hall
      title: "Pierpont Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Prince Hall
      title: "Prince Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Thoreau Hall
      title: "Thoreau Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Washington Hall
      title: "Washington Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Brown Hall
      title: "Brown Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // Cashin Hall
      title: "Cashin Hall"
    },
    {
      position: { lat: 42.3908, lng: -72.5276 }, // McNamara Hall
      title: "McNamara Hall"
    }
  ];

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