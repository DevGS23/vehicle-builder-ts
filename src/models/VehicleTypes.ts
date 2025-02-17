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
        console.log(`
Car Information:
Make: ${this.make}
Model: ${this.model}
Year: ${this.year}
Color: ${this.color}
Number of Doors: ${this.numDoors}
        `);
    }

    performAction(): void {
        console.log("🚗 Vrooom! The car accelerates quickly!");
    }
}

export class Truck extends Vehicle {
    constructor(
        make: string,
        model: string,
        year: number,
        color: string,
        private cargoCapacity: number,
        private is4x4: boolean
    ) {
        super(make, model, year, color);
    }

    displayInfo(): void {
        console.log(`
Truck Information:
Make: ${this.make}
Model: ${this.model}
Year: ${this.year}
Color: ${this.color}
Cargo Capacity: ${this.cargoCapacity} lbs
4x4: ${this.is4x4 ? 'Yes' : 'No'}
        `);
    }

    performAction(): void {
        console.log("🚛 The truck is hauling heavy cargo!");
    }

    toggleFourWheelDrive(): void {
        console.log("🚛 Engaging 4x4 mode for tough terrain!");
    }
}

export class Motorbike extends Vehicle {
    constructor(
        make: string,
        model: string,
        year: number,
        color: string,
        private engineCC: number,
        private hasABS: boolean
    ) {
        super(make, model, year, color);
    }

    displayInfo(): void {
        console.log(`
Motorbike Information:
Make: ${this.make}
Model: ${this.model}
Year: ${this.year}
Color: ${this.color}
Engine Size: ${this.engineCC}cc
ABS: ${this.hasABS ? 'Yes' : 'No'}
        `);
    }

    performAction(): void {
        console.log("🏍️ The motorbike leans into a sharp turn!");
    }
}