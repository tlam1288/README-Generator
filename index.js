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


# Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contribution](#contribution)
5. [Test](#test)
6. [Questions](#questions)


## Description<a name="description"></a> 

${data.description}

## Installation<a name="installation"></a> 

${data.installation}

## Usage Information<a name="usage"></a>

${data.usage}

## Contribution Guidelines<a name="contribution"></a>

${data.contribution}

## Test instructions<a name="test"></a>

${data.test}

## Questions<a name="questions"></a>

Please email any questions you may have!
${data.email}

Don't forge to visit my GitHub!
<a href="https://www.github.com/${data.username}">Visit my GitHub</a>
${data.name}

    `;

    writeFileAsync("README.md", readMePage).then(function (error) {
      if (error) {
        console.log(error);
        return console.log(error);
      }
      console.log("Success!");
    });
  });
