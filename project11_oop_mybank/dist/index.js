import inquirer from "inquirer";
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    constructor(firstName, lastName, gender, age, mobileNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
    }
}
class BankAccountImpl {
    balance = 0;
    debit(amount) {
        if (amount > this.balance) {
            return "Transaction cancelled: Insufficient funds.";
        }
        else {
            this.balance -= amount;
            return `Debited: $${amount}. New balance: $${this.balance}.`;
        }
    }
    credit(amount) {
        if (amount > 100) {
            this.balance += amount - 1;
            return `Credited: $${amount}. New balance: $${this.balance}. $1 deduction applied for exceeding $100.`;
        }
        else {
            this.balance += amount;
            return `Credited: $${amount}. New balance: $${this.balance}.`;
        }
    }
    checkBalance() {
        return this.balance;
    }
}
async function main() {
    const customerData = await inquirer.prompt([
        { name: "firstName", message: "Enter your first name:", type: "input" },
        { name: "lastName", message: "Enter your last name:", type: "input" },
        { name: "gender", message: "Enter your gender:", type: "input" },
        { name: "age", message: "Enter your age:", type: "number" },
        { name: "mobileNumber", message: "Enter your mobile number:", type: "input" }
    ]);
    const customer = new Customer(customerData.firstName, customerData.lastName, customerData.gender, customerData.age, customerData.mobileNumber);
    const bankAccount = new BankAccountImpl();
    console.log(`Welcome, ${customer.firstName}! Let's manage your bank account.`);
    let exit = false;
    while (!exit) {
        const { action } = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Debit", "Credit", "Check Balance", "Exit"]
        });
        switch (action) {
            case "Debit":
                const { debitAmount } = await inquirer.prompt({ name: "debitAmount", message: "Enter amount to debit:", type: "number" });
                console.log(bankAccount.debit(debitAmount));
                break;
            case "Credit":
                const { creditAmount } = await inquirer.prompt({ name: "creditAmount", message: "Enter amount to credit:", type: "number" });
                console.log(bankAccount.credit(creditAmount));
                break;
            case "Check Balance":
                console.log(`Your balance is: $${bankAccount.checkBalance()}`);
                break;
            case "Exit":
                exit = true;
                console.log("Goodbye!");
                break;
        }
    }
}
main();
