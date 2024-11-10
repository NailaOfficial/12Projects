import inquirer from 'inquirer';

class Game {
    private currentRoom: string;

    constructor() {
        this.currentRoom = 'entrance';
    }

    async start(): Promise<void> {
        console.log("Welcome to the Adventure Game!");
        console.log("You can explore the castle, find treasures, and face challenges.\n");

        while (true) {
            await this.showRoom();
            await this.getUserInput();
        }
    }

    private async showRoom(): Promise<void> {
        switch (this.currentRoom) {
            case 'entrance':
                console.log("You are at the castle entrance. There are doors to the north and south.");
                break;
            case 'hall':
                console.log("You are in the grand hall. There are doors to the south and east.");
                break;
            case 'treasure_room':
                console.log("You have found the treasure room! There are treasures all around.");
                break;
            case 'dungeon':
                console.log("You are in the dark dungeon. It's cold and eerie here.");
                break;
            default:
                console.log("You are lost.");
        }
    }

    private async getUserInput(): Promise<void> {
        const answers = await inquirer.prompt([
            {
                name: 'action',
                type: 'list',
                message: 'What do you want to do?',
                choices: this.getAvailableActions(),
            },
        ]);

        this.handleAction(answers.action);
    }

    private getAvailableActions(): string[] {
        const actions: string[] = ['Look around'];

        if (this.currentRoom === 'entrance') {
            actions.push('Go north to the hall', 'Go south to the dungeon');
        } else if (this.currentRoom === 'hall') {
            actions.push('Go south to the entrance', 'Go east to the treasure room');
        } else if (this.currentRoom === 'treasure_room') {
            actions.push('Go back to the hall');
        } else if (this.currentRoom === 'dungeon') {
            actions.push('Go back to the entrance');
        }

        actions.push('Exit');
        return actions;
    }

    private handleAction(action: string): void {
        if (action === 'Exit') {
            console.log("Thank you for playing!");
            process.exit();
        }

        if (action === 'Look around') {
            console.log("You look around, but there's nothing special.");
            return;
        }

        this.move(action);
    }

    private move(action: string): void {
        switch (action) {
            case 'Go north to the hall':
                this.currentRoom = 'hall';
                break;
            case 'Go south to the dungeon':
                this.currentRoom = 'dungeon';
                break;
            case 'Go east to the treasure room':
                this.currentRoom = 'treasure_room';
                break;
            case 'Go back to the hall':
                this.currentRoom = 'hall';
                break;
            case 'Go back to the entrance':
                this.currentRoom = 'entrance';
                break;
            default:
                console.log("You can't go that way.");
        }
    }
}

const game = new Game();
game.start();
