import { mapKey } from '../secrets.js'
import { OrderStorage } from "../js-models/OrderStorage.js"

const orderStorage = new OrderStorage();

// UI components
const searchBarElement = document.getElementById('search-bar-text');
let map;
let markers = [];
let infoWindow;
let selectedLocations = [];

// Data: Name and location of each drop-off option
const dorms = [
    {
      position: { lat: 42.3895, lng: -72.5198 },
      title: "Baker Hall"
    },
    {
      position: { lat: 42.38959, lng: -72.52157 },
      title: "Brett Hall"
    },
    {
      position: { lat: 42.38855, lng: -72.51825 },
      title: "Butterfield Hall"
    },
    {
      position: { lat: 42.38936, lng: -72.51913 },
      title: "Chadbourne Hall"
    },
    {
      position: { lat: 42.38766, lng: -72.52105 },
      title: "Gorman Hall"
    },
    {
      position: { lat: 42.39007, lng: -72.51934 },
      title: "Greenough Hall"
    },
    {
      position: { lat: 42.38987, lng: -72.51838 },
      title: "Van Meter Hall"
    },
    {
      position: { lat: 42.38886, lng: -72.52128 },
      title: "Wheeler Hall"
    },
    {
      position: { lat: 42.38806, lng: -72.53135 },
      title: "Birch Hall"
    },
    {
      position: { lat: 42.38814, lng: -72.52988 },
      title: "Elm Hall"
    },
    {
      position: { lat: 42.38696, lng: -72.53097 },
      title: "Linden Hall"
    },
    {
      position: { lat: 42.38747, lng: -72.53090 },
      title: "Maple Hall"
    },
    {
      position: { lat: 42.38753, lng: -72.53031 },
      title: "Oak Hall"
    },
    {
      position: { lat: 42.38856, lng: -72.53024 },
      title: "Sycamore Hall"
    },
    {
      position: { lat: 42.39762, lng: -72.52412 },
      title: "North Apartment A"
    },
    {
      position: { lat: 42.39670, lng: -72.52420 },
      title: "North Apartment B"
    },
    {
      position: { lat: 42.39760, lng: -72.52510 },
      title: "North Apartment C"
    },
    {
      position: { lat: 42.39677, lng: -72.52512 },
      title: "North Apartment D"
    },
    {
      position: { lat: 42.39400, lng: -72.52506 },
      title: "Crabtree Hall"
    },
    {
      position: { lat: 42.39538, lng: -72.52519 },
      title: "Dwight Hall"
    },
    {
      position: { lat: 42.39493, lng: -72.52633 },
      title: "Hamlin Hall"
    },
    {
      position: { lat: 42.39557, lng: -72.52449 },
      title: "Johnson Hall"
    },
    {
      position: { lat: 42.39388, lng: -72.52571 },
      title: "Knowlton Hall"
    },
    {
      position: { lat: 42.39524, lng: -72.52581 },
      title: "Leach Hall"
    },
    {
      position: { lat: 42.39505, lng: -72.52393 },
      title: "Lewis Hall"
    },
    {
      position: { lat: 42.39425, lng: -72.52452 },
      title: "Mary Lyon Hall"
    },
    {
      position: { lat: 42.39445, lng: -72.52379 },
      title: "Thatcher Hall"
    },
    {
      position: { lat: 42.39215, lng: -72.51966 },
      title: "Dickinson Hall"
    },
    {
      position: { lat: 42.39162, lng: -72.51869 },
      title: "Field Hall"
    },
    {
      position: { lat: 42.39225, lng: -72.51888 },
      title: "Grayson Hall"
    },
    {
      position: { lat: 42.39152, lng: -72.51949 },
      title: "Webster Hall"
    },
    {
      position: { lat: 42.38111, lng: -72.53009 },
      title: "Cance Hall"
    },
    {
      position: { lat: 42.38367, lng: -72.52986 },
      title: "Coolidge Hall"
    },
    {
      position: { lat: 42.38330, lng: -72.52908 },
      title: "Crampton Hall"
    },
    {
      position: { lat: 42.38342, lng: -72.53127 },
      title: "Emerson Hall"
    },
    {
      position: { lat: 42.38412, lng: -72.53115 },
      title: "James Hall"
    },
    {
      position: { lat: 42.38185, lng: -72.52876 },
      title: "John Adams Hall"
    },
    {
      position: { lat: 42.38218, lng: -72.52910 },
      title: "John Quincy Adams Hall"
    },
    {
      position: { lat: 42.38409, lng: -72.52961 },
      title: "Kennedy Hall"
    },
    {
      position: { lat: 42.38290, lng: -72.52862 },
      title: "MacKimmie Hall"
    },
    {
      position: { lat: 42.38468, lng: -72.53079 },
      title: "Melville Hall"
    },
    {
      position: { lat: 42.38193, lng: -72.53079 },
      title: "Moore Hall"
    },
    {
      position: { lat: 42.38182, lng: -72.52832 },
      title: "Patterson Hall"
    },
    {
      position: { lat: 42.38138, lng: -72.53080 },
      title: "Pierpont Hall"
    },
    {
      position: { lat: 42.38408, lng: -72.52891 },
      title: "Prince Hall"
    },
    {
      position: { lat: 42.38431, lng: -72.53011 },
      title: "Thoreau Hall"
    },
    {
      position: { lat: 42.38158, lng: -72.52927 },
      title: "Washington Hall"
    },
    {
      position: { lat: 42.39742, lng: -72.52292 },
      title: "Brown Hall"
    },
    {
      position: { lat: 42.39751, lng: -72.52178 },
      title: "Cashin Hall"
    },
    {
      position: { lat: 42.39793, lng: -72.52224 },
      title: "McNamara Hall"
    }
  ];
  

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
    // Initialize map documentation
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
          key: mapKey(),
          v: "weekly",
        });
    // Request libraries when needed, not in the script tag.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    // Initialize map for campus
    map = new Map(document.getElementById("map"), {
        center: { lat: 42.390226433882404, lng: -72.5266487745724 },
        zoom: 14,
        mapId: "StudyBitesLocationSelectWindow",
    });
    // Create an info window to share between markers.
    infoWindow = new InfoWindow();
    // Default map markers for each DC
    markers = [];
    dorms.forEach(({ position, title }, i) => {
        // Create map pin icon
        const pin = new PinElement({
          glyph: `${i + 1}`,
        });
        // Create map marker to associate with pin icon
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
            // If the item isn't selected, select
            if (option.style.color === "white") {
              searchBarElement.value = "";
              infoWindow.close()
              filterOptions();
              filterMap();
          } else {
              // If the item isn't selected, select
              searchBarElement.value = option.innerHTML;
              filterOptions();
              filterMap();
          }
        });
    });
}

// NEXT BUTTON
document.getElementById('nextBtn').addEventListener('click', function() {
    // If no valid location is selected, alert
    if (selectedLocations.length === 0) {
      alert("Please Select a Valid Drop-Off Location")
      return;
    }

    // Save the dropoff location
    orderStorage.saveDropOff(selectedLocations[0]);

    // Navigate to order.html
    window.location.href = 'order.html';
  });

// BACK BUTTON
document.getElementById('backBtn').addEventListener('click', function() {
  // Navigate to index.html
  window.location.href = 'index.html';
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
        // Location options are list items. The contents are children HTML elements, buttons
        let locationName = String(locationOption.innerHTML);
        let locationNameLow = locationName.toLowerCase();
        // Remove/show items by toggling 'hiding'
        if (locationNameLow.includes(query)) {
          // Show if matches query
          locationOption.style.display = 'list-item';
          
          //add listener for hovering
          locationOption.addEventListener('mouseover', () => {
              locationOption.style.background = "gray";
          });

          // If it is an exact match, select the option
          if (locationNameLow === query) {
              locationOption.style.background = "black";
              locationOption.style.color = "white";
              selectedLocations.push(locationName);

              locationOption.addEventListener('mouseout', () => {
                  locationOption.style.background = "black";
                  locationOption.style.color = "white";
              });
          } 
          // Otherwise, unselect it
          else {
              locationOption.style.background = "white";
              locationOption.style.color = "black";

              locationOption.addEventListener('mouseout', () => {
                  locationOption.style.background = "white";
                  locationOption.style.color = "black";
              });
              
              selectedLocations = selectedLocations.filter(e => e !== locationName);
          }
      } else {
          // Hide if doesn't match the query
          locationOption.style.display = 'none';
          // Unselect it
          locationOption.style.background = "white";
          locationOption.style.color = "black";

          locationOption.addEventListener('mouseout', () => {
              locationOption.style.background = "white";
              locationOption.style.color = "black";
          });
            selectedLocations = selectedLocations.filter(e => e !== locationName);
        }
    });
}