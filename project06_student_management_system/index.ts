import inquirer from 'inquirer';

class Student {
    constructor(
        public firstName: string,
        public lastName: string,
        public age: number,
        public gender: string,
        public mobileNumber: string
    ) {}
}

class StudentManagementSystem {
    private students: Student[];

    constructor() {
        this.students = [];
    }

    async start(): Promise<void> {
        console.log("Welcome to the Student Management System!");

        while (true) {
            const action = await this.getMainMenuAction();
            if (action === 'Add Student') {
                await this.addStudent();
            } else if (action === 'View Students') {
                this.viewStudents();
            } else if (action === 'Delete Student') {
                await this.deleteStudent();
            } else if (action === 'Exit') {
                console.log("Exiting the system. Goodbye!");
                break;
            }
        }
    }

    private async getMainMenuAction(): Promise<string> {
        const { action } = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add Student', 'View Students', 'Delete Student', 'Exit'],
        });
        return action;
    }

    private async addStudent(): Promise<void> {
        const studentInfo = await inquirer.prompt([
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

        const newStudent = new Student(
            studentInfo.firstName,
            studentInfo.lastName,
            Number(studentInfo.age),
            studentInfo.gender,
            studentInfo.mobileNumber
        );

        this.students.push(newStudent);
        console.log(`Student ${newStudent.firstName} ${newStudent.lastName} added successfully!`);
    }

    private viewStudents(): void {
        if (this.students.length === 0) {
            console.log("No students available.");
            return;
        }

        console.log("Students List:");
        this.students.forEach((student, index) => {
            console.log(`${index + 1}. ${student.firstName} ${student.lastName}, Age: ${student.age}, Gender: ${student.gender}, Mobile: ${student.mobileNumber}`);
        });
    }

    private async deleteStudent(): Promise<void> {
        if (this.students.length === 0) {
            console.log("No students to delete.");
            return;
        }

        const { studentIndex } = await inquirer.prompt({
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
