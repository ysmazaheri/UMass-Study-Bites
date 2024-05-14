export class OrderStorage {
//Class used to store local orders before they are placed and sent to the server
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

    saveOrderId(id) {
        localStorage.setItem('orderId', id);
    }

    getId() {
        return localStorage.getItem('orderId');
    }


    getSelections() {
        const pickUpLocation = localStorage.getItem('selectedPickUpLocation');
        const dropOffLocation = localStorage.getItem('selectedDropOffLocation');
        return { pickUpLocation, dropOffLocation };
    }
}
