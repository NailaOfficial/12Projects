import inquirer from 'inquirer';

class CurrencyConverter {
    private conversionRates: { [key: string]: number };

    constructor() {
        this.conversionRates = {
            'USD': 1,   
            'EUR': 0.85,
            'GBP': 0.75, 
            'PKR': 280.00, 
            'JPY': 110.00, 
            'CAD': 1.25,   
            'AUD': 1.35,   
            'CHF': 0.95,   
            'CNY': 6.50,   
            'AED': 3.67,
            'SAR': 3.75,   
            'KWD': 0.31,
        };
    }

    async start(): Promise<void> {
        console.log("Welcome to the Currency Converter!");

        while (true) {
            const action = await this.getMainMenuAction();
            if (action === 'Convert Currency') {
                await this.convertCurrency();
            } else if (action === 'View Conversion Rates') {
                this.viewConversionRates();
            } else if (action === 'Exit') {
                console.log("Exiting the currency converter. Goodbye!");
                break;
            }
        }
    }

    private async getMainMenuAction(): Promise<string> {
        const { action } = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Convert Currency', 'View Conversion Rates', 'Exit'],
        });
        return action;
    }

    private async convertCurrency(): Promise<void> {
        const { amount, fromCurrency, toCurrency } = await inquirer.prompt([
            {
                name: 'amount',
                type: 'input',
                message: 'Enter the amount you want to convert:',
                validate: (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 0 ? true : 'Please enter a valid amount',
            },
            {
                name: 'fromCurrency',
                type: 'list',
                message: 'Select the currency you are converting from:',
                choices: Object.keys(this.conversionRates),
            },
            {
                name: 'toCurrency',
                type: 'list',
                message: 'Select the currency you are converting to:',
                choices: Object.keys(this.conversionRates),
            },
        ]);

        const convertedAmount = this.performConversion(parseFloat(amount), fromCurrency, toCurrency);
        console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`);
    }

    private viewConversionRates(): void {
        console.log("Current Conversion Rates:");
        for (const currency in this.conversionRates) {
            console.log(`${currency}: ${this.conversionRates[currency]}`);
        }
    }

    private performConversion(amount: number, fromCurrency: string, toCurrency: string): number {
        const amountInUSD = amount / this.conversionRates[fromCurrency];
        const convertedAmount = amountInUSD * this.conversionRates[toCurrency];
        return convertedAmount;
    }
}

const currencyConverter = new CurrencyConverter();
currencyConverter.start();
