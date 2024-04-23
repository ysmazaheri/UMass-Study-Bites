export class OrderStorage {
    static saveSelections(diningHall, dropOffLocation) {
        localStorage.setItem('selectedDiningHall', diningHall);
        localStorage.setItem('selectedDropOffLocation', dropOffLocation);
    }

    static getSelections() {
        const diningHall = localStorage.getItem('selectedDiningHall');
        const dropOffLocation = localStorage.getItem('selectedDropOffLocation');
        return { diningHall, dropOffLocation };
    }

    static getDiningHall() {
        return localStorage.getItem('selectedDiningHall');
    }

    static getDelivery() {
        return localStorage.getItem('selectedDropOffLocation');
    }
}
