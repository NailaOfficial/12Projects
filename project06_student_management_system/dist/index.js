"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
class Student {
    firstName;
    lastName;
    age;
    gender;
    mobileNumber;
    constructor(firstName, lastName, age, gender, mobileNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
    }
}
class StudentManagementSystem {
    students;
    constructor() {
        this.students = [];
    }
    async start() {
        console.log("Welcome to the Student Management System!");
        while (true) {
            const action = await this.getMainMenuAction();
            if (action === 'Add Student') {
                await this.addStudent();
            }
            else if (action === 'View Students') {
                this.viewStudents();
            }
            else if (action === 'Delete Student') {
                await this.deleteStudent();
            }
            else if (action === 'Exit') {
                console.log("Exiting the system. Goodbye!");
                break;
            }
        }
    }
    async getMainMenuAction() {
        const { action } = await inquirer_1.default.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add Student', 'View Students', 'Delete Student', 'Exit'],
        });
        return action;
    }
    async addStudent() {
        const studentInfo = await inquirer_1.default.prompt([
            { name: 'firstName', type: 'input', message: 'Enter first name:' },
            { name: 'lastName', type: 'input', message: 'Enter last name:' },
            {
                name: 'age',
                type: 'input',
                message: 'Enter age:',
                validate: (input) => !isNaN(Number(input)) ? true : 'Please enter a valid number',
            },
            { name: 'gender', type: 'list', message: 'Select gender:', choices: ['Male', 'Female', 'Other'] },
            { name: 'mobileNumber', type: 'input', message: 'Enter mobile number:' },
        ]);
        const newStudent = new Student(studentInfo.firstName, studentInfo.lastName, Number(studentInfo.age), studentInfo.gender, studentInfo.mobileNumber);
        this.students.push(newStudent);
        console.log(`Student ${newStudent.firstName} ${newStudent.lastName} added successfully!`);
    }
    viewStudents() {
        if (this.students.length === 0) {
            console.log("No students available.");
            return;
        }
        console.log("Students List:");
        this.students.forEach((student, index) => {
            console.log(`${index + 1}. ${student.firstName} ${student.lastName}, Age: ${student.age}, Gender: ${student.gender}, Mobile: ${student.mobileNumber}`);
        });
    }
    async deleteStudent() {
        if (this.students.length === 0) {
            console.log("No students to delete.");
            return;
        }
        const { studentIndex } = await inquirer_1.default.prompt({
            name: 'studentIndex',
            type: 'list',
            message: 'Select a student to delete:',
            choices: this.students.map((student, index) => ({ name: `${student.firstName} ${student.lastName}`, value: index })),
        });
        const deletedStudent = this.students.splice(studentIndex, 1);
        console.log(`Deleted student: ${deletedStudent[0].firstName} ${deletedStudent[0].lastName}`);
    }
}
const studentManagementSystem = new StudentManagementSystem();
studentManagementSystem.start();
