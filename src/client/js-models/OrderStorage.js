export class OrderStorage {
    static savePickUp(pickUp) {
        localStorage.setItem('selectedPickUpLocation', pickUp);
    }

    static saveDropOff(dropOffLocation) {
        localStorage.setItem('selectedDropOffLocation', dropOffLocation);
    }

    static getPickUp() {
        return localStorage.getItem('selectedPickUpLocation');
    }

    static getDelivery() {
        return localStorage.getItem('selectedDropOffLocation');
    }

    static getSelections() {
        const pickUpLocation = localStorage.getItem('selectedPickUpLocation');
        const dropOffLocation = localStorage.getItem('selectedDropOffLocation');
        return { pickUpLocation, dropOffLocation };
    }
}
