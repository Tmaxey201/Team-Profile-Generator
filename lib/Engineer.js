const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getRole() {
        return "Engineer";   //extends employee class to add Role and github
    }
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;