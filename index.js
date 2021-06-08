const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");


const addManager = () => {
    return new Promise((res) => {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter manager's name:",
                    name: "name",
                },
                {
                    type: "input",
                    message: "Enter manager's ID:",
                    name: "id",
                },
                {
                    type: "input",
                    message: "Enter manager's email:",
                    name: "email",
                   
                  
                },
                {
                    type: "input",
                    message: "Enter manager's office number:",
                    name: "officeNumber",
                },
        //   adding manager info into team array
            ]).then(answers => {
                const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                team.push(manager);
                res();
            });
    });
}