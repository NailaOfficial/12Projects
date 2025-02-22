import inquirer from 'inquirer';

class Todo {
    constructor(public id: number, public title: string, public completed: boolean = false) {}
}

class TodoList {
    private todos: Todo[] = [];
    private nextId: number = 1;

    add(title: string): void {
        const todo = new Todo(this.nextId++, title);
        this.todos.push(todo);
        console.log(`Added todo: "${title}"`);
    }

    view(): void {
        console.log("Todo List:");
        if (this.todos.length === 0) {
            console.log("No tasks available.");
        } else {
            this.todos.forEach(todo => {
                console.log(`${todo.id}. [${todo.completed ? 'X' : ' '}] ${todo.title}`);
            });
        }
    }

    update(id: number, title: string): void {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.title = title;
            console.log(`Updated todo ID ${id} to: "${title}"`);
        } else {
            console.log(`Todo with ID ${id} not found.`);
        }
    }

    delete(id: number): void {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
            console.log(`Deleted todo ID ${id}`);
        } else {
            console.log(`Todo with ID ${id} not found.`);
        }
    }

    complete(id: number): void {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = true;
            console.log(`Completed todo ID ${id}: "${todo.title}"`);
        } else {
            console.log(`Todo with ID ${id} not found.`);
        }
    }
}

class TodoApp {
    private todoList: TodoList;

    constructor() {
        this.todoList = new TodoList();
    }

    async start(): Promise<void> {
        console.log("Welcome to the Advanced Todo List!");

        while (true) {
            const action = await this.getMainMenuAction();
            switch (action) {
                case 'Add Todo':
                    await this.addTodo();
                    break;
                case 'View Todos':
                    this.todoList.view();
                    break;
                case 'Update Todo':
                    await this.updateTodo();
                    break;
                case 'Delete Todo':
                    await this.deleteTodo();
                    break;
                case 'Complete Todo':
                    await this.completeTodo();
                    break;
                case 'Exit':
                    console.log("Exiting the Todo application. Goodbye!");
                    return;
            }
        }
    }

    private async getMainMenuAction(): Promise<string> {
        const { action } = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add Todo', 'View Todos', 'Update Todo', 'Delete Todo', 'Complete Todo', 'Exit'],
        });
        return action;
    }

    private async addTodo(): Promise<void> {
        const { title } = await inquirer.prompt({
            name: 'title',
            type: 'input',
            message: 'Enter the title of the todo:',
            validate: (input) => input.length > 0 ? true : 'Please enter a valid title.',
        });
        this.todoList.add(title);
    }

    private async updateTodo(): Promise<void> {
        const { id, title } = await inquirer.prompt([
            {
                name: 'id',
                type: 'input',
                message: 'Enter the ID of the todo you want to update:',
                validate: (input) => !isNaN(parseInt(input)) ? true : 'Please enter a valid ID.',
            },
            {
                name: 'title',
                type: 'input',
                message: 'Enter the new title for the todo:',
                validate: (input) => input.length > 0 ? true : 'Please enter a valid title.',
            },
        ]);
        this.todoList.update(parseInt(id), title);
    }

    private async deleteTodo(): Promise<void> {
        const { id } = await inquirer.prompt({
            name: 'id',
            type: 'input',
            message: 'Enter the ID of the todo you want to delete:',
            validate: (input) => !isNaN(parseInt(input)) ? true : 'Please enter a valid ID.',
        });
        this.todoList.delete(parseInt(id));
    }

    private async completeTodo(): Promise<void> {
        const { id } = await inquirer.prompt({
            name: 'id',
            type: 'input',
            message: 'Enter the ID of the todo you want to complete:',
            validate: (input) => !isNaN(parseInt(input)) ? true : 'Please enter a valid ID.',
        });
        this.todoList.complete(parseInt(id));
    }
}

const todoApp = new TodoApp();
todoApp.start();
