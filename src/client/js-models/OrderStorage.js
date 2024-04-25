export class OrderStorage {

    constructor () {

    }

    savePickUp(pickUp) {
        localStorage.setItem('selectedPickUpLocation', pickUp);
    }

    saveDropOff(dropOffLocation) {
        localStorage.setItem('selectedDropOffLocation', dropOffLocation);
    }

    getPickUp() {
        return localStorage.getItem('selectedPickUpLocation');
    }

    getDelivery() {
        return localStorage.getItem('selectedDropOffLocation');
    }

    saveName(name) {

        localStorage.setItem('ordererName', name);

    }

    getName() {

        return localStorage.getItem('ordererName');

    }


    getSelections() {
        const pickUpLocation = localStorage.getItem('selectedPickUpLocation');
        const dropOffLocation = localStorage.getItem('selectedDropOffLocation');
        return { pickUpLocation, dropOffLocation };
    }
}
