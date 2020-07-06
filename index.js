var fs = require("fs");
var inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const licenses = [
  {
    name: "MIT",
    url: "https://opensource.org/licenses/MIT",
    id: "MIT",
  },
  {
    name: "GNU General Public version 3",
    url: "https://opensource.org/licenses/GPL-3.0",
    id: "GPL-3.0-only",
  },
  {
    name: "No License",
    url: "",
    id: "NOLICENSE",
  },
];

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
      type: "list",
      message: "Choose a license",
      name: "license",
      choices: licenses.map((license) => license.name),
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
    printLicenseInfo(data);
    const readMePage = `
# ${data.title}

By: ${data.name}

# Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contribution](#contribution)
5. [Test](#test)
6. [License](#license)
7. [Questions](#questions)


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

## Licenses<a name="license"></a>

${data.license}

[![License](https://img.shields.io/badge/License-${licenses.id}%202.0-blue.svg)](${licenses.url})

This project is licensed under the ${licenses.name} license.

## Questions<a name="questions"></a>

Please email any questions you may have!
${data.email}

Don't forge to visit my GitHub!
<a href="https://www.github.com/${data.username}">Visit my GitHub</a>



    `;

    writeFileAsync("README.md", readMePage).then(function (error) {
      if (error) {
        console.log(error);
        return console.log(error);
      }
      console.log("Success!");
    });
  });

function printLicenseInfo({ licenseName }) {
  const license = licenses.find((l) => l.name === licenseName);
  const badge = `[![License](https://img.shields.io/badge/License-${licenses.id}%202.0-blue.svg)](${licenses.url})`;
  const description = `This project is licensed under the ${licenses.name} license.`;
  console.log("Badge:", badge);
  console.log("Description:", description);
}
