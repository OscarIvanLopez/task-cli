const { v4: uuidv4 } = require("uuid");
class Task {
    id = "";
    desc = "";
    completeDate = null;

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.completeDate = null;
    }
}

module.exports = Task;
