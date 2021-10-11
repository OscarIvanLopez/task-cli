require("colors");
const Task = require("./task");

class Tasks {
    _list = {
        abc: "abc",
    };

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach((key) => {
            const task = this._list[key];
            list.push(task);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    deleteTask(id = "") {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach((task) => {
            this._list[task.id] = task;
        });
    }

    createTask(desc = "") {
        const tasks = new Task(desc);

        this._list[tasks.id] = tasks;
    }

    fullList() {
        this.listArr.forEach((task, index) => {
            console.log();
            const idx = `${index + 1}`.green;
            const { desc, completeDate } = task;
            const state = completeDate ? "Completed".green : "Pending".red;
            console.log(`${idx} ${desc} :: ${state}`);
        });
    }

    listCompletedTasks(completeds = true) {
        console.log();
        let counter = 0;
        this.listArr.forEach((task) => {
            const { desc, completeDate } = task;
            const state = completeDate
                ? `${("Completed in " + completeDate).green}`
                : "Pending".red;

            if (completeds) {
                // show completeds
                if (completeDate) {
                    console.log(
                        `${counter.toString().green}. ${desc} :: ${state}`
                    );
                }
            } else {
                // show not completeds
                if (!completeDate) {
                    counter += 1;
                    console.log(
                        `${counter.toString().green} ${desc} :: ${state.green}`
                    );
                }
            }
        });
    }

    toggleCompleted(ids = []) {
        ids.forEach((id) => {
            const task = this._list[id];
            if (!task.completeDate) {
                task.completeDate = new Date().toISOString();
            }
        });

        this.listArr.forEach((task) => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completeDate = null;
            }
        });
    }
}

module.exports = Tasks;
