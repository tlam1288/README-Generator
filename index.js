var fs = require("fs");
var inquirer = require("inquirer");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is the title of the project?",
      name: "title",
    },
    {
      type: "input",
      message: "What is the description of the project?",
      name: "description",
    },
    {
      type: "input",
      message: "What are the installation instructions?",
      name: "installation",
    },
    {
      type: "input",
      message: "How is it used?",
      name: "usage",
    },
    {
      type: "input",
      message: "What are the contribution guidelines?",
      name: "contribution",
    },
    {
      type: "input",
      message: "What are the test instructions?",
      name: "test",
    },
    {
      type: "checkbox",
      message: "Which licenses do you allow?",
      name: "license",
      choices: ["HTML", "CSS", "Javascript", "None"],
    },
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username",
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email",
    },
  ])
  .then(function (data) {
    const readMePage = `
# ${data.title}

## Description

${data.description}

## Installation instructions

${data.installation}

## Usage Information

${data.usage}

## Contribution Guidelines

${data.contribution}

## Test instructions

${data.test}
    `;

    writeFileAsync("README.md", readMePage).then(function (error) {
      if (error) {
        console.log(error);
        return console.log(error);
      }
      console.log("Success!");
    });
  });
