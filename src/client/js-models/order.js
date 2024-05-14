const ls = window.localStorage;
//Object that defines a placed order - stored in PouchDB, and completed by a user via the Deliver page
export default class Order {

    constructor(orderer,diningHall,residence,food){

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

    complete() { //Marks order as completed

        this.isCompleted = true;

    }

    setDeliverer(deliverer) { //Sets a user as the deliverer for the order

        this.deliverer = deliverer;

    }

    hasDeliverer() { //Returns true/false based on whether or not the order has a deliverer assigned

        return this.deliverer !== "";

    }

    setTime(time) { //Sets time the order was placed

        this.time = time;

    }

}

function readableTime(date) {//Converts time to a readable string
    if (typeof(date) != typeof(new Date())) {
        console.log("Date/Time is of incorrect type!");
        return("Error: Could Not Load Time");
    }
    let hour = date.getHours();
    let minute = date.getMinutes();
    return `${date.toDateString()} @ ${hour}:${minute}`;
}