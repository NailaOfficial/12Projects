import inquirer from "inquirer";
class Book {
    title;
    author;
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
class Library {
    books = [];
    addBook(book) {
        this.books.push(book);
        console.log(`Book "${book.title}" by ${book.author} added successfully!`);
    }
    listBooks() {
        if (this.books.length === 0) {
            console.log("No books in the library.");
        }
        else {
            console.log("Books in the library:");
            this.books.forEach((book, index) => {
                console.log(`${index + 1}. ${book.title} by ${book.author}`);
            });
        }
    }
    borrowBook(bookTitle) {
        const bookIndex = this.books.findIndex(book => book.title === bookTitle);
        if (bookIndex !== -1) {
            const borrowedBook = this.books.splice(bookIndex, 1)[0];
            console.log(`You borrowed "${borrowedBook.title}" by ${borrowedBook.author}`);
        }
        else {
            console.log(`The book "${bookTitle}" is not available in the library.`);
        }
    }
}
const library = new Library();
async function main() {
    while (true) {
        const answer = await inquirer.prompt({
            name: "action",
            message: "What would you like to do?",
            type: "list",
            choices: ["Add Book", "List Books", "Borrow Book", "Exit"]
        });
        if (answer.action === "Add Book") {
            const bookDetails = await inquirer.prompt([
                { name: "title", message: "Enter the book title", type: "input" },
                { name: "author", message: "Enter the book author", type: "input" }
            ]);
            const newBook = new Book(bookDetails.title, bookDetails.author);
            library.addBook(newBook);
            console.log("Current library after adding book:", library.books);
        }
        else if (answer.action === "List Books") {
            console.log("Library state before listing books:", library.books);
            library.listBooks();
        }
        else if (answer.action === "Borrow Book") {
            if (library.books.length === 0) {
                console.log("No books available to borrow.");
            }
            else {
                const borrowAnswer = await inquirer.prompt({
                    name: "bookTitle",
                    message: "Enter the title of the book you want to borrow:",
                    type: "input"
                });
                library.borrowBook(borrowAnswer.bookTitle);
            }
        }
        else if (answer.action === "Exit") {
            console.log("Goodbye!");
            break;
        }
    }
}
main();
