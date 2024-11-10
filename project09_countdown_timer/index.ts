import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

async function getUserInput() {
    const res = await inquirer.prompt({
        name: "userInput",
        type: "number",
        message: "Please enter the amount of seconds (60 or less):",
        validate: (input: any) => {  
            if (isNaN(input)) {
                return "Please enter a valid number";
            } else if (input < 1) {
                return "Seconds must be 1 or more";
            } else if (input > 60) {
                return "Seconds must be 60 or less";
            } else {
                return true;
            }
        }
    });
    
    return res.userInput;
}

function startTime(val: number) {
    const targetTime = new Date(Date.now() + val * 1000);
    const interval = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(targetTime, currentTime);

        if (timeDiff <= 0) {
            console.log("Time has expired");
            clearInterval(interval);
            return;
        }

        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);

        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}

async function main() {
    const input = await getUserInput();
    startTime(input);
}

main();
