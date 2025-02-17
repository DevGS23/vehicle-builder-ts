import inquirer from 'inquirer';
import { Vehicle } from './models/Vehicle.js';
import { Car, Truck, Motorbike } from './models/VehicleTypes.js';

// Store for existing vehicles
const vehicles: Vehicle[] = [
    new Car('Toyota', 'Camry', 2023, 'Silver', 4),
    new Truck('Ford', 'F-150', 2023, 'Black', 2000, true),
    new Motorbike('Honda', 'CBR', 2023, 'Red', 1000, true)
];

async function createVehicle(): Promise<Vehicle> {
    const { vehicleType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'vehicleType',
            message: 'What type of vehicle would you like to create?',
            choices: ['Car', 'Truck', 'Motorbike']
        }
    ]);

    const commonQuestions = [
        {
            type: 'input',
            name: 'make',
            message: 'Enter the make:'
        },
        {
            type: 'input',
            name: 'model',
            message: 'Enter the model:'
        },
        {
            type: 'number',
            name: 'year',
            message: 'Enter the year:'
        },
        {
            type: 'input',
            name: 'color',
            message: 'Enter the color:'
        }
    ];

    const answers = await inquirer.prompt(commonQuestions);

    switch (vehicleType) {
        case 'Car': {
            const { numDoors } = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'numDoors',
                    message: 'Enter the number of doors:'
                }
            ]);
            return new Car(answers.make, answers.model, answers.year, answers.color, numDoors);
        }
        case 'Truck': {
            const { cargoCapacity, is4x4 } = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'cargoCapacity',
                    message: 'Enter the cargo capacity (in lbs):'
                },
                {
                    type: 'confirm',
                    name: 'is4x4',
                    message: 'Is this a 4x4 truck?'
                }
            ]);
            return new Truck(answers.make, answers.model, answers.year, answers.color, cargoCapacity, is4x4);
        }
        case 'Motorbike': {
            const { engineCC, hasABS } = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'engineCC',
                    message: 'Enter the engine size (in CC):'
                },
                {
                    type: 'confirm',
                    name: 'hasABS',
                    message: 'Does it have ABS?'
                }
            ]);
            return new Motorbike(answers.make, answers.model, answers.year, answers.color, engineCC, hasABS);
        }
        default:
            throw new Error('Invalid vehicle type');
    }
}

async function selectVehicle(): Promise<Vehicle | undefined> {
    const choices = vehicles.map((v, i) => ({
        name: `${v.constructor.name} - ${v['make']} ${v['model']}`,
        value: i
    }));

    const { selectedIndex } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedIndex',
            message: 'Select a vehicle:',
            choices
        }
    ]);

    return vehicles[selectedIndex];
}

async function performActions(vehicle: Vehicle): Promise<void> {
    while (true) {
        const actions = ['Display Info', 'Perform Action'];
        if (vehicle instanceof Truck) {
            actions.push('Toggle 4x4');
        }
        actions.push('Exit');

        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: actions
            }
        ]);

        switch (action) {
            case 'Display Info':
                vehicle.displayInfo();
                break;
            case 'Perform Action':
                vehicle.performAction();
                break;
            case 'Toggle 4x4':
                if (vehicle instanceof Truck) {
                    vehicle.toggleFourWheelDrive();
                }
                break;
            case 'Exit':
                return;
        }
    }
}

async function main(): Promise<void> {
    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['Create New Vehicle', 'Select Existing Vehicle', 'Exit']
            }
        ]);

        if (choice === 'Exit') {
            console.log('Goodbye!');
            break;
        }

        let vehicle: Vehicle | undefined;
        if (choice === 'Create New Vehicle') {
            vehicle = await createVehicle();
            vehicles.push(vehicle);
        } else {
            vehicle = await selectVehicle();
        }

        if (vehicle) {
            await performActions(vehicle);
        }
    }
}

main().catch(console.error);