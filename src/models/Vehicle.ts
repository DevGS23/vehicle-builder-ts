export abstract class Vehicle {
    constructor(
        protected make: string,
        protected model: string,
        protected year: number,
        protected color: string
    ) {}

    abstract displayInfo(): void;
    abstract performAction(): void;
}