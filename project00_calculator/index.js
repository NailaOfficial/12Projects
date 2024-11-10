import inquirer from 'inquirer';
async function calculator() {
    const answers = await inquirer.prompt([
        {
            name: 'num1',
            type: 'input',
            message: 'Enter the first number:',
            validate: function (value) {
                const valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a valid number';
            },
            filter: Number,
        },
        {
            name: 'operation',
            type: 'list',
            message: 'Choose an operation:',
            choices: ['+', '-', '*', '/'],
        },
        {
            name: 'num2',
            type: 'input',
            message: 'Enter the second number:',
            validate: function (value) {
                const valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a valid number';
            },
            filter: Number,
        },
    ]);
    const { num1, operation, num2 } = answers;
    let result;
    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : NaN;
            break;
        default:
            console.log('Invalid operation');
            return;
    }
    console.log(`The result of ${num1} ${operation} ${num2} is: ${result}`);
}
calculator();
