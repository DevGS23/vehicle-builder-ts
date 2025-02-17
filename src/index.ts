import inquirer from 'inquirer';
import { Vehicle } from './models/Vehicle.js';
import { Car, Truck, Motorbike } from './models/VehicleTypes.js';

const vehicles: Vehicle[] = [];

async function createVehicle(): Promise<void> {
    const { vehicleType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'vehicleType',
            message: 'What type of vehicle would you like to create?',
            choices: ['Car', 'Truck', 'Motorbike']
        }
    ]);

    const { make, model, year, color } = await inquirer.prompt([
        { type: 'input', name: 'make', message: 'Enter vehicle make:' },
        { type: 'input', name: 'model', message: 'Enter vehicle model:' },
        { type: 'number', name: 'year', message: 'Enter vehicle year:' },
        { type: 'input', name: 'color', message: 'Enter vehicle color:' }
    ]);

    let vehicle;
    if (vehicleType === 'Car') {
        const { numDoors } = await inquirer.prompt([
            { type: 'number', name: 'numDoors', message: 'Enter number of doors:' }
        ]);
        vehicle = new Car(make, model, year, color, numDoors);
    } else if (vehicleType === 'Truck') {
        const { loadCapacity, hasTrailer } = await inquirer.prompt([
            { type: 'number', name: 'loadCapacity', message: 'Enter load capacity (lbs):' },
            { type: 'confirm', name: 'hasTrailer', message: 'Does it have a trailer?' }
        ]);
        vehicle = new Truck(make, model, year, color, loadCapacity, hasTrailer);
    } else {
        const { engineSize, hasSaddlebags } = await inquirer.prompt([
            { type: 'number', name: 'engineSize', message: 'Enter engine size (cc):' },
            { type: 'confirm', name: 'hasSaddlebags', message: 'Does it have saddlebags?' }
        ]);
        vehicle = new Motorbike(make, model, year, color, engineSize, hasSaddlebags);
    }

    vehicles.push(vehicle);
    console.log('Vehicle created successfully!');
}

async function selectVehicle(): Promise<Vehicle | null> {
    if (vehicles.length === 0) {
        console.log('No vehicles available. Create one first.');
        return null;
    }

    const { selectedVehicle } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedVehicle',
            message: 'Select a vehicle to use:',
            choices: vehicles.map((v, index) => ({ name: v.displayInfo(), value: index }))
        }
    ]);

    return vehicles[selectedVehicle];
}

async function performVehicleAction(): Promise<void> {
    const vehicle = await selectVehicle();
    if (!vehicle) return;
    
    vehicle.performAction();
}

async function mainMenu() {
    let exit = false;
    while (!exit) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Create Vehicle', 'Select and Use Vehicle', 'Exit']
            }
        ]);

        if (action === 'Create Vehicle') {
            await createVehicle();
        } else if (action === 'Select and Use Vehicle') {
            await performVehicleAction();
        } else {
            exit = true;
        }
    }
}

mainMenu();
