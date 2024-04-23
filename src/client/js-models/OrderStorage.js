export class OrderStorage {
    static saveDiningHall(diningHall) {
        localStorage.setItem('selectedDiningHall', diningHall);
    }

    static saveDropOff(dropOffLocation) {
        localStorage.setItem('selectedDropOffLocation', dropOffLocation);
    }

    static getDiningHall() {
        return localStorage.getItem('selectedDiningHall');
    }

    static getDelivery() {
        return localStorage.getItem('selectedDropOffLocation');
    }

    static getSelections() {
        const diningHall = localStorage.getItem('selectedDiningHall');
        const dropOffLocation = localStorage.getItem('selectedDropOffLocation');
        return { diningHall, dropOffLocation };
    }
}
