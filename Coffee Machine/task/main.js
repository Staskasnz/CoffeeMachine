// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

const coffeeType = [espresso = {water: 250, milk: 0, coffee: 16, price: 4},
    latte = {water: 350, milk: 75, coffee: 20, price: 7},
    cappuccino = {water: 200, milk: 100, coffee: 12, price: 6}];

let waterHas = 400;
let milkHas = 540;
let coffeeHas = 120;
let cleanCups = 9;
let spoonOfSugarHas = 15;
let bank = 550;

while (true) {
    console.log("Write action (buy, fill, take, remaining, exit):");
    let action = input();

    if (action === "buy") {
        console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:, back - to main menu:");
        let num = input();
        if (num === "1" || num === "2" || num === "3") {
            num = Number(num);
            buy(num);
        } else if (num === "back") {
        }
    } else if (action === "fill") {
        console.log("Write how many ml of water you want to add:");
        let waterAdd = Number(input());
        waterHas += waterAdd;
        console.log("Write how many ml of milk you want to add:");
        let milkAdd = Number(input());
        milkHas += milkAdd;
        console.log("Write how many grams of coffee beans you want to add:");
        let coffeeAdd = Number(input());
        coffeeHas += coffeeAdd;
        console.log("Write how many disposable coffee cups you want to add:");
        let cupsAdd = Number(input());
        cleanCups += cupsAdd;
        console.log("Write how many spoons of sugar cups you want to add:");
        let sugarAdd = Number(input());
        spoonOfSugarHas += sugarAdd;
    } else if (action === "take") {
        console.log(`I gave you ${bank}`);
        bank = 0;
    } else if (action === "exit") {
        break;
    } else if (action === "remaining") {
        coffeeMachineHas();
    }
}

function coffeeMachineHas() {
    console.log(`The coffee machine has:
${waterHas} ml of water
${milkHas} ml of milk
${coffeeHas} g of coffee beans
${cleanCups} disposable cups
$${bank} of money`);
}

function buy(num) {
    if (coffeeType[num - 1].water > waterHas) {
        console.log("Sorry, not enough water!");
        return;
    } else if (coffeeType[num - 1].milk > milkHas) {
        console.log("Sorry, not enough milk!");
        return;
    } else if (coffeeType[num - 1].coffee > coffeeHas) {
        console.log("Sorry, not enough coffee beans!");
        return;
    } else if (cleanCups <= 0) {
        console.log("Sorry, not enough disposable cups!");
        return;
    }
    console.log("I have enough resources, making you a coffee!");
    console.log("Do you need sugar? 1 - Yes, 2 - No:");
    let answer = Number(input());
    if (answer === 1) {
        console.log("How many spoons of sugar do you need? Write number:");
        let countOfSpoons = Number(input());
        if (countOfSpoons < spoonOfSugarHas) {
            console.log(`Sorry, not enough sugar!
            Would you like to continue buying without sugar? 1 - Yes, 2 - No:`);
            let answer = Number(input());
            if (answer === 1) {
                subastract(num);
            } else if (answer === 2) {
                return;
            }
        } else {
            subtract(num);
            spoonOfSugarHas -= countOfSpoons;
        }

    } else if (answer === 2) {
        subtract(num);
    }
}

function subtract(num) {
    waterHas -= coffeeType[num - 1].water;
    milkHas -= coffeeType[num - 1].milk;
    coffeeHas -= coffeeType[num - 1].coffee;
    cleanCups -= 1;
    bank += coffeeType[num - 1].price;
}