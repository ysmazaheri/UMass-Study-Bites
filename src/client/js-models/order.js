export class Order {
    constructor(orderer,diningHall,residence,food){ //food can be JSON or string, idk
        this.orderer = orderer;
        this.diningHall = diningHall;
        this.residence = residence;
        this.food = food;
        this.deliverer = "";
        this.completed = false;
        this.time = undefined;

    }
    complete() {
        this.completed = true;
    }
    setDeliverer(deliverer) {
        this.deliverer = deliverer;
    }
    setTime(time) {
        this.time = time;
    }
}