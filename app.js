#! /usr/bin/env node
// import the necessary modules
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize the pin number
let myPin = 1234;
// Initialize the random account balance
let balance = Math.floor(Math.random() * 30000); // USD dollars
let condition = true;
// Printing welcome message  
console.log("Welcome to my Ai Bank\n");
// Loop to continue the transaction until the user decided to stop
while (condition) {
    // prompt the user for input
    let userInput = await inquirer.prompt([
        {
            type: "input",
            name: "pin",
            message: "Enter your pin"
        },
        {
            type: "list",
            name: "accounts",
            message: "Select your account type",
            choices: ["current account", "saving account"]
        },
        {
            type: "list",
            name: "transactions",
            message: "Enter your transactions",
            choices: ["Fast cash", "Cash with draw", "Balance inquiry"]
        },
        {
            type: "list",
            name: "amount",
            message: "Enter your amount",
            choices: [1000, 3000, 5000, 7000, 10000, 12000, 15000, 20000],
            when(userInput) {
                return userInput.transactions === "Fast cash";
            }
        },
        {
            type: "number",
            name: "amount",
            message: "Enter an amount you want to withdraw:",
            when(userInput) {
                return userInput.transactions === "Cash with draw";
            }
        }
    ]);
    // Destructure the user input for easier access
    let { pin, transactions, amount } = userInput;
    // Handle balance inquiry
    if (pin && transactions === "Balance inquiry") {
        console.log(chalk.yellow(`\nyour current amount is Rs: ${balance}\n`));
        // Handle withdrawals
    }
    else if (pin) {
        // Handle with drawals (both Fast cash and Cash withdraw)
        if (balance >= amount) {
            // Decuct the amount from the balance
            console.log(chalk.green(`\nyour remaining balance is Rs: ${balance -= amount}\n`));
        }
        else {
            console.log(chalk.red(`\n Unsufficient balance\n`));
        }
    }
    // If the user want to make  more transactions
    let moreTransactions = await inquirer.prompt({
        type: "confirm",
        name: "more",
        message: "Do you want to make more transactions?",
        default: false
    });
    // Exit the loop if the user does not want to make more transactions
    if (moreTransactions.more === false) {
        condition = false;
        console.log(chalk.blueBright.bold(`\nThanks for using our Ai Bank Atm`));
    }
}
