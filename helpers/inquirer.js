const inquirer = require("inquirer");
require("colors");

const questions = [
    {
        type: "list",
        name: "option",
        message: "What do you want?",
        choices: [
            {
                value: "1",
                name: `${"1.".blue} Create task`,
            },
            {
                value: "2",
                name: `${"2.".blue} Show tasks`,
            },
            {
                value: "3",
                name: `${"3.".blue} Show completed tasks`,
            },
            {
                value: "4",
                name: `${"4.".blue} Show uncompleted tasks`,
            },
            {
                value: "5",
                name: `${"5.".blue} Complete task`,
            },
            {
                value: "6",
                name: `${"6.".blue} Delete task`,
            },
            {
                value: "0",
                name: `${"0.".blue} Exit`,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log("===========".green);
    console.log("Select an option".white);
    console.log("===========\n".green);

    const { option } = await inquirer.prompt(questions);
    return option;
};

const pause = async () => {
    const questions = [
        {
            type: "input",
            name: "enter",
            message: `Press ${"ENTER".green} to continue`,
        },
    ];
    console.log("\n");
    await inquirer.prompt(questions);
};

const readInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Please input a value";
                }
                return true;
            },
        },
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

const listTasksDelete = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
        };
    });

    choices.unshift({
        value: "0",
        name: "0".green + " Cancelar",
    });

    const questions = [
        {
            type: "list",
            name: "id",
            message: "Delete",
            choices,
        },
    ];
    const { id } = await inquirer.prompt(questions);
    return id;
};

const confirmMessage = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message,
        },
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};

const showListCheckList = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: task.completeDate ? true : false,
        };
    });

    const questions = [
        {
            type: "checkbox",
            name: "ids",
            message: "Select",
            choices,
        },
    ];
    const { ids } = await inquirer.prompt(questions);
    return ids;
};

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksDelete,
    confirmMessage,
    showListCheckList,
};
