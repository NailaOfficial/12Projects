import inquirer from 'inquirer';
class WordCounter {
    texts;
    constructor() {
        this.texts = [];
    }
    
    async start() {
        console.log("Welcome to the Word Counter!");
        while (true) {
            const action = await this.getMainMenuAction();
            if (action === 'Count Words') {
                await this.countWords();
            }
            else if (action === 'View Current Text') {
                this.viewCurrentText();
            }
            else if (action === 'View All Texts') {
                this.viewAllTexts();
            }
            else if (action === 'Clear Text') {
                this.clearText();
            }
            else if (action === 'Exit') {
                console.log("Exiting the word counter. Goodbye!");
                break;
            }
        }
    }
    
    async getMainMenuAction() {
        const { action } = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Count Words', 'View Current Text', 'View All Texts', 'Clear Text', 'Exit'],
        });
        return action;
    }
   
    async countWords() {
        const { textInput } = await inquirer.prompt({
            name: 'textInput',
            type: 'input',
            message: 'Enter the text you want to count words for:',
        });
        this.texts.push(textInput);
        const wordsArray = textInput.trim().split(/\s+/);
        const wordCount = this.getWordCount(wordsArray);
        console.log(`The entered text is: [${wordsArray.join(', ')}]`);
        console.log(`The entered text has ${wordCount} words.`);
    }
    
    viewCurrentText() {
        if (this.texts.length === 0) {
            console.log("No text entered yet.");
        }
        else {
            console.log("Current Text:");
            console.log(this.texts[this.texts.length - 1]);
        }
    }
    
    viewAllTexts() {
        if (this.texts.length === 0) {
            console.log("No texts have been entered yet.");
        }
        else {
            console.log("All Entered Texts:");
            this.texts.forEach((text, index) => {
                console.log(`${index + 1}: ${text}`);
            });
        }
    }
    
    clearText() {
        this.texts = [];
        console.log("All texts cleared successfully.");
    }
    
    getWordCount(words) {
        return words.filter(word => word.length > 0).length;
    }
}

const wordCounter = new WordCounter();
wordCounter.start();
