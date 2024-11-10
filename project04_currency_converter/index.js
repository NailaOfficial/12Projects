"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
class CurrencyConverter {
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
    
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Welcome to the Currency Converter!");
            while (true) {
                const action = yield this.getMainMenuAction();
                if (action === 'Convert Currency') {
                    yield this.convertCurrency();
                }
                else if (action === 'View Conversion Rates') {
                    this.viewConversionRates();
                }
                else if (action === 'Exit') {
                    console.log("Exiting the currency converter. Goodbye!");
                    break;
                }
            }
        });
    }

    getMainMenuAction() {
        return __awaiter(this, void 0, void 0, function* () {
            const { action } = yield inquirer_1.default.prompt({
                name: 'action',
                type: 'list',
                message: 'What would you like to do?',
                choices: ['Convert Currency', 'View Conversion Rates', 'Exit'],
            });
            return action;
        });
    }
   
    convertCurrency() {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, fromCurrency, toCurrency } = yield inquirer_1.default.prompt([
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
        });
    }
   
    viewConversionRates() {
        console.log("Current Conversion Rates:");
        for (const currency in this.conversionRates) {
            console.log(`${currency}: ${this.conversionRates[currency]}`);
        }
    }
    
    performConversion(amount, fromCurrency, toCurrency) {
        const amountInUSD = amount / this.conversionRates[fromCurrency]; // Convert from the source currency to USD
        const convertedAmount = amountInUSD * this.conversionRates[toCurrency]; // Convert from USD to the target currency
        return convertedAmount;
    }
}

const currencyConverter = new CurrencyConverter();
currencyConverter.start();
