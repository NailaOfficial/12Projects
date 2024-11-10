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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var todos = [];
var webDevTasks = [
    { id: 1, task: "Learn HTML" },
    { id: 2, task: "Learn CSS" },
    { id: 3, task: "Learn JavaScript" },
    { id: 4, task: "Learn TypeScript" },
    { id: 5, task: "Learn React or Next.js" },
    { id: 6, task: "Build a Portfolio" },
    { id: 7, task: "Practice on GitHub" },
];
function showMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var answers, userGoal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            name: "goal",
                            type: "input",
                            message: "What would you like to do?",
                        },
                    ])];
                case 1:
                    answers = _a.sent();
                    userGoal = answers.goal.toLowerCase().replace(/\s/g, '');
                    if (!userGoal.includes("webdeveloper")) return [3 /*break*/, 3];
                    console.log("Great! Let's help you become a web developer!");
                    todos = __spreadArray([], webDevTasks, true);
                    console.log("Web development tasks have been added to your to-do list.");
                    return [4 /*yield*/, handleWebDeveloperTasks()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    console.log("No tasks available for this goal.");
                    process.exit();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleWebDeveloperTasks() {
    return __awaiter(this, void 0, void 0, function () {
        var actionAnswer, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            name: "action",
                            type: "list",
                            message: "Please select what you would like to do:",
                            choices: ["Add Task", "View Tasks", "Complete a Task", "Exit"],
                        },
                    ])];
                case 1:
                    actionAnswer = _b.sent();
                    _a = actionAnswer.action;
                    switch (_a) {
                        case "Add Task": return [3 /*break*/, 2];
                        case "View Tasks": return [3 /*break*/, 4];
                        case "Complete a Task": return [3 /*break*/, 5];
                        case "Exit": return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 8];
                case 2: return [4 /*yield*/, addWebDevTask()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 4:
                    viewWebDevTasks();
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, completeWebDevTask()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    console.log("Goodbye!");
                    process.exit();
                    _b.label = 8;
                case 8:
                    handleWebDeveloperTasks();
                    return [2 /*return*/];
            }
        });
    });
}
function viewWebDevTasks() {
    if (todos.length === 0) {
        console.log("Your to-do list is empty.");
    }
    else {
        console.log("Your To-Do List:");
        todos.forEach(function (todo) {
            console.log("".concat(todo.id, ". ").concat(todo.task));
        });
    }
}
function addWebDevTask() {
    return __awaiter(this, void 0, void 0, function () {
        var taskAnswer, newTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            name: "task",
                            type: "list",
                            message: "Select a task to add:",
                            choices: webDevTasks.map(function (task) { return task.task; }),
                        },
                    ])];
                case 1:
                    taskAnswer = _a.sent();
                    newTask = {
                        id: todos.length + 1,
                        task: taskAnswer.task,
                    };
                    todos.push(newTask);
                    console.log("Task \"".concat(taskAnswer.task, "\" added successfully!"));
                    return [2 /*return*/];
            }
        });
    });
}
function completeWebDevTask() {
    return __awaiter(this, void 0, void 0, function () {
        var taskChoices, completeAnswer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (todos.length === 0) {
                        console.log("There are no tasks to complete.");
                        return [2 /*return*/];
                    }
                    taskChoices = todos.map(function (todo) { return ({
                        name: todo.task,
                        value: todo.id,
                    }); });
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                name: "taskId",
                                type: "list",
                                message: "Select the task you want to complete:",
                                choices: taskChoices,
                            },
                        ])];
                case 1:
                    completeAnswer = _a.sent();
                    todos = todos.filter(function (todo) { return todo.id !== completeAnswer.taskId; });
                    console.log("Task completed successfully!");
                    return [2 /*return*/];
            }
        });
    });
}
showMenu();
