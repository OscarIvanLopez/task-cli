require("colors");
const {
    inquirerMenu,
    pause,
    readInput,
    listTasksDelete,
    confirmMessage,
    showListCheckList,
} = require("./helpers/inquirer");
const { saveData, readData } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

const main = async () => {
    console.log("Welcome");

    let opt = "";
    const tasks = new Tasks();

    const tasksDB = readData();

    if (tasksDB) {
        // Establecer las tareas
        tasks.loadTasksFromArray(tasksDB);
    }

    await pause();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                const desc = await readInput("Description:");
                tasks.createTask(desc);
                console.log(desc);
                break;
            case "2":
                tasks.fullList();
                break;
            case "3": //list
                tasks.listCompletedTasks(true);
                break;
            case "4":
                tasks.listCompletedTasks(false);
                break;
            case "5":
                const ids = await showListCheckList(tasks.listArr);
                tasks.toggleCompleted(ids);
                break;
            case "6":
                const id = await listTasksDelete(tasks.listArr);
                if (id !== "0") {
                    // ask if is sure
                    const ok = await confirmMessage("Are you sure?");
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log("Task successfully deleted");
                    }
                }
                break;
        }

        saveData(tasks.listArr);

        await pause();
    } while (opt !== "0");
};

main();
