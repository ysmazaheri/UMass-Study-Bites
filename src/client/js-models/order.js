const ls = window.localStorage;

export default class Order {

    constructor(orderer,diningHall,residence,food){ //food can be JSON or string, idk

        this.orderer = orderer;
        this.diningHall = diningHall;
        this.residence = residence;
        this.food = food;
        this.deliverer = "";
        this.isCompleted = false;
        this.time = undefined;
        this._id = undefined;
        
    }

    complete() {

        this.isCompleted = true;

    }

    setDeliverer(deliverer) {

        this.deliverer = deliverer;

    }

    hasDeliverer() {

        return this.deliverer !== "";

    }

    setTime(time) {

        this.time = time;

    }

}