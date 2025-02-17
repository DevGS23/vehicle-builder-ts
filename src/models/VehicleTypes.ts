import { Vehicle } from './Vehicle.js';

export class Car extends Vehicle {
    constructor(
        make: string,
        model: string,
        year: number,
        color: string,
        private numDoors: number
    ) {
        super(make, model, year, color);
    }

    displayInfo(): void {
        console.log(`\nCar Information:\nMake: ${this.make}\nModel: ${this.model}\nYear: ${this.year}\nColor: ${this.color}\nNumber of Doors: ${this.numDoors}`);
    }

    performAction(): void {
        console.log(`Driving the ${this.make} ${this.model}.`);
    }
}

export class Truck extends Vehicle {
    constructor(
        make: string,
        model: string,
        year: number,
        color: string,
        private loadCapacity: number,
        private hasTrailer: boolean
    ) {
        super(make, model, year, color);
    }

    displayInfo(): void {
        console.log(`\nTruck Information:\nMake: ${this.make}\nModel: ${this.model}\nYear: ${this.year}\nColor: ${this.color}\nLoad Capacity: ${this.loadCapacity} lbs\nHas Trailer: ${this.hasTrailer}`);
    }

    performAction(): void {
        console.log(`The ${this.make} ${this.model} is hauling cargo.`);
    }
}

export class Motorbike extends Vehicle {
    constructor(
        make: string,
        model: string,
        year: number,
        color: string,
        private engineSize: number,
        private hasSaddlebags: boolean
    ) {
        super(make, model, year, color);
    }

    displayInfo(): void {
        console.log(`\nMotorbike Information:\nMake: ${this.make}\nModel: ${this.model}\nYear: ${this.year}\nColor: ${this.color}\nEngine Size: ${this.engineSize} cc\nHas Saddlebags: ${this.hasSaddlebags}`);
    }

    performAction(): void {
        console.log(`Revving the engine of the ${this.make} ${this.model}.`);
    }
}
