const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const team = [];
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

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

//Prompt for adding Engineer or Intern input
const addEmployee = () => {
    return new Promise((resolve) => {
        inquirer.prompt([
            {
                type: "list",
                message: "Select the Employee you would like to add:",
                name: "role",
                choices: [
                    "Engineer",
                    "Intern",
                    {
                        name: "No more employees to add",
                        value: false
                    }
                ]
            },
            {
                message: "Enter engineer's name:",
                name: "name",
                when: ({ role }) => role === "Engineer"
            },
            {
                message: "Enter intern's name:",
                name: "name",
                when: ({ role }) => role === "Intern"
            },
            {
                message: "Enter engineer's ID:",
                name: "id",
                when: ({ role }) => role === "Engineer"
            },
            {
                message: "Enter intern's ID:",
                name: "id",
                when: ({ role }) => role === "Intern"
            },
            {
                message: "Enter engineer's email address:",
                name: "email",
                when: ({ role }) => role === "Intern"
            },
            {
                message: "Enter intern's email address:",
                name: "email",
                when: ({ role }) => role === "Intern"
            },
            {
                message: "Enter engineer's GitHub username:",
                name: "github",
                when: ({ role }) => role === "Engineer"
            },
            {
                message: "Enter Intern's School name:",
                name: "school",
                when: ({ role }) => role === "Intern"
            }
        //add engineer and intern info into team array
        ]).then(answers => {
            if (answers.role) {
                switch (answers.role) {
                    case "Engineer":
                        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                        team.push(engineer);
                        break;
                    case "Intern":
                        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                        team.push(intern);
                        break;
                }
                return addEmployee().then(() => resolve());
            } else {
                return resolve();
            }
        })
    })
}

addManager().then(() => {
    return addEmployee();
//Calling the function to explort team array into html template
}).then(() => {
    const templateHTML = render(team)
    generatePage(templateHTML);
}).catch((err) => {
    console.log(err);
});
//generate html page 
const generatePage = (htmlPage) => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFile(outputPath, htmlPage, "utf-8", (err) => {
        if(err) throw err;
        console.log("Your new team profile page has been generated!");
    });
}