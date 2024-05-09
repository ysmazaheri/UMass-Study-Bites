const ls = window.localStorage;

export default class Order {

    constructor(orderer,diningHall,residence,food){ //food can be JSON or string, idk

        this.orderer = orderer;
        this.diningHall = diningHall;
        this.residence = residence;
        this.food = food;
        this.deliverer = "";
        this.isCompleted = false;
        let currDate = new Date();
        this.time = readableTime(currDate);
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

function readableTime(date) {
    if (typeof(date) != typeof(new Date())) {
        console.log("Date/Time is of incorrect type!");
        return("Error: Could Not Load Time");
    }
    let hour = date.getHours();
    let minute = date.getMinutes();
    return `${date.toDateString()} @ ${hour}:${minute}`;
}