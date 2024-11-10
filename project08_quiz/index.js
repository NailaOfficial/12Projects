import inquirer from "inquirer";
class Quiz {
    questions;
    score;
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
    }
    async start() {
        console.log("Welcome to the Quiz!\n");
        for (const question of this.questions) {
            await this.askQuestion(question);
        }
        this.showResults();
    }
    async askQuestion(question) {
        const answers = await inquirer.prompt([
            {
                name: "userAnswer",
                type: "list",
                message: question.question,
                choices: question.options,
            },
        ]);
        if (answers.userAnswer === question.answer) {
            this.score++;
            console.log("Correct!\n");
        }
        else {
            console.log(`Wrong! The correct answer was: ${question.answer}\n`);
        }
    }
    showResults() {
        console.log(`You scored ${this.score} out of ${this.questions.length}`);
    }
}
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
        answer: "Blue Whale",
    },
];
const quiz = new Quiz(questions);
quiz.start();
