const pickupFilerElement = document.getElementById('pickup-search');
const dropoffFilerElement = document.getElementById('delivery-search');

let orderOptions = document.getElementsByClassName('order');

// Refine search every time the input value changes
pickupFilerElement.addEventListener('input', filterOptions);
dropoffFilerElement.addEventListener('input', filterOptions);

function filterOptions() {
    // Update the list of what order options are on the page currently, in case it has changed
    orderOptions = document.getElementsByClassName('order');
    let orderOptionsArr = [].slice.call(orderOptions);
    // Get the search query
    let pickupQuery = String(pickupFilerElement.value).toLowerCase();
    let dropoffQuery = String(dropoffFilerElement.value).toLowerCase();
    // Filter via contains
    orderOptionsArr.forEach(orderOption => {
        // Order options are list items. The contents are children HTML elements, divs
        let orderPickup = orderOption.children[1];
        let orderPickupName = String(orderPickup.innerHTML).toLowerCase();
        let orderDropoff = orderOption.children[2];
        let orderDropoffName = String(orderDropoff.innerHTML).toLowerCase();
        // Remove/show items by toggling 'hiding'
        if (orderPickupName.includes(pickupQuery) && orderDropoffName.includes(dropoffQuery)) {
            // Show if matches query
            orderOption.style.display = 'list-item';
        } else {
            // Show if matches query
            orderOption.style.display = 'none';
        }
    });
}