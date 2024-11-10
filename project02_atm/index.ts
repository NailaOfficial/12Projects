import inquirer from "inquirer";

let myBalance = 20000;
let myPin = 1234;

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter Your Pin",
        type: "number",
    },
]);

if (pinAnswer.pin === myPin) {
    console.log("Correct pin code!!!");

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "Please select an option",
            type: "list",
            choices: ["withdraw", "fast cash", "check balance"],
        },
    ]);

    if (operationAns.operation === "withdraw") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter the amount to withdraw",
                type: "number",
            },
        ]);

        if (amountAns.amount > myBalance) {
            console.log("Insufficient funds.");
        } else {
            myBalance -= amountAns.amount;
            console.log(`Your remaining balance is: ${myBalance}`);
        }
    } else if (operationAns.operation === "fast cash") {
        let fast = await inquirer.prompt([
            {
                name: "fastcash",
                message: "Select the amount to withdraw",
                type: "list",
                choices: ["1000", "2000", "5000", "10000"],
            },
        ]);

        let fastCashAmount = Number(fast.fastcash); 
        if (fastCashAmount > myBalance) {
            console.log("Insufficient funds.");
        } else {
            myBalance -= fastCashAmount;
            console.log(`You have successfully withdrawn ${fastCashAmount}. \nYour remaining balance is: ${myBalance}`);
        }
    } else if (operationAns.operation === "check balance") {
        console.log(`Your remaining balance is: ${myBalance}`);
    }
} else {
    console.log("Incorrect pin code.");
}
