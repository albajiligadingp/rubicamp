class Car {
    constructor(door, year, color, fuel, seat, machine, tyre) {
        this.door = door;
        this.year = year;
        this.color = color;
        this.fuel = fuel;
        this.seat = seat;
        this.machine = machine;
        this.tyre = new Tyre(tyre);
    }
}

class Tyre {
    constructor(tyre) {
        this.tyre = tyre;
    }
}

class Avanza extends Car {
    constructor() {
        super(5, "", "white", "premium/pertamax", 7, "1300 cc", "dunlop");
        this.brand = "Toyota Avanza Veloz";
        this.warranty = null;
    }
}

class Camry extends Car {
    constructor() {
        super(4, "", "white", "premium/pertamax", 5, "2494 cc", "dunlop");
        this.brand = "Toyota Camry";
        this.warranty = null;
    }
}

class Corolla extends Car {
    constructor() {
        super(4, "", "silver", "premium/pertamax", 5, "1798 cc", "dunlop");
        this.brand = "Toyota Corolla Altis";
        this.warranty = null;
    }
}

class CarFactory {
    constructor() {
        this.allcars = [];
    }

    produce(m) {
        let cars = [];
        let brand = ["avanza", "camry", "corolla"];
        for (let i = 0; i < brand.length; i++) {
            cars["month"] = m;
            let amount = 100 * Math.random();
            let car = [];
            switch (brand[i]) {
                case "avanza":
                    for (let j = 0; j < amount; j++)
                        car[j] = new Avanza();
                    break;
                case "camry":
                    for (let j = 0; j < amount; j++)
                        car[j] = new Camry();
                    break;
                case "corolla":
                    for (let j = 0; j < amount; j++)
                        car[j] = new Corolla();
                    break;
            }
            cars.push(car);
        }
        this.allcars.push(cars);
    }

    // simulationWarranty() {
    //     month = 
    // }

    showResult() {
        for (let i = 0; i < this.allcars.length; i++) {
            console.log(`Hasil produksi bulan ${this.allcars[i]["month"]}, yaitu :`);
            for (let j = 0; j < this.allcars[i].length; j++) {
                console.log(`${this.allcars[i][j].length} unit : ${this.allcars[i][j][0].brand}`);
                console.log("Door    : " + this.allcars[i][j][0].door);
                console.log("Color   : " + this.allcars[i][j][0].color);
                console.log("Fuel    : " + this.allcars[i][j][0].fuel);
                console.log("Seat    : " + this.allcars[i][j][0].seat);
                console.log("Machine : " + this.allcars[i][j][0].machine);
                console.log();
            }
            console.log("==========================");
        }
    }
}

let car = new CarFactory();
car.produce("Januari");
car.produce("Februari");
car.produce("Maret");
car.showResult();