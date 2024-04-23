const ls = window.localStorage;

export class OrderCart {

    #OIList;

    constructor() {

        if (ls.getItem('OIList') !== null) this.#OIList = JSON.parse(ls.getItem('OIList'));
        else {
            this.#OIList = {};
            ls.setItem('OIList', JSON.stringify(this.#OIList));
        }

    }

    OIListLength() {

        return Object.keys(this.#OIList).length;

    }

    addOI(name) {

        let currentCount = this.#OIList[name];

        if (name in this.#OIList) this.#OIList[name] += 1;
        else this.#OIList[name] = 1;

        ls.setItem('OIList', JSON.stringify(this.#OIList));

        return ++currentCount;

    }

    removeOI(name) {

        let currentCount = this.#OIList[name];

        if (name in this.#OIList) {

            if (currentCount === 1) delete this.#OIList[name];
            else this.#OIList[name] -= 1;

            ls.setItem('OIList', JSON.stringify(this.#OIList));

            return --currentCount;

        }

    }

    printOIList() {

        console.log(this.#OIList);

    }

}