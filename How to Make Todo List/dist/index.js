import inquirer from "inquirer";
let todos = [];
const webDevTasks = [
    { id: 1, task: "Learn HTML" },
    { id: 2, task: "Learn CSS" },
    { id: 3, task: "Learn JavaScript" },
    { id: 4, task: "Learn TypeScript" },
    { id: 5, task: "Learn React or Next.js" },
    { id: 6, task: "Build a Portfolio" },
    { id: 7, task: "Practice on GitHub" },
];
async function showMenu() {
    const answers = await inquirer.prompt([
        {
            name: "goal",
            type: "input",
            message: "What would you like to do?",
        },
    ]);
    const userGoal = answers.goal.toLowerCase().replace(/\s/g, '');
    if (userGoal.includes("webdeveloper")) {
        console.log("Great! Let's help you become a web developer!");
        todos = [...webDevTasks];
        console.log("Web development tasks have been added to your to-do list.");
        await handleWebDeveloperTasks();
    }
    else {
        console.log("No tasks available for this goal.");
        process.exit();
    }
}
async function handleWebDeveloperTasks() {
    const actionAnswer = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Please select what you would like to do:",
            choices: ["Add Task", "View Tasks", "Complete a Task", "Exit"],
        },
    ]);
    switch (actionAnswer.action) {
        case "Add Task":
            await addWebDevTask();
            break;
        case "View Tasks":
            viewWebDevTasks();
            break;
        case "Complete a Task":
            await completeWebDevTask();
            break;
        case "Exit":
            console.log("Goodbye!");
            process.exit();
    }
    handleWebDeveloperTasks();
}
function viewWebDevTasks() {
    if (todos.length === 0) {
        console.log("Your to-do list is empty.");
    }
    else {
        console.log("Your To-Do List:");
        todos.forEach((todo) => {
            console.log(`${todo.id}. ${todo.task}`);
        });
    }
}
async function addWebDevTask() {
    const taskAnswer = await inquirer.prompt([
        {
            name: "task",
            type: "list",
            message: "Select a task to add:",
            choices: webDevTasks.map((task) => task.task),
        },
    ]);
    const newTask = {
        id: todos.length + 1,
        task: taskAnswer.task,
    };
    todos.push(newTask);
    console.log(`Task "${taskAnswer.task}" added successfully!`);
}
async function completeWebDevTask() {
    if (todos.length === 0) {
        console.log("There are no tasks to complete.");
        return;
    }
    const taskChoices = todos.map((todo) => ({
        name: todo.task,
        value: todo.id,
    }));
    const completeAnswer = await inquirer.prompt([
        {
            name: "taskId",
            type: "list",
            message: "Select the task you want to complete:",
            choices: taskChoices,
        },
    ]);
    todos = todos.filter((todo) => todo.id !== completeAnswer.taskId);
    console.log("Task completed successfully!");
}
showMenu();
