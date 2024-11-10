import inquirer from "inquirer";

interface Question {
    question: string;
    options: string[];
    answer: string;
}

class Quiz {
    private questions: Question[];
    private score: number;

    constructor(questions: Question[]) {
        this.questions = questions;
        this.score = 0;
    }

    async start(): Promise<void> {
        console.log("Welcome to the Quiz!\n");
        
        for (const question of this.questions) {
            await this.askQuestion(question);
        }
        
        this.showResults();
    }

    private async askQuestion(question: Question): Promise<void> {
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
        } else {
            console.log(`Wrong! The correct answer was: ${question.answer}\n`);
        }
    }

    private showResults(): void {
        console.log(`You scored ${this.score} out of ${this.questions.length}`);
    }
}

const questions: Question[] = [
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
