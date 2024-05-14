//Object used to define each menu, stored in PouchDB
export default class Menu {
    constructor(diningHall,meal,food){//food is a JSON object
        this.diningHall = diningHall;
        this.meal = meal;
        this.food = food;
        this._id = undefined;
    }
}